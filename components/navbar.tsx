import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo-white.png";
import profileDefault from "@/assets/images/profile.png";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-b from-black via-gray-800 to-gray-950">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/*           <!-- Mobile menu button-->
             */}{" "}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 linkhover linkactive focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="rgb(220,220,230)"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.75h17.5M3.75 12h17.5m-17.5 6.25h17.5"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/*           <!-- Logo -->
             */}{" "}
            <a className="flex flex-shrink-0 items-center rounded-full" href="/index.html">
              <Image
                className="h-10 w-auto lg:mr-4"
                src={logo}
                alt="Isfahan Traditional Rentals"
              />

              <span
                style={{ textShadow: "0px 0px 80px rgba(255, 255, 255)"}}
                className="hidden md:block leading-7 font-Title2 bg-gradient-to-b from-gray-400 via-teal-100 to-gray-800 bg-clip-text text-transparent font-bold text-[23px] ml-2 lg:-mr-5 md:mr-2"
              >
                Isfahan <span className="font-Title bg-gradient-to-b from-amber-100 via-amber-300 to-amber-100 bg-clip-text text-transparent tracking-wide font-light shadow-lg shadow-black rounded-md">&nbsp;<span className="font-bold text-2xl">T</span>raditional&nbsp;</span> Rentals</span>
            </a>
            {/*           <!-- Desktop Menu Hidden below md screens -->
             */}{" "}
            <div className="hidden lg:ml-6 md:flex md:items-center md:flex-1">
              <div className="lg:flex-row md:flex md:flex-[0.3_1.6_80%] md:flex-col lg:mx-2 ml-2 -mr-18 lg:space-x-2">
                <div className="lg:flex lg:justify-center lg:items-center lg:w-1/3 xl:ml-8 text-center lg:outline-none outline-1 outline-[rgba(200,200,255,0.2)] linkactive linkhover rounded-md">
                  <a
                    href="/index.html"
                    style={{ textShadow: "2px 2px 4px rgba(255, 255, 0, 0.2)" }}
                    className="text-gray-200 lg:h-auto lg:w-full md:h-6 hover:text-gray-200 rounded-md md:flex md:items-center justify-center px-3 py-2"
                  >
                    Home
                  </a>
                </div>
                <div className="lg:flex lg:items-center lg:justify-center text-center lg:outline-none outline-1 outline-[rgba(200,200,255,0.2)] 
                 linkhover linkactive rounded-md lg:w-1/3">
                  <a
                    href="/properties.html"
                    style={{ textShadow: "2px 2px 4px rgba(255, 255, 0, 0.2)" }}
                    className="text-gray-200 lg:h-auto lg:w-full md:h-6  hover:text-gray-200 rounded-md md:flex md:items-center justify-center px-3 py-2"
                  >
                    Properties
                  </a>
                </div>
                <div className="lg:flex lg:items-center lg:justify-center lg:w-1/3 text-center lg:outline-none outline-1 outline-[rgba(200,200,255,0.2)] linkactive linkhover rounded-md">
                  <a
                    href="/add-property.html"
                    style={{ textShadow: "2px 2px 4px rgba(255, 255, 0, 0.2)" }}
                    className="text-gray-200 lg:h-auto lg:w-full md:h-6  hover:text-gray-200 rounded-md md:flex md:items-center justify-center px-3 py-2"
                  >
                    Add Property
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/*         <!-- Right Side Menu (Logged Out) -->
           */}{" "}
          <div className="hidden md:flex md:ml-3 lg:mr-auto -mr-5">
            <div className="flex items-center">
              <button className="flex items-center cursor-pointer md:tracking-tight lg:tracking-normal text-sm text-gray-200 bg-gradient-to-b from-green-700 via-amber-900 to-green-700 linkhover linkactive hover:text-gray-200 rounded-md px-3 py-2 lg:-ml-10">
                <i className="fa-brands fa-google text-gray-200"></i>
                <span>Login / Register</span>
              </button>
            </div>
          </div>
          {/*         <!-- Right Side Menu (Logged In) -->
           */}{" "}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
            <a href="messages.html" className="relative group">
              <button
                type="button"
                className="relative rounded-full cursor-pointer bg-gradient-to-b from-green-700 via-amber-900 to-green-700 p-1 text-gray-200 linkactive linkhover focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-200 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                2
                {/*               <!-- Replace with the actual number of notifications -->
                 */}{" "}
              </span>
            </a>
            {/*           <!-- Profile dropdown button -->
             */}{" "}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={profileDefault}
                    alt=""
                  />
                </button>
              </div>
              {/*             <!-- Profile dropdown -->
               */}{" "}
              <div
                id="user-menu"
                className="hidden absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-gradient-to-b from-black via-gray-950 to-teal-950 py-1 shadow-[-3px_3px_20px_rgb(0,0,0,0.2)] shadow-teal-800 ring-1 ring-teal-950 ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex={-1}
              >
                <a
                  href="/profile.html"
                  className="block linkactive linkhover px-4 py-2 text-sm cursor-pointer text-gray-300"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-0"
                >
                  Your Profile
                </a>
                <a
                  href="/saved-properties.html"
                  className="block linkactive linkhover px-4 py-2 text-sm cursor-pointer text-gray-300"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-1"
                >
                  Saved Properties
                </a>
                <button
                  className="block linkactive linkhover w-full text-left px-4 py-2 text-sm cursor-pointer text-gray-300"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-2"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*     <!-- Mobile menu, show/hide based on menu state. -->
       */}{" "}
      <div className="hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-1">
          <a
            href="/index.html"
            className="text-gray-200 block linkactive linkhover leading-7 rounded-md px-3 py-2 text-center font-medium"
          >
            Home
          </a>
          <a
            href="/properties.html"
            className="text-gray-200 block linkactive linkhover leading-7 rounded-md px-3 py-2 text-center font-medium"
          >
            Properties
          </a>
          <a
            href="/add-property.html"
            className="text-gray-200 block linkactive linkhover leading-7 rounded-md px-3 py-2 text-center font-medium"
          >
            Add Property
          </a>
          <button className="flex items-center w-full justify-center cursor-pointer tracking-wider leading-7 font-semibold linkactive linkhover text-gray-200 bg-gradient-to-b from-amber-500 via-amber-900 to-amber-600 hover:text-gray-200 rounded-md px-3 py-2 mt-5 mb-3">
            <i className="fa-brands fa-google mr-2"></i>
            <span>Login or Register</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
