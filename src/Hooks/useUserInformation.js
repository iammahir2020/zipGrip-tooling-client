import { useQuery } from "react-query";

const useUserInformation = (user) => {
  const {
    data: profileUser,
    isLoading: isLoadingUser,
    refetch,
  } = useQuery(["user", user.email], () =>
    fetch(`${process.env.REACT_APP_LIVE_SERVER_URL}/profile/${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).then((res) => res.json())
  );
  return [profileUser, isLoadingUser, refetch];
};

export default useUserInformation;
