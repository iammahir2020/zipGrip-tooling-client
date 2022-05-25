import React from "react";
import Footer from "../Shared/Footer/Footer";
import AllProducts from "./AllProducts";
import AllReviews from "./AllReviews";
import Banner from "./Banner";
import Summary from "./Summary";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AllProducts></AllProducts>
      <Summary></Summary>
      <AllReviews></AllReviews>
      <Footer></Footer>
    </div>
  );
};

export default Home;
