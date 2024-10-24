import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    const userData = { email: email };
    if (email) {
      fetch(`${process.env.REACT_APP_LIVE_SERVER_URL}/user/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          const jwtToken = data.token;
          localStorage.setItem("jwtToken", jwtToken);
          setToken(jwtToken);
        });
    }
  }, [user]);

  return [token];
};

export default useToken;
