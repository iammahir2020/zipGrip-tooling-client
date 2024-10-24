import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const ManageOrderRow = ({ order, index, refetch }) => {
  const { _id, customerName, transactionId, itemName, quantity, status } =
    order;

  const handleShipItem = () => {
    const status = {
      status: "Shipped",
      transactionId: transactionId,
      order: _id,
    };

    fetch(`${process.env.REACT_APP_LOCAL_SERVER_URL}/order/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(status),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Success", "Order has been shipped.", "success");
        refetch();
      });
  };

  const handleCancelOrder = () => {
    Swal.fire({
      title: `Cancel Order?`,
      text: `Cancel Order for ${itemName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0074b7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_LOCAL_SERVER_URL}/order/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }).then((res) => {
          if (res.status === 200) {
            Swal.fire("Cancelled!", `Order has been cancelled.`, "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <tr key={_id}>
      <th>{index + 1}</th>
      <td>{customerName}</td>
      <td>{itemName}</td>
      <td>{quantity}</td>
      <td>{status}</td>
      <td className="text-success">{transactionId}</td>
      <td>
        {status === "Pending" && (
          <button onClick={handleShipItem} className="btn btn-sm btn-success">
            <span className="mr-3 hidden lg:block">Ship Order</span>
            <FontAwesomeIcon
              className="text-xl block lg:hidden"
              icon={faTruckFast}
            />
          </button>
        )}
        {status === "Shipped" && (
          <p className="text-success font-semibold">Shipped</p>
        )}
      </td>
      <td>
        {status === "Unpaid" ? (
          <button onClick={handleCancelOrder} className="btn btn-sm btn-error">
            <span className="mr-3 hidden lg:block">Cancel</span>
            <FontAwesomeIcon
              className="text-xl block lg:hidden"
              icon={faCircleMinus}
            />
          </button>
        ) : (
          <p className="font-semibold">Can not Cancel</p>
        )}
      </td>
    </tr>
  );
};

export default ManageOrderRow;
