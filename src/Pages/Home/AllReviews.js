import React, { useEffect, useState } from "react";
import SingleReview from "./SingleReview";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div className="my-10 px-6 max-w-7xl mx-auto">
      <h2 className="text-xl text-secondary font-bold">Reviews</h2>
      <h3 className="text-2xl">From Our Clients</h3>
      <div className="my-10">
        {reviews.length === 0 ? (
          <h2 className="no-item-message">No Reviews to Show</h2>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly items-center gap-7">
            {reviews.map((review) => (
              <SingleReview key={review._id} review={review}></SingleReview>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
