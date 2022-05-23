import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading/Loading";
import SingleReview from "./SingleReview";

const AllReviews = () => {
  const [toggle, setToggle] = useState(false);

  const { data: reviews, isLoading } = useQuery(["reviews"], () =>
    fetch("https://zipgrip-tooling.herokuapp.com/review").then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-10 px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl text-secondary font-bold">Reviews</h2>
      <h3 className="text-3xl">From Our Clients</h3>
      <div className="flex justify-end items-center gap-5 my-5">
        {toggle ? (
          <p className="font-semibold">Show Less Reviews</p>
        ) : (
          <p className="font-semibold">Show All Reviews</p>
        )}
        <input
          type="checkbox"
          class="toggle toggle-lg"
          onChange={() => setToggle(!toggle)}
        />
      </div>

      <div className="my-10">
        {reviews.length === 0 ? (
          <h2 className="text-center my-20 text-2xl text-gray-500">
            No Reviews to Show...
          </h2>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly items-center gap-7">
            {toggle ? (
              <>
                {reviews.map((review) => (
                  <SingleReview key={review._id} review={review}></SingleReview>
                ))}
              </>
            ) : (
              <>
                {reviews.slice(0, 6).map((review) => (
                  <SingleReview key={review._id} review={review}></SingleReview>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
