import React from "react";

const ReviewCard = ({review}) => {
    const {name, img, reviewText} = review

  return (
    <div className="border-black border flex flex-col px-4 py-6 mb-4">
      <div className="flex justify-start items-center mb-4">
        <div className="avatar mr-4">
          <div className="w-12 rounded-full">
            <img src={img} alt='review_image'/>
          </div>
        </div>
        <h1 className="font-bold">{name}</h1>
      </div>
      <div className="">
        <p className="italic">"{reviewText}"</p>
      </div>
    </div>
  );
};

export default ReviewCard;
