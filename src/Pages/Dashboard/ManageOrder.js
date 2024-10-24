import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading/Loading";
import ManageOrderRow from "./ManageOrderRow";

const ManageOrder = () => {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["allOrders"], () =>
    fetch(`${process.env.REACT_APP_LIVE_SERVER_URL}/order`, {
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
    <div>
      <h2 className="text-primary text-center lg:text-left text-2xl lg:text-3xl my-4 font-semibold">
        Manage Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Customer Name</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Transection ID</th>
              <th>Action</th>
              <th>Cancel Order</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <ManageOrderRow
                key={order._id}
                order={order}
                index={index}
                refetch={refetch}
              ></ManageOrderRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrder;
