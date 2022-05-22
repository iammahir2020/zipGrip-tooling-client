import React from "react";
import StarRating from "./StarRating";

const SingleReview = ({ review }) => {
  const { name, title, comment, rating } = review;
  return (
    // <div className="border">
    //   <p>{title}</p>
    //   <p>{comment}</p>
    //   <StarRating rating={rating}></StarRating>
    //   <p>{name}</p>
    // </div>
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="italic ">"{comment}"</p>
        <StarRating rating={rating}></StarRating>
        <div className="card-actions">
          <p className="text-xl font-semibold text-right">- {name}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
