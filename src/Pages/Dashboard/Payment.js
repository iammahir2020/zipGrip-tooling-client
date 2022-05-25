import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const publishableKey = loadStripe(
  "pk_test_51L1DgvA4VBRUNvSkX4jArgTW5i1hjc9B9CY0UZGioJjTo7fkqa9i1V9xLG5JJrn45PTCFW58pGk3WatodKyHEZvr00NwqU7l21"
);

const Payment = () => {
  const { id } = useParams();
  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery(["singleOrder", id], () =>
    fetch(`http://localhost:5000/order/payment/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">
      {/* <h2 className="text-primary text-center lg:text-left text-2xl lg:text-3xl my-4 font-semibold">
        Complete Payment
      </h2> */}
      <div className="card bg-base-100 shadow-xl my-5">
        <div className="card-body">
          <p>
            Hello,{" "}
            <span className="text-2xl text-primary">{order.customerName}</span>
          </p>
          <h2 className="card-title">Your Order Details</h2>
          <hr />
          <p>
            Item Ordered: <span className="font-bold">{order.itemName}</span>
          </p>
          <p>
            Order Quantity: <span className="font-bold">{order.quantity}</span>
          </p>

          <p>
            Shipping Address:{" "}
            <span className="font-bold">{order.customerAddress}</span>
          </p>
          <p>
            Contact Number:{" "}
            <span className="font-bold">{order.customerNumber}</span>
          </p>
          <p className="text-xl my-2">
            Amount to be paid:{" "}
            <span className="text-2xl font-bold text-primary">
              $ {order.amountToBePaid}
            </span>
          </p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl my-5">
        <div className="card-body">
          <h2 className="card-title mb-5">Complete Payment</h2>
          <Elements stripe={publishableKey}>
            <CheckoutForm order={order} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
