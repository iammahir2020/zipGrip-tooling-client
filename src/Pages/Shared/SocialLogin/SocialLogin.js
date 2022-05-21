import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleGoogleSignin = () => {
    signInWithGoogle();
  };

  let errorMessage;
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      console.log(user);
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  if (error) {
    errorMessage = <p className="text-red-500">{error?.message}</p>;
  }

  return (
    <div>
      {loading ? (
        <button className="btn btn-outline text-white bg-gradient-to-r from-secondary to-primary w-full max-w-md mb-3 loading">
          loading
        </button>
      ) : (
        <button
          onClick={handleGoogleSignin}
          className="btn btn-outline btn-secondary w-full max-w-md mb-3 flex items-center justify-center gap-3"
        >
          <FontAwesomeIcon className="text-xl" icon={faGoogle} />{" "}
          <p>Continue With Google</p>
        </button>
      )}

      {errorMessage}
    </div>
  );
};

export default SocialLogin;
