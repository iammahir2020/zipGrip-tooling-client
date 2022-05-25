import { useQuery } from "react-query";

const useProductsInformation = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery(["allProducts"], () =>
    fetch(`http://localhost:5000/product`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).then((res) => res.json())
  );
  return [products, isLoading, refetch];
};

export default useProductsInformation;
