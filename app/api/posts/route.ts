import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from "@/utils/db";
import Post from "@/models/Post";

const AWS = require('aws-sdk');

AWS.config.region = process.env.S3_BUCKET_REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.IDENTITYPOOLID,
});

const s3Bucket = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: process.env.S3_BUCKET_NAME },
});


const getAssetUrl = (key: any) => {
  return `https://${process.env.ASSET_URL}/${key}`;
}

async function uploadS3(uploadObj: any) {
  const s3UploadPromise = new Promise(((resolve, reject) => {
    s3Bucket.upload(uploadObj, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }));

  return await s3UploadPromise;
}

async function uploadEncodedFile(bucketPath: any, filename: any, data: any, contentType: any) {
  try {
    const newPath = `${bucketPath}/${filename}`;
    const uploadObj = {
      Key: newPath,
      Body: data,
      ContentType: contentType,
      ACL: 'public-read',
    };
    const res = await uploadS3(uploadObj);
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function uploadS3File(base64Data: string, bucketPath: string)  {
  const buf = Buffer.from(base64Data,'base64')
  const uploadFile = await uploadEncodedFile(
    bucketPath,
    `${Date.now()}.png`,
    buf,
    'image/png') as any; 

  const fileUrl = getAssetUrl(uploadFile.Key);
  
  return {
    fileUrl: fileUrl
  }
}

const isBase64 = (str: string) => {
  return Buffer.from(str, 'base64').toString('base64') === str;
}

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);

  const username = url.searchParams.get("username");

  try {
    await connect();
    

    let condition = {};
    if(username) {
      condition = {
        username
      }
    }

    const posts = await Post.find(condition);

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  
  let body = await request.json();
  
  const img = body.img

  const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
  
  if(isBase64(base64Data)) {
    const uploadAsset = await uploadS3File(base64Data, 'next-js');
    body.img = uploadAsset.fileUrl;
  } else {
    delete body.img;
  }

 
  const newPost = new Post(body);

  try {
    await connect();

    await newPost.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};