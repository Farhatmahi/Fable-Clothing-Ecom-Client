import React from "react";

const ProductCard = ({ jacket, trouser, short, shirt }) => {
  const { product_name, product_price, product_image } = jacket  || trouser || short || shirt;
  return (
    <div className="card card-compact bg-base-100">
      <figure>
        <img src={product_image} className="bg-[#F1F1EF]" alt="product" />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center text-gray-400 text-sm">{product_name}</h2>
        <p className="font-bold text-center text-lg">€{product_price}</p>
        {/* <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
