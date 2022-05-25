import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import logo from "../../../images/logo/zipgripLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loading></Loading>;
  }

  const handleSignOut = () => {
    signOut(auth);
    navigate("/");
  };

  const navBarLinks = (
    <>
      <li className="lg:mr-3">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="lg:mr-3">
        <NavLink to="/allProductsPage">All_Products</NavLink>
      </li>
      <li className="lg:mr-3">
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
      <li className="lg:mr-3">
        <NavLink to="/portfolio">Portfolio</NavLink>
      </li>
      {user ? (
        <>
          <li className="lg:mr-3">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>

          <li tabIndex="0" className="w-52 lg:w-72 justify-end">
            <a className="justify-between font-semibold">
              {user?.displayName}
              <FontAwesomeIcon className="hidden lg:block" icon={faAngleDown} />
              <FontAwesomeIcon
                className="block lg:hidden"
                icon={faAngleRight}
              />
            </a>
            <ul className="p-2 w-30">
              <li>
                <button
                  onClick={handleSignOut}
                  className="btn btn-primary w-full text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </>
      ) : (
        <li className="lg:mr-3">
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-60"
          >
            {navBarLinks}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          <p className="flex justify-center items-center">
            <img className="w-[50px]" src={logo} alt="" />
            <span>
              <span className="text-lg md:text-3xl mr-1">ZipGrip</span>
              <span className="text-lg md:text-3xl">Tooling</span>
            </span>
          </p>
        </NavLink>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{navBarLinks}</ul>
      </div>
    </div>
  );
};

export default Navbar;
