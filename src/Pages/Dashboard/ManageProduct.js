import React from "react";
import useProductsInformation from "../../Hooks/useProductsInformation";
import Loading from "../Shared/Loading/Loading";
import SingleProduct from "./SingleProduct";

const ManageProduct = () => {
  const [products, isLoading, refetch] = useProductsInformation();

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
              <th>
                Remove <br /> Product
              </th>
              <th>Added By</th>
              <th>
                Available <br /> Quantity
              </th>
              <th>
                Minimum <br /> Order Quantity
              </th>
              <th>
                Price
                <br /> Per Unit
              </th>
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
