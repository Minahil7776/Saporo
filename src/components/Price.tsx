"use client";

import React, { useEffect, useState } from "react";
import "./Price.css";
import { useRouter } from "next/navigation";
import {useCartStore} from "../utils/store"


type Props = {
  id: number;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, id, options,title, desc, img}: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const router = useRouter();
   const handleClick = () => {
    const unitPrice = options ? price + options[selected].additionalPrice : price;
  const product = {
    id:`${id}-${options ? options[selected].title : "default"}`,
    title,
    desc,
    img,
    price: unitPrice * quantity,        // final price with options & quantity
    quantity,
    optionTitle: options ? options[selected].title : null,
  };

  addToCart(product);
  router.push("/cart");
};

useEffect(() => {
  setTotal(
    quantity * (options ? price + options[selected].additionalPrice : price)
  );
}, [quantity, selected, options, price]);

    const {addToCart} = useCartStore();

  return (
    <div className="price-container">
      <h2 className="price-total">${total.toFixed(2)}</h2>

      {/* OPTIONS CONTAINER */}
      <div className="options-container">
        {options?.map((option, index) => (
          <button
            key={option.title}
            className={`option-btn ${selected === index ? "active" : ""}`}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>

      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="bottom-container">
        {/* QUANTITY */}
        <div className="quantity-box">
          <span>Quantity</span>
          <div className="quantity-controls">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>

        {/* CART BUTTON */}
        <button onClick={handleClick} className="cart-btn" >Add to Cart</button>
      </div>
    </div>
  );
};

export default Price;
