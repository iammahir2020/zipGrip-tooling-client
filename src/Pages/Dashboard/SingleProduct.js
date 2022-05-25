import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const SingleProduct = ({ product, index, refetch }) => {
  const { addedBy, name, available, minimum, price, image } = product;

  const handleRemoveProduct = () => {
    Swal.fire({
      title: `Remove ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0074b7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetch(`https://zipgrip-tooling.herokuapp.com/product/${product._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }).then((res) => {
          if (res.status === 200) {
            Swal.fire("Removed!", `${name} has been removed.`, "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <tr key={product._id}>
      <th>{index + 1}</th>
      <td>
        <div className="avatar">
          <div className="w-16">
            <img src={image} alt="img" />
          </div>
        </div>
      </td>
      <td>{name}</td>
      {/* <td>update</td> */}
      <td>
        <button onClick={handleRemoveProduct} className="btn btn-sm btn-error">
          <span className="mr-3 hidden lg:block">Remove</span>
          <FontAwesomeIcon
            className="text-xl block lg:hidden"
            icon={faCircleMinus}
          />
        </button>
      </td>
      <td>{addedBy}</td>
      <td className="text-center">{available}</td>
      <td className="text-center">{minimum}</td>
      <td className="text-center">${price}</td>
    </tr>
  );
};

export default SingleProduct;
