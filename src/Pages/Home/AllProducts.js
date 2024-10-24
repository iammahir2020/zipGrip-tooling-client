import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";
import SingleProductCard from "./SingleProductCard";

const AllProducts = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useQuery(["productsHome"], () =>
    fetch(`${process.env.REACT_APP_LOCAL_SERVER_URL}/product/${"home"}`).then(
      (res) => res.json()
    )
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="my-10 px-6 max-w-7xl mx-auto">
      <h3 className="text-3xl text-center">Our Products</h3>
      <div className="flex justify-end items-center gap-5 my-5">
        <button
          onClick={() => navigate("/allProductsPage")}
          className="btn btn-outline btn-primary"
        >
          Show All Products
        </button>
      </div>
      <div className="my-10">
        {products.length === 0 ? (
          <h2 className="text-center my-20 text-2xl text-gray-500">
            No Products to Show...
          </h2>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 justify-evenly items-center gap-7">
            {products.map((product) => (
              <SingleProductCard
                key={product._id}
                product={product}
              ></SingleProductCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
