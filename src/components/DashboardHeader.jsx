/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useContext } from "react";
import avatar1 from "../assets/avatar1.webp";
import avatar2 from "../assets/avatar2.webp";
import avatar3 from "../assets/avatar3.webp";
import avatar4 from "../assets/avatar4.webp";
import avatar5 from "../assets/avatar5.webp";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

//MUI

const DashboardHeader = ({ handleside, side }) => {
  const { islogin, userdetail } = useContext(UserContext);
  let avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
  const closeNavbar = () => {
    document.getElementById("hamburger").checked = false;
  };
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleImageClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleclick = () => {
    closeNavbar();
    handleImageClick();
  };

  const errornotify = (msg) => toast.error(msg);
  const successnotify = (msg) => toast.success(msg);

  const logoutuser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/users/logout`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      successnotify(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      errornotify("Something went wrong!!");
      console.error(error.response.data.message);
    }
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <>
      <header className="header top-0 left-0 w-full ">
        <nav className="w-full z-20  border-b shadow-md border-gray-200 ">
          <div className="flex flex-row justify-between lg:px-10 items-center flex-wrap p-3  w-full  ">
            <div className=" flex  justify-between items-center gap-6">
              <div
                className="flex items-center justify-center lg:hidden h-8  w-8"
                id=""
              >
                <input
                  type="checkbox"
                  name="hamburger"
                  id="hamburger"
                  className="peer"
                  onClick={handleside}
                  hidden
                />
                <label
                  htmlFor="hamburger"
                  className={`${
                    side && "peer-checked:hamburger "
                  }block relative z-20 p-3 cursor-pointer lg:hidden`}
                >
                  <div
                    aria-hidden="true"
                    className="m-auto h-0.5 w-6 rounded bg-sky-900 transition duration-300"
                  ></div>
                  <div
                    aria-hidden="true"
                    className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 transition duration-300"
                  ></div>
                </label>
              </div>

              <NavLink to="/" className="flex items-center ">
                <span className="self-center md:text-2xl  font-semibold">
                  MockMasters.
                </span>
              </NavLink>
            </div>

            <div className=" lg:flex flex-col justify-center items-center lg:flex-row text-lg lg:text-base lg:gap-4 ">
              {islogin ? (
                <div className="lg:flex flex-col justify-center items-center lg:flex-row text-lg lg:text-base lg:gap-4 ">
                  {islogin ? (
                    <div
                      className="relative inline-block group"
                      ref={dropdownRef}
                    >
                      <div className="flex font-semibold text-lg items-center gap-2">
                        <h1 className=" lg:block hidden">
                          Hi, {userdetail.username}
                        </h1>
                        <img
                          src={avatars[userdetail.avatar - 1]}
                          alt="Avatar"
                          onClick={handleImageClick}
                          className={`cursor-pointer  rounded-full shadow-lg  border-4 border-white transition-transform transform-gpu md:w-11 md:h-11 h-10 w-fit 
                          focus:outline-none`}
                        />
                      </div>
                      {isDropdownVisible && (
                        <div className="absolute  mt-1 right-0 bg-white py-1  rounded-xl shadow-lg z-20 w-fit px-2 ">
                          <NavLink to="/Dashboard/profile">
                            <button
                              type="button"
                              onClick={() => {
                                setIsDropdownVisible(!isDropdownVisible);
                                handleside();
                              }}
                              className=" flex items-center gap-3 hover:rounded-lg font-medium px-2 py-2 text-[15px] text-gray-900 hover:bg-gray-100 w-full text-left"
                            >
                              <svg
                                className="w-[27px] h-[27px] text-gray-800"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#0000"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.1"
                                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                              My Profile
                            </button>
                          </NavLink>
                          <NavLink to="/Dashboard/test-series">
                            <button
                              type="button"
                              onClick={() => {
                                setIsDropdownVisible(!isDropdownVisible);
                                handleside();
                              }}
                              className=" flex items-center gap-3 hover:rounded-lg font-medium px-2 py-2 text-[15px] text-gray-900 hover:bg-gray-100 w-full text-left"
                            >
                              <svg
                                className="w-[27px] h-[27px] text-gray-800 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#0000"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.1"
                                  d="M9.1 4H5c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm-10 10H5c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Z"
                                />
                              </svg>
                              Dashboard
                            </button>
                          </NavLink>

                          <button
                            type="button"
                            // onClick={handleLogoutClick}
                            onClick={logoutuser}
                            className="flex items-center gap-3 hover:rounded-lg font-medium px-2 py-2 text-[15px] text-gray-900 hover:bg-gray-100 w-full text-left"
                          >
                            <svg
                              className="w-[27px] h-[27px] text-gray-800"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#0000"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.1"
                                d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                              />
                            </svg>
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="lg:font-medium font-semibold hover:rounded-lg bg-slate-200 px-4 py-2
                    hover:bg-opacity-50 rounded-lg text-base text-center shadow-md "
                      >
                        <NavLink to="/Login">Login</NavLink>
                      </button>
                      <button
                        type="button"
                        className="text-white bg-gray-800 hover:bg-opacity-90 md:font-medium rounded-lg md:text-base px-3 py-2 text-center  "
                      >
                        <NavLink to="/Signup">Sign up</NavLink>
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="lg:font-medium font-semibold bg-slate-200 px-4 py-2
                hover:bg-opacity-50 rounded-lg text-base text-center shadow-md "
                  >
                    <NavLink to="/Login">Login</NavLink>
                  </button>
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-opacity-90 md:font-medium rounded-lg md:text-base px-3 py-2 text-center  "
                  >
                    <NavLink to="/Signup">Sign up</NavLink>
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default DashboardHeader;
