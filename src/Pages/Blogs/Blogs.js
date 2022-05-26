import React from "react";
import Footer from "../Shared/Footer/Footer";

const Blogs = () => {
  return (
    <div>
      <div className="my-10 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl text-secondary font-bold">Blogs</h2>
        <h3 className="text-3xl">Did you know?</h3>
        <div>
          <div
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-6"
          >
            <div className="collapse-title text-xl font-medium">
              How will you improve the performance of a React Application?
            </div>
            <div className="collapse-content">
              <p>
                tabIndex="0" attribute is necessary to make the div focusable
              </p>
            </div>
          </div>
          <div
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-6"
          >
            <div className="collapse-title text-xl font-medium">
              What are the different ways to manage a state in a React
              application?
            </div>
            <div className="collapse-content">
              <p>
                tabIndex="0" attribute is necessary to make the div focusable
              </p>
            </div>
          </div>
          <div
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-6"
          >
            <div className="collapse-title text-xl font-medium">
              How does prototypical inheritance work?
            </div>
            <div className="collapse-content">
              <p>
                tabIndex="0" attribute is necessary to make the div focusable
              </p>
            </div>
          </div>
          <div
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-6"
          >
            <div className="collapse-title text-xl font-medium">
              Why you do not set the state directly in React. For example, if
              you have const [products, setProducts] = useState([]). Why you do
              not set products = [...] instead, you use the setProducts
            </div>
            <div className="collapse-content">
              <p>
                tabIndex="0" attribute is necessary to make the div focusable
              </p>
            </div>
          </div>
          <div
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-6"
          >
            <div className="collapse-title text-xl font-medium">
              You have an array of products. Each product has a name, price,
              description, etc. How will you implement a search to find products
              by name?
            </div>
            <div className="collapse-content">
              <p>
                tabIndex="0" attribute is necessary to make the div focusable
              </p>
            </div>
          </div>
          <div
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-6"
          >
            <div className="collapse-title text-xl font-medium">
              What is a unit test? Why should write unit tests?
            </div>
            <div className="collapse-content">
              <p>
                tabIndex="0" attribute is necessary to make the div focusable
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Blogs;
