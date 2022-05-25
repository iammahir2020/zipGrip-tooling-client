import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import MyOrderRow from "./MyOrderRow";

const MyOrders = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["orders", user.email], () =>
    fetch(`http://localhost:5000/order/${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h2 className="text-primary text-center lg:text-left text-2xl lg:text-3xl my-4 font-semibold">
        My Orders
      </h2>
      <h2>Number of orders: {orders.length}</h2>
      {orders.length === 0 ? (
        <h2 className="text-center my-20 text-2xl text-gray-500">
          You have not ordered anything
        </h2>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>
                  Amount To <br />
                  be paid
                </th>
                <th>Status</th>
                <th>Make Payment</th>
                <th>Cancel Order</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <MyOrderRow
                  key={order._id}
                  order={order}
                  index={index}
                  refetch={refetch}
                ></MyOrderRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
