import React from 'react';

const ReviewsCard = ({review}) => {
    const {name, email, reviewText, img, product_name} = review;
    return (
        
        <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-black border ">
          <blockquote class="max-w-2xl mx-auto mb-4 text-black lg:mb-8 ">
            <h3 class="text-lg font-semibold text-black ">
              {reviewText}
            </h3>
            <p class="my-4 font-light">
              Product : {product_name}
            </p>
          </blockquote>
          <figcaption class="flex items-center justify-center space-x-3">
            <img
              class="rounded-full w-9 h-9"
              src={img}
              alt=""
            />
            <div class="space-y-0.5 font-medium text-black text-left">
              <div>{name}</div>
              <div class="text-sm font-light text-gray-500 dark:text-gray-400">
                {email}
              </div>
            </div>
          </figcaption>
        </figure>
    
    );
};

export default ReviewsCard;