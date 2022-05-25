import { useQuery } from "react-query";

const useUserInformation = (user) => {
  const {
    data: profileUser,
    isLoading: isLoadingUser,
    refetch,
  } = useQuery(["user", user.email], () =>
    fetch(`https://zipgrip-tooling.herokuapp.com/profile/${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).then((res) => res.json())
  );
  return [profileUser, isLoadingUser, refetch];
};

export default useUserInformation;
