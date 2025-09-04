"use client";
import React, { useState } from "react";
import "./navbar.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data:session} = useSession();
  const router = useRouter();

  return (
    <>
      {/* Offer bar */}
      <div className="nav-offer">
        Free delivery for all orders over $50. Order your food now!
      </div>

      {/* Main Navbar */}
      <div className="navbar">
        {/* Left links */}
        <div className="nav-left">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Logo */}
        <div className="nav-center">SAPORO</div>

        {/* Right links */}
        <div className="nav-right">
          <Link href="/orders">Orders</Link>
          <Link href="/cart">Cart</Link>
          {session ? (
          <button
            onClick={() => signOut()}
            className="login-btn"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="login-btn"
          >
            Login
          </button>
        )}
        </div>

        {/* Hamburger (always inside navbar, but hidden on desktop) */}
        <div
          className="hamburger"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
         <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
  <Link href="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
  <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
  <Link href="/orders" onClick={() => setIsOpen(false)}>Orders</Link>
  <Link href="/cart" onClick={() => setIsOpen(false)}>Cart</Link>

        {session ? (
          <button
            onClick={() => { signOut({callbackUrl:"/"})}}
            
            className="login-btn"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="login-btn"
          >
            Login
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
