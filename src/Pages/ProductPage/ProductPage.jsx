import React from "react";
import { useState } from "react";
import { useContext } from "react";
// import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Tabs from "./Tabs";

const ProductPage = () => {
  const { user } = useContext(AuthContext);
  const product = useLoaderData();
  const {
    _id,
    product_image,
    product_name,
    product_price,
    product_type,
    product_size,
  } = product;

  const [size, setSize] = useState("XS");
  const [active, setActive] = useState(false);

  const handleSize = (size) => {
    setSize(size);
    // console.log(size);
    setActive(true);
  };

  const handleAddToCart = () => {
    const productData = {
      email: user.email,
      product_name,
      product_id: _id,
      product_price,
      product_size: size,
      product_type,
      product_image,
    };

    fetch("http://localhost:1000/cart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          // toast(`${product_name} added to cart`)
        }
      });
  };

  return (
    <div className="container mx-auto px-4 lg:px-0 mt-8">
      <div className="text-sm lg:text-md font-semibold breadcrumbs">
        <ul>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/shop">{product_type}</Link>
          </li>
          <li>
            <Link to="#">{product_name}</Link>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="">
          <img src={product_image} className="bg-[#F1F1EF] w-full" alt="" />
        </div>
        <div className="">
          <h1 className="text-xl uppercase">{product_name}</h1>
          <h2 className="text-2xl mt-4 font-semibold">€ {product_price}</h2>
          <div className="my-8">
            {product_size.map((size) => (
              <button
                onClick={() => {
                  handleSize(size);
                }}
                className={`btn btn-square btn-outline rounded-none ml-2 
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row">
            <button
              onClick={handleAddToCart}
              className="btn bg-black lg:btn-wide text-white"
            >
              Add to cart
            </button>
            <button className="btn bg-black lg:btn-wide text-white">
              Buy now
            </button>
          </div>
          <Tabs product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
