import { pizzas, pastas, burgers } from "../../data";
import Image from "next/image";
import Link from "next/link";
import "./category.css";

type MenuItem = {
  id: number;
  title: string;
  price: number;
  img?: string;
};

const categoryData: Record<string, MenuItem[]> = {
  pizzas,
  pastas,
  burgers,
};

export default function Page({ params }: { params: { category: string } }) {
  const { category } = params;
  const items = categoryData[category];

  if (!items || items.length === 0) {
    return <h1 className="empty-cart">Your cart is empty</h1>;
  }

  return (
    <div className="category-container">
      {items.map((item) => (
        <div className="category-card" key={item.id}>
          {item.img && (
            <div className="category-image-container">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="category-image"
                  placeholder="blur"
              />
            </div>
          )}
          <div className="category-footer">
            <h1 className="category-title">{item.title}</h1>
            <h2 className="category-price">${item.price}</h2>
            <Link className="add-btn" href={`/product/${item.id}`}>
              Add to Cart
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
