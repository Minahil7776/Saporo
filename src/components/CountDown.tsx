"use client";
import React, { useState, useEffect } from "react";

const CountDown = () => {

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const targetDate = new Date("10/10/2025").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      setTimeLeft(difference > 0 ? difference : 0);
    };

    updateCountdown(); // initialize once

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null) return null; // ⏳ Prevent mismatch until client renders

  const d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const h = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const m = Math.floor((timeLeft / 1000 / 60) % 60);
  const s = Math.floor((timeLeft / 1000) % 60);

  return (
    <div style={{ fontWeight: "bold", fontSize: "xx-large", color: "yellow" }}>
      {d}d : {h}h : {m}m : {s}s
    </div>
  );
};

export default CountDown;
