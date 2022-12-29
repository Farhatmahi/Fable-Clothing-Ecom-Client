import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../../../Shared/Loader/Loader';
import ProductCard from '../../Shop/ProductCard/ProductCard';

const FeaturedProducts = () => {

    const {data : allProducts = [], isLoading} = useQuery({
        queryKey : ["allProducts"],
        queryFn : async() => {
            const res = await fetch(`https://fable-server-farhatmahi.vercel.app/all-products`)
            const data = await res.json()
            return data
        }
    })

    // console.log(allProducts);

    let shuffledProducts = allProducts.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value).slice(0, 8)

    console.log(shuffledProducts);

    if(isLoading){
        return <Loader />
    }

    return (
        <div>
            <h1 className="font-semibold text-xl mb-8">Featured Products</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {shuffledProducts.map((product) => (
          <ProductCard key={product._id} jacket={product} shirt={product} trouser={product} shorts={product} />
        ))}
      </div>
        </div>
    );
};

export default FeaturedProducts;