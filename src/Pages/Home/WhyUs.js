import React from "react";
import heroImg from "../../images/logo/hero.png";

const WhyUs = () => {
  return (
    <div className="my-20 px-6 max-w-7xl mx-auto">
      <div className="hero my-20">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={heroImg} className="w-full max-w-xl" alt="heroImg" />
          <div>
            <h2 className="text-center lg:text-left text-xl lg:text-2xl">
              Order Reliable Products
            </h2>
            <h3 className="text-center lg:text-left text-2xl lg:text-3xl text-secondary font-bold">
              Why Choose Us?
            </h3>
            <p className="text-center lg:text-left py-6 text-xl capitalize">
              Zipgrip Tooling Is A Tool Manufacturing Brand That Supplies Tools
              For Every Home. Distributing High-End Tools To Help You Create
              Your Dream Project, Home, Or Application. We Are Your Partners,
              Confidants, And, Most Importantly, Guidance To Help You Complete
              Important Projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
