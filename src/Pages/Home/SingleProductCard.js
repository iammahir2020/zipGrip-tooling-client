import React from "react";
import { useNavigate } from "react-router-dom";

const SingleProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { _id, name, description, available, minimum, price, image } = product;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-5 bg-base-100 hover:bg-[#eff0f3] hover:shadow-xl rounded-xl">
      <div className="pb-5 lg:pb-0 lg:pr-5 flex justify-center">
        <img src={image} alt="img" className="rounded-xl" />
      </div>
      <div className="relative">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="my-2">{description}</p>
        <p>
          Available Quantity: <span className="font-bold">{available}</span>
        </p>
        <p>
          Minimum Order Quantity: <span className="font-bold">{minimum}</span>
        </p>
        <p>
          Price: $<span className="font-bold">{price}</span>/unit
        </p>
        <br />
        <br />
        <br />
        <div className="absolute bottom-0 right-0">
          <button
            onClick={() => navigate(`/purchase/${_id}`)}
            className="btn bg-gradient-to-r from-secondary to-primary text-white"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
