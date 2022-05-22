import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  AOS.init();
  return (
    <div
      style={{
        background: `url(https://previews.123rf.com/images/serezniy/serezniy1811/serezniy181146130/112715442-different-electrical-tools-on-grey-background.jpg?fj=1)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      class="hero min-h-[500px]"
      // class="hero min-h-screen"
    >
      <div class="hero-overlay bg-opacity-80"></div>
      <div class="hero-content text-center text-white">
        <div data-aos="fade-up" data-aos-duration="1000" class="max-w-md">
          <h1 class=" text-2xl font-semibold">Welcome to</h1>
          <h1 class="mb-5 text-5xl font-bold">ZipGrip Tooling</h1>
          <p class="mb-5">
            At ZipGrip tooling we are striving at building tools that you can
            rely on and keep as you partner for years. Our products are all ISO
            Certified and Military Grade tested
          </p>
          <button class="btn btn-primary w-52 text-white">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
