"use client"
import React from 'react'

import { featuredProducts } from '../app/data'
import Image from 'next/image'
import "./featured.css"
import { useRouter } from 'next/navigation'

function Featured() {
  const router = useRouter();
  
  return (
    <div className='featured'>
      {featuredProducts.map((item)=>(
      <div className='card' key={item.id}>
        {item.img && (
          <div className='card-img '>
            <Image src={item.img} alt="img" width={250}
  height={250}
  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}/>
          </div>
        )}
        <div className='card-title'>{item.title}</div>
        <div className='card-desc'>{item.desc}</div>
        <div className='card-price'>${item.price}</div>
        <div className='card-btn'>
          <button onClick={()=>router.push(`/product/${item.id}`)}>ADD TO CART</button>
        </div>
      </div>
))}
    </div>
  )
}

export default Featured