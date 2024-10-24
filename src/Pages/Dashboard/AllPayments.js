import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading/Loading";
import AllPaymentsRow from "./AllPaymentsRow";

const AllPayments = () => {
  const { data: payments, isLoading } = useQuery(["allPayments"], () =>
    fetch(`${process.env.REACT_APP_LIVE_SERVER_URL}/payment`, {
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
        All Payments {payments.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>Transection ID</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment, index) => (
              <AllPaymentsRow
                key={payment._id}
                payment={payment}
                index={index}
              ></AllPaymentsRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPayments;
