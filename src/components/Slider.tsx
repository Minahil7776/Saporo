"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import "./slider.css"
import { useRouter } from 'next/navigation';

function Slider() {
  const router = useRouter();
  const data = [
    {
      id: 1,
      title: "always fresh & always crispy & always hot",
      image: "/slide1.png",
    },
    {
      id: 2,
      title: "we deliver your order wherever you are in NY",
      image: "/slide2.png",
    },
    {
      id: 3,
      title: "the best pizza to share with your family",
      image: "/slide3.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className='slider'>
      <div className='slide-left'>
        <div className='sliding-text'>
          <h1>
            {data[currentSlide].title}
          </h1>
        </div>
        <div className='order-btn'>
          <button onClick={()=>router.push("/menu")}>Order Now</button>
        </div>
      </div>
      <div className="sliding-pic">
        <Image
          src={data[currentSlide].image}
          alt="img"
          fill
          placeholder="blur"
        />
      </div>
    </div>
  )
}

export default Slider