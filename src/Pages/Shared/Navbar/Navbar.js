import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import logo from "../../../images/logo/zipgripLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

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

          <div class="dropdown dropdown-end w-52">
            <label tabindex="0" class="btn btn-accent w-full">
              {user?.displayName}
            </label>
            <ul
              tabindex="0"
              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline btn-primary w-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
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
              <span className="text-xl md:text-3xl mr-1">ZipGrip</span>
              <span className="text-xl md:text-3xl">Tooling</span>
            </span>
          </p>
        </NavLink>
      </div>

      <div className="navbar-end">
        <label
          tabIndex="1"
          htmlFor="dashboard-sidebar"
          className="btn btn-ghost lg:hidden drawer-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </label>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{navBarLinks}</ul>
      </div>
    </div>
  );
};

export default Navbar;
