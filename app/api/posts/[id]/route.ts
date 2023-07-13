import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse, } from 'next'
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request: NextApiRequest,  { params }: {
   params: { id: string } 
}) => {
  try {
    await connect();
    const id = params.id
    const posts = await Post.findOne({_id: id});
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: {
  params: { id: string } 
}) => {
  const { id } = params;

  try {
    await connect();

    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};