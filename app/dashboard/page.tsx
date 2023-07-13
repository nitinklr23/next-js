"use client";
import React, { useEffect, useState, useContext } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";

const Dashboard = () => {

  const session = useSession() as any;

  const user = session?.data?.user;

  const role = user?.role;

  const router = useRouter();

  const { showLoader, hideLoader } = useContext(ThemeContext);

  const [formData, setFormData ] = useState({
    title: '',
    desc: '',
    img: '',
    content: ''
  })

  const convertBase64 = (file: any) => {

    return new Promise((resolve, reject) => {

        const fileReader = new FileReader();
       
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

  const handleFileChange = async (e:any)  => {
    const file = e.target.files?.[0]!
    const base64 = await convertBase64(file) as any;
    setFormData({
      ...formData,
      img: base64
    })
  };

  
  const fetcher = (...args: any) => fetch(...[args] as const).then(res => res.json())

  const { data, mutate, error, isLoading } = useSWR(() => {
      if(role == 'admin') {
        return `/api/posts`;
      } else {
        return `/api/posts?username=${session?.data?.user.name}`;
      }
    },
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      showLoader()
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          username: session.data.user.name,
        }),
      });
      hideLoader()
      mutate();
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      showLoader()
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      hideLoader()
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "loading"
            : data?.map((post: any) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" width={200} height={100} />
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(post._id)}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" onChange={handleChange} name='title' className={styles.input} />
          <input type="text" placeholder="Desc" onChange={handleChange} name='desc' className={styles.input} />
          <input type="file" onChange={handleFileChange} />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols={30}
            rows={10}
            name='content'
            onChange={handleChange}
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;