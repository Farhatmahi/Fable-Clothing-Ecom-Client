import React from "react";
import Banner from "../Banner/Banner";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import Reviews from "../Reviews/Reviews";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container px-4 lg:px-0 lg:mx-auto space-y-12 lg:space-y-20"
    >
      <Banner />
      <FeaturedProducts />
      <Reviews />
    </motion.div>
  );
};

export default Home;
