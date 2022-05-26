import React from "react";
import Footer from "../Shared/Footer/Footer";
import AllProducts from "./AllProducts";
import AllReviews from "./AllReviews";
import Banner from "./Banner";
import OurPartners from "./OurPartners";
import Summary from "./Summary";
import WhyUs from "./WhyUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AllProducts></AllProducts>
      <WhyUs></WhyUs>
      <Summary></Summary>
      <AllReviews></AllReviews>
      <OurPartners></OurPartners>
      <Footer></Footer>
    </div>
  );
};

export default Home;
