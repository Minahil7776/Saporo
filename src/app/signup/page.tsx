'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import "../login/login.css";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setUsername('');
      setPassword('');
      toast.success("SignUp successful!", {
  duration: 4000, // time in ms (3000ms = 3s)
});
      router.push("/login");
    } else {
      toast.error(`SigunUp faild ${data.error}`,{duration:4000})
  };
  }
  return (
    <form onSubmit={handleSignup}>
      <div className='login'>
        <div className='login-wrapper'>
          <div className='login-heading'>
            <h1>Signup</h1>
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
              autoCorrect="off"
              value={password}
              minLength={8}
              maxLength={20}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type='submit'>Signup</button>

          <div className='other-login'>
            <p>or signup with</p>
            <div className='social-links'>
              <Link href="#" className='google'><FaGoogle /> Google</Link>
              <Link href="#" className='facebook'><FaFacebookF /> Facebook</Link>
            </div>
          </div>

          <p>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'brown', fontWeight: 'bold' }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );

}
