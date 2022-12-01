import React from 'react';
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import Loader from '../../../Shared/Loader/Loader';

const Trousers = () => {
    const type = 'Trouser'
    const { data: trousers = [], isLoading} = useQuery({
        queryKey: ["jackets", type],
        queryFn: async () => {
          const url = `http://localhost:1000/all-products/${type}`;
          const res = await fetch(url);
          const data = await res.json();
          return data;
        },
      });

      if(isLoading){
        return <Loader />
      }

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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {trousers.map((trouser) => (
          <ProductCard key={trouser._id} trouser={trouser} />
        ))}
      </div>
    </div>
    );
};

export default Trousers;