import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import CartCard from "./CartCard";
import { useState } from "react";
import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CartTotalPayment from "../../Shared/PaymentModal/CartTotalPayment";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "../../Shared/Loader/Loader";
import { createContext } from "react";

export const CartContext = createContext();

const Cart = ({ children }) => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [cartPriceWithQuantity, setcartPriceWithQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  const {
    data: cart = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://fable-server-farhatmahi.vercel.app/cartFilteredByUser?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  let sum = 0;
  cart.map((cartItem) => {
    const productPrice = parseInt(cartItem.product_price);
    sum += productPrice;
    return sum;
  });

  useEffect(() => {
    setTotal(sum);
  }, [sum]);

  if (isLoading) {
    return <Loader />;
  }

  const stripePromise = loadStripe(
    "pk_test_51M7FK2JH0OzhgIOy9rRnhZiTBKnIDP2aQJVRCrfYfNuLtnLZj2I5YeuvhaFQSgkNkvOHCtkG0KCb6ku5BkQfZNyO002uQYn9Jk"
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto px-4 lg:px-0 mt-8 min-h-screen">
      <h1 className="font-semibold text-xl mb-8">Order Summary</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handlePlaceOrder} className="order-2 lg:order-1">
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              defaultValue={user.displayName}
              className="input input-bordered rounded-none border-black w-full lg:max-w-xs"
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              required
              defaultValue={user.email}
              className="input input-bordered rounded-none border-black w-full lg:max-w-xs"
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Phone Number</span>
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              required
              className="input input-bordered rounded-none border-black w-full lg:max-w-xs"
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Address</span>
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              required
              className="input input-bordered rounded-none border-black w-full lg:max-w-lg"
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">City</span>
            </label>
            <input
              type="text"
              placeholder="Enter your city"
              required
              className="input input-bordered rounded-none border-black w-full lg:max-w-xs"
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Delivery Method</span>
            </label>
            <div className="flex flex-col lg:flex-row">
              <label className="btn bg-white hover:bg-black hover:text-white text-black border-black focus:bg-black focus:text-white lg:btn-wide w-full rounded-none">
                In-store pickup
              </label>
              <label className="btn bg-white hover:bg-black hover:text-white text-black border-black focus:bg-black focus:text-white lg:btn-wide w-full rounded-none">
                To the door
              </label>
            </div>
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Promo Card</span>
            </label>
            <input
              type="text"
              placeholder="Enter if you have any"
              className="input input-bordered rounded-none border-black w-full lg:max-w-xs"
            />
          </div>
          <label
            htmlFor="cart-modal"
            className="btn bg-black lg:btn-wide w-full text-white rounded-none mt-6"
          >
            Make Payment
          </label>
        </form>

        <div className="order-1 lg:order-2">
          {cart &&
            cart.map((cartItem) => (
              <CartCard
                key={cartItem._id}
                cartItem={cartItem}
                cartPriceWithQuantity={cartPriceWithQuantity}
                setcartPriceWithQuantity={setcartPriceWithQuantity}
                setTotal={setTotal}
                total={total}
                refetch={refetch}
              />
            ))}
          <div className="">
            <div className="">
              {cart &&
                cart.map((cartItem) => (
                  <div className="flex justify-between">
                    <p className="text-xs">{cartItem.product_name}</p>
                    <p className="text-xs font-semibold">
                      € {cartItem.product_price}
                    </p>
                  </div>
                ))}
              <div className="flex justify-between mt-6">
                <p className="text-xs ">Summary</p>
                <p className="text-xs font-semibold">€ {total}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs">Delivery Cost</p>
                <p className="text-xs font-semibold">€ 10</p>
              </div>
              <hr className="border-black my-4" />
              <div className="flex justify-between">
                <p className="text-xs">Subtotal</p>
                <p className="text-xs font-semibold">€ {total + 10}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <CartTotalPayment cart={cart} total={total + 10} />
      </Elements>
    </div>
  );
};

export default Cart;
