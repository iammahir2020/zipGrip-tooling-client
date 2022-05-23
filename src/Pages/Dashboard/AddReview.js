import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia, faStar } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Rating from "react-rating";

const AddReview = () => {
  const [user, loading, error] = useAuthState(auth);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
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
    fetch("https://zipgrip-tooling.herokuapp.com/review", {
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
          title: "Thank you!",
          text: "Your review has been received.",
          icon: "success",
          confirmButtonText: "Proceed",
        });
        event.target.reset();
        setRating(0);
      }
    });
  };

  return (
    <div>
      <h2 className="text-primary text-center lg:text-left text-2xl lg:text-3xl my-4 font-semibold">
        Add a Review
      </h2>
      <div className="my-10 flex flex-col justify-center items-center">
        <div class="card w-full max-w-lg bg-base-100 shadow-xl">
          <div class="card-body">
            <form onSubmit={handleAddReview}>
              <div className="mb-3">
                <h2 class="card-title">Rate Your Experience!</h2>
                <Rating
                  initialRating={rating}
                  emptySymbol={
                    <FontAwesomeIcon className="text-xl" icon={faStar} />
                  }
                  fullSymbol={
                    <FontAwesomeIcon
                      style={{ color: "goldenrod" }}
                      icon={faStar}
                      className="text-xl"
                    />
                  }
                  onClick={(value) => setRating(value)}
                  className="mt-2"
                ></Rating>
              </div>
              <div className=" mb-3">
                <h2 class="card-title">Review Title</h2>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="input-bordered input w-full max-w-lg"
                  required
                />
              </div>
              <div className=" mb-3">
                <h2 class="card-title">Write Review</h2>
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
    </div>
  );
};

export default AddReview;
