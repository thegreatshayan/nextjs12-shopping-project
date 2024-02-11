/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const ProductItem = ({ item, addToCart }) => {
  return (
    <div className="bg-white rounded-xl mb-5 block">
      <Link href={`/product/${item.slug}`}>
        <img src={item.image} alt={item.title} />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${item.slug}`}>
          <h2 className="text-lg">{item.title}</h2>
        </Link>
        <p>{item.price}</p>
        <button
          onClick={() => addToCart(item)}
          className="rounded-xl bg-gray-700 text-white px-4 py-2"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
