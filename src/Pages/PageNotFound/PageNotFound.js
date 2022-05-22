import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          background: `url(https://previews.123rf.com/images/serezniy/serezniy1811/serezniy181146130/112715442-different-electrical-tools-on-grey-background.jpg?fj=1)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="hero min-h-screen"
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral bg-white mx-4 lg:mx-0 lg:p-24 rounded-xl">
          <div className="max-w-md">
            <h1 className="mb-5 text-7xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary font-bold">
              404
            </h1>
            <p className="mb-5 text-lg lg:text-xl">
              Sorry the page you are looking for might have been removed, had
              its name changed or is temporarily unavailable. If you think
              something is broken, report a probelm.
            </p>
            <button
              onClick={() => navigate("/")}
              className="btn bg-gradient-to-r from-secondary to-primary w-52 text-white"
            >
              RETURN HOME
            </button>
            <button className="mt-3 lg:mt-0 lg:ml-3 btn btn-outline bg-white w-52 text-primary">
              REPORT PROBLEM
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PageNotFound;
