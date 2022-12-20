import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import ReviewCard from "./ReviewCard";

const Tabs = ({ product }) => {
  const {
    _id,
    product_name,
    product_type,
    product_description,
  } = product;

  const [toggleState, setToggleState] = useState(1);
  const { user } = useContext(AuthContext);

  const toggleTab = (index) => {
    setToggleState(index);
  };


  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", _id],
    queryFn: async () => {
      const url = `https://fable-server-farhatmahi.vercel.app/reviews?product=${_id}`;
      // console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const addReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const reviewText = form.review.value;
    const email = user?.email;

    const review = {
      name: user?.displayName || "Unknown user",
      email,
      product_id: _id,
      product_name,
      product_type,
      img: user?.photoURL,
      reviewText,
    };

    fetch("https://fable-server-farhatmahi.vercel.app/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          toast.success(`Review added`, {
            style: {
              padding: "16px",
              backgroundColor: "#000000",
              color: "#ffffff",
              borderRadius: "0",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#000000",
            },
          });
        }
        refetch()
      });
     
  };


  // console.log(reviews);

  return (
    <div className="tabs mt-8">
      <button
        className={
          toggleState === 1 ? "tab tab-bordered tab-active" : "tab tab-bordered"
        }
        onClick={() => toggleTab(1)}
      >
        Product Descriptions
      </button>
      <button
        className={
          toggleState === 2 ? "tab tab-bordered tab-active" : "tab tab-bordered"
        }
        onClick={() => toggleTab(2)}
      >
        Reviews
      </button>
      <button
        className={
          toggleState === 3 ? "tab tab-bordered tab-active" : "tab tab-bordered"
        }
        onClick={() => toggleTab(3)}
      >
        Delivery & Returns
      </button>

      <div className="content-tabs mt-4">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <p>{product_description}</p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          {user?.uid ? <form onSubmit={addReview} className="mb-8">
            <input
              type="text"
              name="review"
              placeholder="Write something good"
              className="input input-bordered border-black rounded-none w-full max-w-lg"
            />
            <button className="btn bg-black text-white rounded-none">
              Review
            </button>
          </form> : <p>You must log in to write a review</p>}

          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <p>
            If your order arrives faulty or damaged in any way (very rare),
            please just send us an email with a picture of the issue to
            emeraldprintz@aol.com and we will get back to you as soon as
            possible. Similarly, if we have sent you the wrong item by mistake –
            (it happens sometimes, we’re only human), just drop us an email we
            will arrange to have the correct item sent out. If we require the
            original item returning to us, we will arrange for a pre-paid
            returns envelope to be sent out to you. Unfortunately we cannot
            provide refunds or exchanges on orders unless they are damaged or
            faulty.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
