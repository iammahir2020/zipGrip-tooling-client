import React from "react";

const AllPaymentsRow = ({ payment, index }) => {
  const { order, transactionId } = payment;
  return (
    <tr key={payment._id}>
      <th>{index + 1}</th>
      <td>{order}</td>
      <td>{transactionId}</td>
    </tr>
  );
};

export default AllPaymentsRow;
