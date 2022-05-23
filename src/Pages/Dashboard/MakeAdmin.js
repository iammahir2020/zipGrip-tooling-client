import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading/Loading";
import SingleUser from "./SingleUser";

const MakeAdmin = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["users"], () =>
    fetch(`https://zipgrip-tooling.herokuapp.com/user`, {
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
        All Users
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Remove User</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <SingleUser
                key={user._id}
                user={user}
                index={index}
                refetch={refetch}
              ></SingleUser>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
