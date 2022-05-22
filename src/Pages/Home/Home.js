import React from "react";
import Footer from "../Shared/Footer/Footer";
import AllReviews from "./AllReviews";
import Banner from "./Banner";
import Summary from "./Summary";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Summary></Summary>
      <AllReviews></AllReviews>
      <Footer></Footer>
    </div>
  );
};

export default Home;
