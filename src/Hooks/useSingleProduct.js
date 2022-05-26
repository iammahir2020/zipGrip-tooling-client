import { useQuery } from "react-query";

const useSingleProduct = (id) => {
  const { data: product, isLoading } = useQuery(["singleProduct", id], () =>
    fetch(`https://zipgrip-tooling.herokuapp.com/product/singleProduct/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).then((res) => res.json())
  );

  return [product, isLoading];
};

export default useSingleProduct;
