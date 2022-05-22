import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import StarRatings from "react-star-ratings/build/star-ratings";
import auth from "../../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
  const [user, loading, error] = useAuthState(auth);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const changeRating = (newRating) => {
    setRating(newRating);
  };
  const handleAddReview = async (event) => {
    event.preventDefault();
    const review = {
      name: user?.displayName,
      email: user?.email,
      title: event.target.title.value,
      comment: event.target.review.value,
      rating: rating,
    };
    // console.log(review);
    fetch("http://localhost:5000/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(review),
    }).then((res) => {
      // console.log("res", res);
      if (res.status === 403 || res.status === 401) {
        signOut(auth);
        localStorage.removeItem("jwtToken");
        navigate("/login");
      }
      if (res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your Review has been Sent!",
          icon: "success",
          confirmButtonText: "Proceed",
        });
        event.target.reset();
        setRating(0);
      }
    });
    // if (res.data.acknowledged === true) {
    //   await Swal.fire({
    //     title: "Success!",
    //     text: "Your Review has been Sent!",
    //     icon: "success",
    //     confirmButtonText: "Proceed",
    //   });
    //   event.target.reset();
    //   setRating(0);
    // }
    // if (res.status === 403 || res.status === 401) {
    //   signOut(auth);
    //   localStorage.removeItem("jwtToken");
    //   navigate("/login");
    // }
  };
  return (
    <div>
      <h2 className="text-primary text-center lg:text-left text-2xl lg:text-3xl my-4 font-semibold">
        Add a Review
      </h2>
      <div className="my-10 flex flex-col justify-center items-center">
        <div className="shadow-2xl w-full max-w-xl py-20 px-2 lg:px-10 rounded-lg">
          <form onSubmit={handleAddReview}>
            <div>
              <h2 className="text-lg mb-3">Rate your experience</h2>
              <StarRatings
                rating={rating}
                starRatedColor="goldenrod"
                starHoverColor="goldenrod"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
                id="rating"
              />
            </div>
            <div className=" mb-2">
              <h2 className="text-lg my-3">Review Title</h2>
              <input
                type="text"
                name="title"
                id="title"
                className="input-bordered input w-full max-w-lg"
                required
              />
            </div>
            <div className=" mb-2">
              <h2 className="text-lg my-3">Write Review</h2>
              <textarea
                type="text"
                className="input-bordered input w-full max-w-lg h-32"
                name="review"
                id="review"
                required
              />
            </div>
            <p className="mb-3 text-gray-500">
              <FontAwesomeIcon icon={faEarthAsia} />
              <span className="ml-2">
                Your review will be posted publicly on the page.
              </span>
            </p>
            <div className="review-btn">
              <input
                type="submit"
                className="btn bg-gradient-to-r from-secondary to-primary text-white w-full max-w-lg"
                value="Send"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
