import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import PaymentModal from "../../Shared/PaymentModal/PaymentModal";
import Tabs from "./Tabs";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";

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

  const stripePromise = loadStripe(
    "pk_test_51M7FK2JH0OzhgIOy9rRnhZiTBKnIDP2aQJVRCrfYfNuLtnLZj2I5YeuvhaFQSgkNkvOHCtkG0KCb6ku5BkQfZNyO002uQYn9Jk"
  );

  const [size, setSize] = useState("XS");
  const [active, setActive] = useState(false);

  const handleSize = (size) => {
    setSize(size);
  };

  const handleAddToCart = () => { 
    if(user?.email){
      const productData = {
        email: user?.email,
        product_name,
        product_id: _id,
        product_price,
        product_size: size,
        product_type,
        product_image,
      };
  
      fetch("https://fable-server-farhatmahi.vercel.app/cart", {
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
          toast.success(`${product_name} added to cart`, {
            style: {
              padding: "16px",
              backgroundColor: "#000000",
              color: "#ffffff",
              borderRadius: "0",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#000000",
            },
          });
        } else {
          toast.error(`${product_name} already added to cart`, {
            style: {
              padding: "16px",
              backgroundColor: "#000000",
              color: "#ffffff",
              borderRadius: "0",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#000000",
            },
          });
        }
      })
    }
    else{
      toast.error(`You need to log in before adding product to the cart`, {
        style: {
          padding: "16px",
          backgroundColor: "#000000",
          color: "#ffffff",
          borderRadius: "0",
        },
        iconTheme: {
          primary: "#ffffff",
          secondary: "#000000",
        },
      });
    }
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
          <h1 className="text-md text-gray-400 lg:text-black text-center lg:text-left lg:text-xl lg:uppercase">{product_name}</h1>
          <h2 className="text-2xl lg:mt-4 font-semibold text-center lg:text-left">€ {product_price}</h2>
          <div className="my-8 flex justify-around lg:justify-start">
            {product_size.map((size) => (
              <button key={size}
                onClick={() => {
                  handleSize(size);
                  setActive(true);
                }}
                className={`btn btn-square btn-outline rounded-none lg:mr-4
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
            <label
              htmlFor="payment-modal"
              className="btn bg-black lg:btn-wide text-white"
            >
              Buy now
            </label>
          </div>
          <Tabs product={product} />
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <PaymentModal product={product}  />
      </Elements>
    </div>
  );
};

export default ProductPage;
