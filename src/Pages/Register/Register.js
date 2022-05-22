import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faKey,
  faEnvelope,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";
import background from "../../images/background/bg.jpg";
import useToken from "../../Hooks/useToken";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [createUserWithEmailAndPassword, user, loading, createError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
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

  if (createError || updateError) {
    errorMessage = (
      <p className="text-red-500">
        {createError?.message}
        {updateError?.message}
      </p>
    );
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };

  return (
    <div
      style={{
        background: `url(${background})`,
      }}
    >
      <div className="py-20 px-2">
        <div
          data-aos="zoom-in lg:fade-up"
          data-aos-duration="1000"
          className="card lg:max-w-md border-t-4 shadow-xl mx-auto bg-white"
        >
          <div className="card-body">
            <h2 className="text-center text-2xl font-semibold mb-4">
              <span className="mr-2">Register</span>
              <FontAwesomeIcon icon={faClipboardList} />
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text font-medium">
                    <FontAwesomeIcon className="mr-2" icon={faFileSignature} />
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full max-w-md"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
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
              {errorMessage}
              {loading || updating ? (
                <button className="btn bg-gradient-to-r from-secondary to-primary text-white w-full max-w-md loading">
                  loading
                </button>
              ) : (
                <input
                  className="btn bg-gradient-to-r from-secondary to-primary text-white w-full max-w-md"
                  type="submit"
                  value="Register"
                />
              )}
            </form>
            <p className="text-center">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="link link-hover text-primary"
              >
                Please Login
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

export default Register;
