import { burgers, featuredProducts, pastas, pizzas } from '@/app/data'
import Image from 'next/image'
import React from 'react'
import "./product.css"
import Price from '@/components/Price'


 export type Props = {
  params: { id: string };
};
  const allProducts = [
    ...featuredProducts,
    ...pizzas,
    ...burgers,
    ...pastas
  ];

async function  Product({ params }: Props) {

  // merge all arrays into one

const { id } = await params;
const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) return <h1>Product not found</h1>;

  return (
    <div className='product-container'>
      {product.img && (
        <div className='product-img'>
          <Image
            src={product.img}
            alt={product.title}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
      <div className='product-text'>
        <h1>{product.title}</h1>
        <p>{product.desc}</p>
        <Price
  id={product.id}
  title={product.title}
  desc={product.desc}
  img={product.img}
  price={product.price}
  options={product.options}
/>
      </div>
    </div>
  );
}

export default Product;
