"use client"

import styles from "./page.module.css"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";


const Login = () => {

  const session = useSession()

  const router = useRouter();

  const searchParams = useSearchParams()

  if(session.status === 'authenticated') {
    router.push('/dashboard')
  }
  
  
  const [error, setError] = useState(searchParams.get('error'));

  const [success, setSuccess] = useState(searchParams.get('success'));


  const [formData, setFormData ] = useState({
    email: '',
    password: ''
  })

 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
   
    signIn("credentials", {
      email: formData.email,
      password: formData.password,
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="email"
          value={formData.email}
          placeholder="Email"
          required
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          required
          className={styles.input}
          onChange={handleChange}
        />
        <button className={styles.button}>Login</button>
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/register">
        Create Account
      </Link>
    </div>
  )
}

export default Login