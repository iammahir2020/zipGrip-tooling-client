import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading/Loading";
import SingleProduct from "./SingleProduct";

const ManageProduct = () => {
  const {
    data: products,
    refetch,
    isLoading,
  } = useQuery("products", () =>
    fetch(`http://localhost:5000/product`, {
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
        Manage Products
      </h2>
      <p>Products added: {products.length}</p>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              {/* <th>Update Stock</th> */}
              <th>Remove Product</th>
              <th>Added By</th>
              <th>Available Quantity</th>
              <th>Minimum Order Quantity</th>
              <th>Price Per Unit</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <SingleProduct
                key={product._id}
                product={product}
                index={index}
                refetch={refetch}
              ></SingleProduct>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
