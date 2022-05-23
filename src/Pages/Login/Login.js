import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import {
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faKey,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import background from "../../images/background/bg.jpg";
import useToken from "../../Hooks/useToken";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [signInWithEmailAndPassword, user, loading, signInError] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, passwordResetError] =
    useSendPasswordResetEmail(auth);

  const [email, setEmail] = useState("");
  const [token] = useToken(user);

  let errorMessage;
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (signInError || passwordResetError) {
    errorMessage = (
      <p className="text-red-500">
        {signInError?.message}
        {passwordResetError?.message}
      </p>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  const handleForgotPassword = async () => {
    if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
      await sendPasswordResetEmail(email);
      toast.success("Reset password email sent");
    } else {
      toast.error("Please enter valid email address");
    }
  };

  return (
    <div
      style={{
        background: `url(${background})`,
        backgroundSize: "100%",
      }}
    >
      <div className="py-20 px-2">
        <div className="card lg:max-w-md border-t-4 shadow-2xl mx-auto bg-white">
          <div className="card-body">
            <h2 className="text-center text-2xl font-semibold mb-4">
              <span className="mr-2">Login</span>
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text font-medium">
                    <FontAwesomeIcon className="mr-2" icon={faEnvelope} />
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="someone@mail.com"
                  className="input input-bordered w-full max-w-md"
                  {...register("email", {
                    onBlur: (event) => setEmail(event.target.value),
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Please enter valid email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text font-medium">
                    <FontAwesomeIcon className="mr-2" icon={faKey} />
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="input input-bordered w-full max-w-md"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        "Password must contain minimum eight characters, at least one letter and one number",
                    },
                  })}
                />
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>
              <span onClick={handleForgotPassword} className="link link-hover">
                Forgot password?
              </span>
              {errorMessage}
              {loading || sending ? (
                <button className="btn bg-gradient-to-r from-secondary to-primary text-white w-full max-w-md loading mt-2">
                  loading
                </button>
              ) : (
                <input
                  className="btn bg-gradient-to-r from-secondary to-primary text-white w-full max-w-md mt-2"
                  type="submit"
                  value="Login"
                />
              )}
            </form>
            <p className="text-center">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="link link-hover text-primary"
              >
                Please Register
              </span>
            </p>
            <div className="divider">OR</div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
