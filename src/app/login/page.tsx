'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import "./login.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.ok) {
      toast.success("Login Successfull");
      router.push("/"); 
    } else {
      toast.error("Invalid credentials");
      setUsername("");
     setPassword("");
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <div className='login'>
        <div className='login-wrapper'>
          <div className='login-heading'>
            <h1>Login</h1>
          </div>

          <div className='input-fields'>
            <input
              type='text'
              placeholder='UserName'
              value={username}
              minLength={3}
              maxLength={20}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type='password'
              placeholder='Password'
              autoComplete='new-password'
              value={password}
              minLength={8}
              maxLength={20}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type='submit'>Login</button>

          <div className='other-login'>
            <p>or login with</p>
            <div className='social-links'>
              <Link href="#" className='google'><FaGoogle /> Google</Link>
              <Link href="#" className='facebook'><FaFacebookF /> Facebook</Link>
            </div>
          </div>

          <p>
            Don’t have an account?{' '}
            <Link href="/signup" style={{ color: 'brown', fontWeight: 'bold' }}>
              Signup
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
