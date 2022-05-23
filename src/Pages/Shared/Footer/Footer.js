import React from "react";
import logo from "../../../images/logo/zipgripLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookSquare,
  faPinterest,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faLocationPin,
  faArrowRightFromBracket,
  faAt,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const Footer = () => {
  const [user, loading, error] = useAuthState(auth);
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="bg-neutral">
      <footer className="footer px-6 py-10 max-w-7xl mx-auto text-white">
        <div className="bg-accent text-base-content p-4 rounded-xl flex flex-col justify-center items-center">
          <img className="lg:w-44" src={logo} alt="logo" />
          <p className="text-xl font-semibold">ZipGrip Tooling</p>
          <p>Providing tools that you can trust</p>
        </div>
        <div>
          <span className="footer-title">Quick Links</span>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
        </div>
        <div>
          <div>
            <span className="footer-title">
              <FontAwesomeIcon icon={faLocationPin} /> <span> Address</span>
            </span>
            <p>2138 Spokane WA, Washington, 99201.</p>
          </div>
          <div>
            <span className="footer-title">
              <FontAwesomeIcon icon={faPhone} /> <span> Contact</span>
            </span>
            <p>+509-267-1042</p>
          </div>
          <div>
            <span className="footer-title">
              <FontAwesomeIcon icon={faAt} /> <span> Email</span>
            </span>
            <p>info@zipgriptooling.com</p>
          </div>
        </div>
        <div>
          <span className="footer-title">Newsletter</span>
          <div className="form-control lg:w-80">
            <label className="label ">
              <span className="label-text text-white">
                Enter your email address
              </span>
            </label>
            <div>
              <input
                type="email"
                placeholder="username@site.com"
                className="input input-bordered w-full pr-16 text-neutral"
              />
              <button className="btn btn-primary mt-3">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-accent">
        <footer className="p-2 text-base-content">
          <div className="flex gap-5 justify-center">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
          <div>
            <p className="text-center mt-2">
              All Rights Reserved &copy; {year} zipgrip tooling
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
