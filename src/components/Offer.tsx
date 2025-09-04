"use client"
import Image from 'next/image'
import React from 'react'
import CountDown from './CountDown'
import "./offer.css"
import { useRouter } from "next/navigation";



function Offer() {
    const router = useRouter();
  return (
   <>
    <div className='offer'>
        <div className='offer-bgImg'>
            <Image src={"/offerBg.png"} alt='img' fill />
        </div>
        <div className='offer-left'>
            <div className='offer-text'>
            <h1>Delicious Burger & French Fry</h1>
            <p>
                Progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel.
            </p>
            <CountDown/>
            <button onClick={()=>router.push("/menu/burgers")}>Order Now</button>
            </div>
        <div className='offer-img'>
            <Image src={"/offerProduct.png"} alt='img' width={700} height={350} />
        </div>
        </div>
    </div>
   </>
  )
}

export default Offer