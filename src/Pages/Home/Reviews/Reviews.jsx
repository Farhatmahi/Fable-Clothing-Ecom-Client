import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../Shared/Loader/Loader";
import ReviewsCard from "./ReviewsCard";

const Reviews = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch("https://fable-server-farhatmahi.vercel.app/all-reviews");
      const data = await res.json();
      return data;
    },
  });

  let shuffledReviews = reviews.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value).slice(0, 4)

    console.log(shuffledReviews);

    if(isLoading){
      return <Loader />
    }

  return (
    <div>
      <h1 className="font-semibold text-xl mb-8">Reviews</h1>
      <div class="grid gap-6 mb-8 md:mb-12 md:grid-cols-2">
        {
            shuffledReviews.map(review => <ReviewsCard key={review._id} review={review}/>)
        }
    </div>
    </div>
  );
};

export default Reviews;
