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
      <footer className="footer p-10 max-w-7xl mx-auto text-white">
        <div className="bg-accent text-base-content p-4 rounded-xl flex flex-col justify-center items-center">
          <img className="lg:w-44" src={logo} alt="" />
          <p>
            ZipGrip Tooling.
            <br />
            Providing tools that you can trust
          </p>
        </div>
        <div>
          <span className="footer-title">Social Links</span>
          <NavLink to="https://www.instagram.com/" target="blank">
            <FontAwesomeIcon icon={faInstagram} />{" "}
            <span className="ml-2">Instagram</span>
          </NavLink>
          <NavLink to="https://www.facebook.com/" target="blank">
            <FontAwesomeIcon icon={faFacebookSquare} />{" "}
            <span className="ml-2">Facebook</span>
          </NavLink>
          <NavLink to="https://www.pinterest.com/" target="blank">
            <FontAwesomeIcon icon={faPinterest} />{" "}
            <span className="ml-2">Pinterest</span>
          </NavLink>
          <NavLink to="https://www.youtube.com/" target="blank">
            <FontAwesomeIcon icon={faYoutube} />{" "}
            <span className="ml-2">Youtube</span>
          </NavLink>
        </div>
        <div>
          <span className="footer-title">Quick Links</span>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
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
      <footer className="footer p-10 max-w-7xl mx-auto text-white">
        <div>
          <span className="footer-title">
            <FontAwesomeIcon icon={faLocationPin} /> <span> Address</span>
          </span>
          <p>2138 Dane Street, Spokane WA, Washington, 99201.</p>
        </div>
        <div>
          <span className="footer-title">
            <FontAwesomeIcon icon={faPhone} /> <span> Contact</span>
          </span>
          <p>+509-267-1042</p>
          <p>+813-125-9855</p>
        </div>
        <div>
          <span className="footer-title">
            <FontAwesomeIcon icon={faAt} /> <span> Email</span>
          </span>
          <p>info@zipgriptooling.com</p>
          <p>career@zipgriptooling.com</p>
        </div>
      </footer>
      <footer className="footer footer-center p-4 bg-accent text-base-content">
        <div>
          <p>All Rights Reserved &copy; {year} zipgrip tooling</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
