"use client";
import { useCartStore } from '@/utils/store';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import "./cart.css";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import toast from 'react-hot-toast';

type CartProduct = {
  id: string;
  title: string;
  price: number;
  img?: string;
  quantity?: number;
  optionTitle?: string; 
};

function Cart() {
  const { data: session } = useSession();
  const { products, removeFromCart, clearCart } = useCartStore();
  const router = useRouter();

  // ✅ Track screen width for inline responsive styling
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (products.length === 0) {
    return (
      <h1
        className="empty-card"
        style={{
          height: "80vh",
          color: "brown",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isMobile ? "3rem" : "6rem", // ✅ safe inline responsiveness
          textAlign:"center"
        }}
      >
        Your cart is empty
      </h1>
    );
  }

  const total = products.reduce(
    (sum: number, p: CartProduct) => sum + p.price * (p.quantity || 1),
    0
  );

  const handleCheckout = async () => {
    if (!session) {
      toast.success("You Have to login first to checkout!");
      router.push("/login");
      return;
    }
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          products,
          totalPrice: total,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Order placed successfully! Order ID: ${data.order.orderId}`);
        clearCart();
        router.push("/orders");
      } else {
        console.error("Checkout failed:", data.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-left">
        {products.map((p: CartProduct) => (
          <div key={p.id} className="cart-item">
            <div className="cart-left-content">
              {p.img && <Image src={p.img} alt={p.title} width={60} height={60} />}
              <div className="cart-info">
                <h2>{p.title}</h2>
                <p>{p.optionTitle}</p>
              </div>
            </div>
            <div className="cart-right-content">
              <span className="cart-price">${(p.price * (p.quantity || 1)).toFixed(2)}</span>
              <button onClick={() => removeFromCart(p.id)} className="remove-btn">X</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-right">
        <div>
          <h3>Subtotal ({products.length} items)</h3>
          <h3>${total.toFixed(2)}</h3>
        </div>
        <div>
          <h3>Service Charges</h3>
          <h3>$0.00</h3>
        </div>
        <div>
          <h3>Delivery Cost</h3>
          <h3 style={{ color: "green" }}>FREE!</h3>
        </div>
        <hr />
        <div>
          <h3>Total (Incl. VAT)</h3>
          <h3 style={{ fontWeight: "bold" }}>${total.toFixed(2)}</h3>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>CHECKOUT</button>
        <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}

export default Cart;
