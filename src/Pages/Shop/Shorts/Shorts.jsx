import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "../../../Shared/Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";

const Shorts = () => {
  const type = "Shorts";
  const { data: shorts = [], isLoading } = useQuery({
    queryKey: ["shorts"],
    queryFn: async () => {
      const url = `https://fable-server.vercel.app/all-products/${type}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="font-semibold">Jackets KLS</h2>
        <h2>
          Sort by :{" "}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="text-gray-400 m-1">
              New <BsChevronDown className="inline" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link>Price</Link>
              </li>
              <li>
                <Link>Sale</Link>
              </li>
            </ul>
          </div>
        </h2>
      </div>
      {isLoading && <Loader />}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {shorts.map((short) => (
          <ProductCard key={short._id} short={short} />
        ))}
      </div>
    </div>
  );
};

export default Shorts;
