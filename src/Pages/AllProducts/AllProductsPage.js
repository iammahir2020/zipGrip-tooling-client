import React from "react";
import { useQuery } from "react-query";
import useProductsInformation from "../../Hooks/useProductsInformation";
import SingleProductCard from "../Home/SingleProductCard";
import Footer from "../Shared/Footer/Footer";
import Loading from "../Shared/Loading/Loading";

const AllProductsPage = () => {
  const [products, isLoading, refetch] = useProductsInformation();

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="my-10 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl text-secondary font-bold">All Products</h2>
        <h3 className="text-3xl">Get what your're looking for</h3>
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
      <Footer></Footer>
    </div>
  );
};

export default AllProductsPage;
