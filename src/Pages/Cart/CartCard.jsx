import React from "react";
import { useState } from "react";

const CartCard = ({
  cartItem,
  setcartPriceWithQuantity,
  cartPriceWithQuantity,
  setTotal,
  total,
}) => {
  const {
    _id,
    product_name,
    product_image,
    product_price,
    product_size,
    product_type,
  } = cartItem;

  const [quantity, setQuantity] = useState(1);
  setcartPriceWithQuantity(parseInt(product_price));

  let newQuantity;
  const handleIncrement = () => {
    newQuantity = setQuantity(quantity + 1);
    return newQuantity;
  };
  const handleDecrement = () => {
    if (quantity > 0) {
      newQuantity = setQuantity(quantity - 1);
      return newQuantity;
    }
  };

  console.log(newQuantity);
  setcartPriceWithQuantity(product_price * newQuantity);
  console.log("cartPriceWithQuantity : ", cartPriceWithQuantity);
  // console.log(total)
  // setTotal(total + cartPriceWithQuantity)
  // console.log("subtotal", total);

  // setcartPriceWithQuantity(product_price * quantity);
  // setTotal(total + cartPriceWithQuantity)
  // console.log(cartPriceWithQuantity);

  //  console.log(typeof product_price);

  return (
    <div className="card card-side bg-base-100 mb-6 rounded-none">
      <figure>
        <img
          src={product_image}
          className="w-36 bg-[#F1F1EF]"
          alt="product_image"
        />
      </figure>
      <div className="card-body flex flex-col justify-between p-0 ml-4">
        <div className="">
          <h2 className="font-semibold">{product_name}</h2>

          <p className="text-xs">Kollection : {product_type}</p>
          <p className="text-xs">Product ID : {_id}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-sm">Size : {product_size}</p>
          <p className="text-sm">
            Quantity :{" "}
            <button
              onClick={handleDecrement}
              className="btn btn-xs rounded-none"
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="btn btn-xs rounded-none"
            >
              +
            </button>
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-semibold">Price : € {product_price}</p>
          <p className="hover:underline  text-gray-400 hover:text-black text-sm font-semibold">
            Delete
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
