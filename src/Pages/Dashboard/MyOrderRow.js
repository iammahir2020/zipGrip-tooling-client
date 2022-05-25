import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const MyOrderRow = ({ order, index, refetch }) => {
  const { _id, itemName, quantity, paid, transectionID, amountToBePaid } =
    order;
  const handlePay = () => {
    console.log("handlePay");
  };
  const handleCancelOrder = () => {
    Swal.fire({
      title: `Cancel Order?`,
      text: `Cancel Your Order of ${itemName}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0074b7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/order/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }).then((res) => {
          if (res.status === 200) {
            Swal.fire(
              "Cancelled!",
              `Order for ${itemName} has been cancelled.`,
              "success"
            );
            refetch();
          }
        });
      }
    });
  };
  return (
    <tr key={order._id}>
      <th>{index + 1}</th>
      <td>{itemName}</td>
      <td>{quantity}</td>
      <td>${amountToBePaid}</td>
      <td>
        {!paid ? (
          <button onClick={handlePay} className="btn btn-sm btn-success">
            <span className="mr-3 hidden lg:block">Pay</span>
            <FontAwesomeIcon
              className="text-xl block lg:hidden"
              icon={faCreditCard}
            />
          </button>
        ) : (
          <>
            <p className="text-green-500">Paid</p>
            <p className="text-green-500">{transectionID}</p>
          </>
        )}
      </td>
      <td>
        {!paid && (
          <button onClick={handleCancelOrder} className="btn btn-sm btn-error">
            <span className="mr-3 hidden lg:block">Cancel</span>
            <FontAwesomeIcon
              className="text-xl block lg:hidden"
              icon={faCircleMinus}
            />
          </button>
        )}
      </td>
    </tr>
  );
};

export default MyOrderRow;
