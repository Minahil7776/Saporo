"use client";
import React, { useEffect, useState } from "react";
import "./orders.css";

type Order = {
  orderId: string;
  createdAt: string;
  totalPrice: number;
  products: { title: string; quantity: number }[];
  status: string;
};

function OrdersPage() {
  const [orders, setorder] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/order");
        const data = await res.json();
        if (data.success) {
          setorder(data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <h1
        className="empty-orders"
        style={{
          height: "80vh",
          color: "brown",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: typeof window !== "undefined" && window.innerWidth < 600 ? "3rem" : "6rem",
          textAlign:'center'
        }}
      >
        No orders found
      </h1>
    );
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th>Products</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const date = new Date(order.createdAt).toLocaleDateString();
            return (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{date}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.products
                    .map((p) => `${p.title} (${p.quantity})`)
                    .join(", ")}
                </td>
                <td
                  className={
                    order.status === "Delivered" ? "delivered" : "pending"
                  }
                >
                  {order.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
