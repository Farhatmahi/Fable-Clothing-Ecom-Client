import React from "react";
import Jackets from "../Jackets/Jackets";
import Shirts from "../Shirts/Shirts";
import Shorts from "../Shorts/Shorts";
import Trousers from "../Trousers/Trousers";

const Shop = () => {
  return (
    <div className="container px-4 lg:px-0 lg:mx-auto space-y-12 lg:space-y-20">
      <h1 className="text-2xl lg:text-4xl text-center pt-8 lg:pt-16 font-semibold uppercase">
        Fable of Klassik
      </h1>
      <Jackets />
      <Trousers />
      <Shorts />
      <Shirts />
    </div>
  );
};

export default Shop;
