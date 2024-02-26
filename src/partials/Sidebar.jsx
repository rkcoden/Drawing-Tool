import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";
import logo from "../images/logo.png";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      ></div>


      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <div className="inline-flex justify-center items-center">
              <img src={logo} alt="Logo" />
              <span className="text-field text-white mt-2">
                LEAK-PROOF® ENGINEERING
              </span>
            </div>
          </NavLink>
        </div>
        <div className="space-y-8">
          <div>
            <SidebarLinkGroup activecondition={pathname === "/"}>
              {() => {
                return (
                  <React.Fragment>
                    <a
                      href="/"
                      className={`block text-slate-200 truncate transition duration-150 ${pathname === "/"
                        ? "hover:text-slate-200"
                        : "hover:text-white"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <i className="fas fa-home text-lg"></i>
                          <span
                            className={`font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === "/" ? "font-bold underline" : ""
                              }`}
                          >
                            Home
                          </span>
                        </div>
                      </div>
                    </a>
                  </React.Fragment>
                );
              }}
            </SidebarLinkGroup>
          </div>

          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>

              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              <SidebarLinkGroup
                activecondition={pathname.includes("sales")}
              >
                {() => {
                  return (
                    <React.Fragment>
                      <a
                        href="/sales"
                        className={`block text-slate-200 truncate transition duration-150 ${pathname === "/" || pathname.includes("sales")
                          ? "hover:text-slate-200"
                          : "hover:text-white"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <i className="fas fa-regular fa-dollar-sign text-lg"></i>
                            <span className="font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Sales
                            </span>
                          </div>
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activecondition={
                   pathname.includes("application")
                }
              >
                {() => {
                  return (
                    <React.Fragment>
                      <a
                        href="/application"
                        className={`block text-slate-200 truncate transition duration-150 ${pathname.includes("application")
                          ? "hover:text-slate-200"
                          : "hover:text-white"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <i className="fas fa-regular fa-laptop text-lg"></i>
                            <span className="font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Application
                            </span>
                          </div>
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup activecondition={pathname.includes("/drf/standard")}>
      {() => {
        // Automatically open the "Design" and "D.R.F" sections if the pathname matches "/drf/standard"
        const [designOpen, setDesignOpen] = useState(pathname.includes("/drf/standard"));
        const [drfOpen, setDrfOpen] = useState(pathname.includes("/drf/standard"));

        // Ensure that "Design" and "D.R.F" state is updated when pathname changes
        useEffect(() => {
          setDesignOpen(pathname.includes("/drf/standard"));
          setDrfOpen(pathname.includes("/drf/standard"));
        }, [pathname]);

        const handleDesignClick = () => {
          setDesignOpen(!designOpen);
          // Optionally close "D.R.F" when "Design" is closed
          if (!designOpen) {
            setDrfOpen(false);
          }
        };

        const handleDrfClick = (e) => {
          e.preventDefault();
          // Only toggle "D.R.F" if "Design" is open
          if (designOpen) {
            setDrfOpen(!drfOpen);
          }
        };

        return (
          <React.Fragment>
            <a
              href="#0" // Use '#' or 'javascript:void(0)' is discouraged
              className={`text-slate-200 truncate transition duration-150 ${pathname.includes("/drf/standard")
                ? "hover:text-slate-200"
                : "hover:text-white"
                }`}
              onClick={handleDesignClick}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-pen-ruler"></i>
                  <span className="font-medium ml-3">Design</span>
                </div>
                <div className="flex shrink-0 ml-2">
                  <i
                    className={`fas ${designOpen ? "fa-chevron-up" : "fa-chevron-down"
                      } align-text-bottom float-right`}
                  ></i>
                </div>
              </div>
            </a>
            <div
              className={`lg:hidden lg:sidebar-expanded:block 2xl:block ${!designOpen && "hidden"
                }`}
            >
              <ul className={`pl-9 mt-1`}>
                <li className="mb-1 last:mb-0">
                  <a
                    href="#0" // Again, using '#' for consistency and accessibility
                    onClick={handleDrfClick}
                    className={`${!designOpen && "hidden"
                      } text-slate-400 hover:text-slate-200 transition duration-150 truncate `}
                  >
                    <i className="fas fa-list align-text-bottom"></i>{" "}
                    &nbsp; D.R.F
                    <i
                      className={`fas ${drfOpen ? "fa-chevron-up" : "fa-chevron-down"
                        } align-text-bottom float-right`}
                    ></i>
                  </a>
                  <ul className={`pl-4 ${!drfOpen && "hidden"}`}>
                    {[
                      "Standard",
                      "New",
                      "Edit",
                      "New Design",
                      "Checked",
                      "Approved",
                    ].map((item) => (
                      <li key={item} className="mb-1 last:mb-0">
                        <NavLink
                          to={`/drf/${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className={({ isActive }) => isActive ? "block text-slate-200 hover:text-slate-200 transition duration-150 truncate m-1 font-bold underline" : "block text-slate-400 hover:text-slate-200 transition duration-150 truncate m-1"}
                        >
                          <i className="fa-solid fa-circle-dot align-text-bottom"></i>
                          &nbsp;&nbsp;{item}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </React.Fragment>
        );
      }}
    </SidebarLinkGroup>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Account
              </span>
            </h3>
            <ul className="mt-3">
              {/* Authentication */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="javascript:void(0)"
                        className={`block text-slate-200 truncate transition duration-150 ${open
                          ? "hover:text-slate-200"
                          : "hover:text-white hover:text-decoration-line"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className="fill-current text-slate-600"
                                d="M8.07 16H10V8H8.07a8 8 0 110 8z"
                              />
                              <path
                                className="fill-current text-slate-400"
                                d="M15 12L8 6v5H0v2h8v5z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Profile
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && "rotate-180"
                                }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/signin"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Settings
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/signup"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Change Password
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/reset-password"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Logout
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
