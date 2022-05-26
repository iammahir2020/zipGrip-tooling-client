import React from "react";
import heroImg from "../../images/logo/hero.png";

const WhyUs = () => {
  return (
    <div className="my-20 px-6 max-w-7xl mx-auto">
      <div class="hero my-20">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <img src={heroImg} class="w-full max-w-xl" alt="heroImg" />
          <div>
            <h2 className="text-2xl ">Order Reliable Products</h2>
            <h3 className="text-3xl text-secondary font-bold">
              Why Choose Us?
            </h3>
            <p class="py-6 text-xl capitalize">
              Zipgrip Tooling Is A Tools Brand That Supplies Tools For Every
              Home. Distributing High-End Tools To Help You Create Your Dream
              Project, Home, Or Application. We Are Your Partners, Confidants,
              And, Most Importantly, Guidance To Help You Complete Important
              Projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
