import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../firebase.init";
import useUserInformation from "../../Hooks/useUserInformation";
import Footer from "../Shared/Footer/Footer";
import Loading from "../Shared/Loading/Loading";

const Purchase = () => {
  const { id } = useParams();
  const [disableBtn, setdisableBtn] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [profileUser, isLoadingUser] = useUserInformation(user);
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  const { data: product, isLoading } = useQuery(["singleProduct", id], () =>
    fetch(`https://zipgrip-tooling.herokuapp.com/product/singleProduct/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).then((res) => res.json())
  );

  const handlePlaceOrder = (event) => {
    setAdding(true);
    event.preventDefault();

    const amountToBePaid =
      parseInt(event.target.quantity.value) * parseFloat(product.price);
    // console.log(amountToBePaid);

    const order = {
      itemId: product._id,
      itemName: product.name,
      customerName: user.displayName,
      customerEmail: user.email,
      quantity: event.target.quantity.value,
      amountToBePaid: amountToBePaid,
      customerAddress: event.target.address.value,
      customerNumber: event.target.number.value,
      status: "Unpaid",
    };
    console.log(order);

    fetch("https://zipgrip-tooling.herokuapp.com/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(order),
    }).then((res) => {
      if (res.status === 403 || res.status === 401) {
        signOut(auth);
        localStorage.removeItem("jwtToken");
        navigate("/login");
      }
      if (res.status === 200) {
        const remainingQuantity =
          parseInt(product.available) - parseInt(order.quantity);

        fetch(`https://zipgrip-tooling.herokuapp.com/product/${product._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify({ remainingQuantity: remainingQuantity }),
        }).then((res) => {
          if (res.status === 403 || res.status === 401) {
            signOut(auth);
            localStorage.removeItem("jwtToken");
            navigate("/login");
          }
          if (res.status === 200) {
            setAdding(false);
            Swal.fire({
              title: "Order Has been place.",
              text: "Please complete payment to confirm your order",
              icon: "success",
              confirmButtonText: "Proceed",
            }).then(async (result) => {
              if (result.isConfirmed) {
                event.target.reset();
                navigate("/dashboard/myOrders");
              }
            });
          }
        });
      }
    });
  };

  if (loading || isLoading || isLoadingUser || adding) {
    return <Loading></Loading>;
  }

  const handleQuantityChange = (quantity) => {
    if (
      parseInt(quantity) < parseInt(product.minimum) ||
      parseInt(quantity) > parseInt(product.available)
    ) {
      Swal.fire(
        "error",
        `You can not order more then ${product.available} and less then ${product.minimum}`,
        "error"
      );
      setdisableBtn(true);
    } else {
      setdisableBtn(false);
    }
  };

  // if (product.minimum) {
  // if (
  //   parseInt(orderQuantity) < parseInt(product.minimum) ||
  //   parseInt(orderQuantity) > parseInt(product.available)
  // ) {
  //   console.log("asdasdasd");
  //   setdisableBtn(true);
  // Swal.fire(
  //   "error",
  //   `You can not order more then ${product.available} and less then ${product.minimum}`,
  //   "error"
  // );
  // }
  //   console.log(orderQuantity);
  // }

  return (
    <div>
      <div className="my-10 px-6 lg:px-0 max-w-7xl mx-auto">
        <h2 className="text-2xl text-secondary font-bold">Complete Order</h2>
        <h3 className="text-3xl">Please fill necessary information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 p-5 bg-[#eff0f3] shadow-xl rounded-xl my-10 items-center">
          <div className="mb-10 lg:mb-0 lg:p-10 w-md flex justify-center">
            <img src={product.image} alt="img" className="rounded-xl" />
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">{product.name}</h2>
            <p className="my-2 lg:text-xl">{product.description}</p>

            <br />
            <p className=" lg:text-xl">
              Available Quantity:{" "}
              <span className="font-bold">{product.available}</span>
            </p>
            <p className=" lg:text-xl">
              Minimum Order Quantity:{" "}
              <span className="font-bold">{product.minimum}</span>
            </p>
            <p className=" lg:text-xl">
              Price: $<span className="font-bold">{product.price}</span>/unit
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="card">
            <div className="card-body">
              <form
                onSubmit={handlePlaceOrder}
                className="flex flex-col lg:flex-row gap-5"
              >
                <div>
                  <p className="mb-4 text-center text-2xl font-bold">
                    Order Information
                  </p>
                  <div className="form-control w-full max-w-lg mb-2 my-3">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">
                        Item Name
                      </span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        Item
                      </span>
                      <input
                        type="text"
                        defaultValue={product.name}
                        id="itemName"
                        name="itemName"
                        className="input input-bordered w-full max-w-lg"
                        disabled
                        required
                      />
                    </label>
                  </div>
                  <div className="form-control w-full max-w-lg mb-2 my-3">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">
                        Order Quantity
                      </span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        Quantity
                      </span>
                      <input
                        type="number"
                        defaultValue={product.minimum}
                        id="quantity"
                        name="quantity"
                        className="input input-bordered w-full max-w-lg"
                        required
                        onBlur={(event) =>
                          handleQuantityChange(event.target.value)
                        }
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <p className="mb-4 text-center text-2xl font-bold">
                    Personal Information
                  </p>
                  <div className="form-control w-full max-w-lg mb-2">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">Name</span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        Name
                      </span>
                      <input
                        type="text"
                        defaultValue={user.displayName}
                        id="name"
                        name="name"
                        className="input input-bordered w-full max-w-lg"
                        required
                        disabled
                      />
                    </label>
                  </div>

                  <div className="form-control w-full max-w-lg mb-2">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        Email
                      </span>
                      <input
                        type="email"
                        defaultValue={user.email}
                        id="email"
                        name="email"
                        className="input input-bordered w-full max-w-lg"
                        disabled
                        required
                      />
                    </label>
                  </div>

                  <div className="form-control w-full max-w-lg mb-2">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">Address</span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        Address
                      </span>
                      <textarea
                        type="text"
                        defaultValue={profileUser?.address}
                        id="address"
                        name="address"
                        className="input input-bordered w-full max-w-lg h-24"
                        required
                      />
                    </label>
                  </div>
                  <div className="form-control w-full max-w-lg mb-2">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">
                        Phone Number
                      </span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        Number
                      </span>
                      <input
                        type="number"
                        defaultValue={profileUser?.number}
                        id="number"
                        name="number"
                        className="input input-bordered w-full max-w-lg"
                        required
                      />
                    </label>
                  </div>

                  <div className="card-actions justify-end">
                    <input
                      className="btn w-full max-w-lg bg-gradient-to-r from-secondary to-primary text-white my-3"
                      type="submit"
                      value="Place Order"
                      disabled={disableBtn}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Purchase;
