import React from 'react'
import {menu} from "../data"
import Link from 'next/link'
import "./menu.css"

function page() {
  return (
    <div className='menu-container'>
      {menu.map((category)=>(
        <Link href = {`/menu/${category.slug}`} key={category.id} className='menu-link' style={{ backgroundImage: `url(${category.img})`, color:category.color}}>
          <div className='menu-card'  >
            <h1>{category.title}</h1>
            <p>{category.desc}</p>

            <button style={{ backgroundColor:category.color, color: category.color === "black" ? "white" : "brown"}}>Explore</button>
            </div>  
        </Link>
      ))}
    </div>
  )
}

export default page