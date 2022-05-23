import React from "react";
import bg from "../../images/background/banner_bg1.jpg";

const Banner = () => {
  return (
    <div
      style={{
        background: `url(${bg})`,
        backgroundSize: "100%",
      }}
      className="hero min-h-[500px]"
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-md">
          <h1 className=" text-2xl font-semibold">Welcome to</h1>
          <h1 className="mb-5 text-5xl font-bold">ZipGrip Tooling</h1>
          <p className="mb-5">
            At ZipGrip Tooling, we strive to provide tools that you can rely on
            and keep as a partner for many years. Our products have all been ISO
            certified and tested to military standards.
          </p>
          <button className="btn btn-primary w-52 text-white">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
