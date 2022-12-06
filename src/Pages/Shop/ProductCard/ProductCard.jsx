import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ jacket, trouser, short, shirt }) => {
  const { _id, product_name, product_price, product_image } =
    jacket || trouser || short || shirt;
  return (
    <Link to={`/shop/product/${_id}`}>
      <div className="card card-compact bg-base-100">
        <figure>
          <img src={product_image} className="bg-[#F1F1EF]" alt="product" />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center text-gray-400 text-sm">
            {product_name}
          </h2>
          <p className="font-bold text-center text-lg">€{product_price}</p>
          {/* <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div> */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
