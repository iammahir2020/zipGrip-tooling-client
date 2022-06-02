import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";

const useProductsInformation = () => {
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery(["allProducts"], () =>
    fetch(`https://zipgrip-tooling.herokuapp.com/product`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).then((res) => {
      if (res.status === 403 || res.status === 401) {
        signOut(auth);
        localStorage.removeItem("jwtToken");
        navigate("/login");
      }
      return res.json();
    })
  );
  return [products, isLoading, refetch];
};

export default useProductsInformation;
