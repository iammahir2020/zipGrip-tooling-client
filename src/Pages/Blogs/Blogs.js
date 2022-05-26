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
                It is critical to improve the performance of a website. Users
                may lose interest and quit if a website takes too long to load a
                page or graphics. Here are some tips for improving the
                performance of a React application. Whenever possible, keep
                component states local. This, however, can result in
                disorganized and difficult-to-understand code. It is useful for
                small-scale applications. Memory can be utilized to cache a
                component so that it can be re-rendered from cache memory if the
                props are not modified. Because not all images load at the same
                time, lazy loading images can increase application speed. Using
                dynamic import() to split code allows you to split a huge file
                into little chunks, which enhances the application's
                performance.
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
                There are several approaches to manage state in a React
                application. Local State: keep track of all components in a
                single file. To handle local states, useState() and usereducer()
                can be employed. Global State: data management across multiple
                components. To manage global state, utilize lifting state up or
                context api. ServerState: External server data that must be
                merged with our current UI state. It is a simple notion, yet it
                might be difficult to implement. To manage server state,
                useEffet () and useSWR() can be utilized. Url State: Information
                about a URL. This could be parameters or a query. The function
                useParams() can be utilized. With react router, useHistory() and
                useLocation() can be used.
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
                We should avoid setting the state directly because it causes a
                number of issues. Some examples are as follows:
                <ul>
                  <li>
                    # If we immediately alter it, executing setState()
                    thereafter may simply replace the update we did.
                  </li>
                  <li>
                    # When we directly update the state, it does not immediately
                    modify the value.Instead, it produces a pending state
                    transition, which can only be accessed after calling this
                    function.
                  </li>
                  <li>
                    # We will lose control of the state in all of the
                    components.
                  </li>
                </ul>
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
                <p className="mb-2">
                  We use Filter() fucntion on an array of objects to find an
                  array of objects based on any attribute of the objects
                </p>
                <div class="mockup-code">
                  <code className="ml-5">{`products.filter((product)=>{product.name=="apple"})`}</code>
                </div>
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
              <div>
                <p>
                  Unit testing is a sort of software testing that involves
                  testing individual units or bits of code. Its goal is to
                  ensure that each unit of code works as planned. A unit can be
                  a single line of code, a method, or an entire class. Our tests
                  can run quickly when we test extremely small components.
                </p>
                <p>
                  We should write unit tests since they save time, serve as
                  documentation for future developers working on the system,
                  make debugging easier, allow for code reuse, and so on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Blogs;
