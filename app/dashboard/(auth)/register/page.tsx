"use client"

import styles from "./page.module.css"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import Link from "next/link";


const Register = () => {

  const [error, setError] = useState('');
  const [formData, setFormData ] = useState({
    name: '',
    email: '',
    password: ''
  })

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
   
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData
        }),
      });
      res.status === 201 && router.push("/dashboard/login?success=Account has been created");
    } catch (err) {
      setError(err as any);
    }
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
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          required
          className={styles.input}
          onChange={handleChange}
        />
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
        <button className={styles.button}>Register</button>
        {error && "Something went wrong!"}
      </form>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/login">
        Login with an existing account
      </Link>
    </div>
  )
}

export default Register