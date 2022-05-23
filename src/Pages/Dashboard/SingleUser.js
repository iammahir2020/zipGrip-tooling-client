import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SingleUser = ({ user, index, refetch }) => {
  const { position, email } = user;

  const handleMakeAdmin = () => {
    fetch(`https://zipgrip-tooling.herokuapp.com/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          toast.error("Failed to make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.result.acknowledged) {
          Swal.fire(`${email}`, `Successfully made an admin`, "success");
          refetch();
        }
      });
  };
  const handleRemoveUser = () => {
    Swal.fire({
      title: `Remove ${email} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0074b7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetch(`https://zipgrip-tooling.herokuapp.com/user/${email}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }).then((res) => {
          if (res.status === 200) {
            Swal.fire("Removed!", `${email} has been removed.`, "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <tr key={user._id}>
      <th>{index + 1}</th>
      <td>{email}</td>
      <td>
        {position !== "admin" ? (
          <button onClick={handleMakeAdmin} className="btn btn-sm btn-success">
            <span className="mr-3 hidden lg:block">Make Admin</span>
            <FontAwesomeIcon
              className="text-xl block lg:hidden"
              icon={faUserGear}
            />
          </button>
        ) : (
          <p className="text-success font-semibold">Admin</p>
        )}
      </td>
      <td>
        <button onClick={handleRemoveUser} className="btn btn-sm btn-error">
          <span className="mr-3 hidden lg:block">Remove</span>
          <FontAwesomeIcon
            className="text-xl block lg:hidden"
            icon={faCircleMinus}
          />
        </button>
      </td>
    </tr>
  );
};

export default SingleUser;
