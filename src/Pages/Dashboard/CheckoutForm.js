import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useSingleProduct from "../../Hooks/useSingleProduct";
import Loading from "../Shared/Loading/Loading";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";

const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [cardSuccess, setCardSuccess] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [disableBtn, setdisableBtn] = useState(false);
  const navigate = useNavigate();

  const { _id, itemId, amountToBePaid, quantity, customerName, customerEmail } =
    order;

  const [product, isLoading] = useSingleProduct(itemId);

  useEffect(() => {
    fetch(`https://zipgrip-tooling.herokuapp.com/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify({ amountToBePaid: amountToBePaid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [amountToBePaid]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setCardSuccess("");

    setProcessing(true);
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: customerName,
            email: customerEmail,
          },
        },
      });

    if (intentError) {
      setProcessing(false);
      setCardError(intentError.message);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      setCardSuccess("Payment is successful!");

      const payment = {
        order: _id,
        transactionId: paymentIntent.id,
        status: "Paid",
      };

      fetch(`https://zipgrip-tooling.herokuapp.com/order/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProcessing(false);
          setdisableBtn(true);

          console.log(quantity, "quantity");
          console.log(product.available, "available");

          const remainingQuantity =
            parseInt(product.available) - parseInt(quantity);

          fetch(
            `https://zipgrip-tooling.herokuapp.com/product/${product._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              },
              body: JSON.stringify({ remainingQuantity: remainingQuantity }),
            }
          ).then((res) => {
            if (res.status === 403 || res.status === 401) {
              signOut(auth);
              localStorage.removeItem("jwtToken");
              navigate("/login");
            }
            if (res.status === 200) {
              Swal.fire(
                `Payment is successful!`,
                `Your TransectionID is ${paymentIntent.id}`,
                "success"
              ).then(async (result) => {
                if (result.isConfirmed) {
                  navigate("/dashboard/myOrders");
                }
              });
            }
          });
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex justify-end mt-5">
          {!processing ? (
            <button
              className="btn bg-gradient-to-r from-secondary to-primary text-white my-3"
              type="submit"
              disabled={!stripe || !clientSecret || disableBtn}
            >
              Make payment
            </button>
          ) : (
            <button class="btn bg-gradient-to-r from-secondary to-primary text-white my-3 loading">
              Processing
            </button>
          )}
        </div>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {cardSuccess && (
        <div className="text-green-500">
          <p>{cardSuccess} </p>
          <p>
            Your transactionId:{" "}
            <span className="font-bold text-primary">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
