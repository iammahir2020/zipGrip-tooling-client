import React from "react";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating }) => {
  return (
    <Rating
      initialRating={rating}
      emptySymbol={<FontAwesomeIcon icon={faStar} />}
      fullSymbol={
        <FontAwesomeIcon style={{ color: "goldenrod" }} icon={faStar} />
      }
      readonly
    ></Rating>
  );
};

export default StarRating;
