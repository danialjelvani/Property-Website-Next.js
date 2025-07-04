"use client";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/images/logo-white.png";
import profileDefault from "@/assets/images/profile.png";
import { FaGoogle } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import UnreadMessageCount from "./unreadMessageCount";
import { myFont } from "./fonts";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false); // to check if component is mounted and prevent SSR mismatch
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  if (!isMounted) return null;

  return (
    <nav className="sticky z-1000 inset-0 bg-gradient-to-b from-emerald-900/88 via-[#1D1C15]/90 to-[#1D1C15]/85">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute left-0 flex items-center md:hidden">
            {/*           <!-- Mobile menu button-->
             */}{" "}
            <button
              type="button"
              id="mobile-dropdown-button"
              className={`relative inline-flex cursor-pointer items-center justify-center rounded-md p-2 linkhover linkactive linkactive2 focus:outline-none  ${
                !isMobileMenuOpen
                  ? "focus:ring-0"
                  : "focus:ring-2 focus:ring-inset focus:ring-white"
              }`}
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
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
            <Link
              className="flex flex-shrink-0 items-center rounded-full"
              href="/"
            >
              <Image
                className="h-10 w-auto lg:mr-4"
                src={logo}
                alt="Isfahan Rentals"
              />

              <span
                className={`hidden md:block leading-7 ${myFont.className} text-shadow-[0px_0px_80px_rgba(100,255,100)] bg-gradient-to-b from-gray-300 via-teal-200 to-gray-400 bg-clip-text text-transparent text-3xl ml-3 lg:-mr-5 md:mr-2`}
              >
                Isfahan Rentals
              </span>
            </Link>
            {/*           <!-- Desktop Menu Hidden below md screens -->
             */}{" "}
            <div className="hidden lg:ml-6 md:flex md:items-center md:flex-1">
              <div className="lg:flex-row md:flex md:flex-[0.3_1.6_80%] md:flex-col lg:mx-2 ml-2 -mr-18 lg:space-x-2">
                <div
                  className={`lg:flex lg:justify-center lg:items-center lg:w-1/3 xl:ml-8 text-center lg:outline-none outline-1 outline-[rgba(200,200,255,0.1)] linkactive linkhover linkactive2 rounded-md ${
                    pathname === "/" ? "linkanimation" : ""
                  }`}
                >
                  <Link
                    href="/"
                    style={{ textShadow: "2px 2px 4px rgba(255, 255, 0, 0.2)" }}
                    className={`text-gray-200 lg:h-auto lg:w-full ${
                      session ? "md:h-6" : "md:h-9"
                    } hover:text-gray-200 rounded-md md:flex md:items-center justify-center px-3 py-2`}
                  >
                    Home
                  </Link>
                </div>
                <div
                  className={`lg:flex lg:items-center lg:justify-center text-center lg:outline-none outline-1 outline-[rgba(200,200,255,0.1)] 
                 linkhover linkactive linkactive2 rounded-md lg:w-1/3 ${
                   pathname === "/properties" ? "linkanimation" : ""
                 }`}
                >
                  <Link
                    href="/properties"
                    style={{ textShadow: "2px 2px 4px rgba(255, 255, 0, 0.2)" }}
                    className={`text-gray-200 lg:h-auto lg:w-full ${
                      session ? "md:h-6" : "md:h-9"
                    } hover:text-gray-200 rounded-md md:flex md:items-center justify-center px-3 py-2`}
                  >
                    Properties
                  </Link>
                </div>
                {session && (
                  <div
                    className={`lg:flex lg:items-center lg:justify-center lg:w-1/3 text-center lg:outline-none outline-1 outline-[rgba(200,200,255,0.1)] linkactive linkhover linkactive2 rounded-md ${
                      pathname === "/properties/add" ? "linkanimation" : ""
                    }`}
                  >
                    <Link
                      href="/properties/add"
                      style={{
                        textShadow: "2px 2px 4px rgba(255, 255, 0, 0.2)",
                      }}
                      className="text-gray-200 lg:h-auto lg:w-full md:h-6 md:-mx-2.5 hover:text-gray-200 rounded-md md:flex md:items-center justify-center px-3 py-2"
                    >
                      Add Property
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/*         <!-- Right Side Menu (Logged Out) -->
           */}{" "}
          {!session && (
            <div className="hidden md:flex md:ml-3 lg:mr-auto -mr-5">
              <div className="flex items-center">
                <Link
                  href="/login"
                  className="flex items-center cursor-pointer tracking-tight lg:tracking-normal text-sm text-gray-200 bg-gradient-to-b from-orange-400 via-amber-700 to-orange-400 shadow-[0_0_20px] shadow-neutral-800 linkhover linkactive linkactive2 hover:text-gray-200 rounded-md px-3 py-2 lg:mr-4 mr-2"
                >
                  <FaGoogle className="mr-2" />
                  <span>Login / Register</span>
                </Link>
              </div>
            </div>
          )}
          {/*         <!-- Right Side Menu (Logged In) -->
           */}{" "}
          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <Link href="/messages" className="relative group">
                <button
                  type="button"
                  className="relative rounded-full cursor-pointer bg-gradient-to-b from-orange-400 via-amber-900 to-orange-400 shadow-[0_0_20px] shadow-neutral-800 p-1 text-gray-200 linkactive linkactive2 linkhover"
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

                <UnreadMessageCount session={session} />
              </Link>
              {/*           <!-- Profile dropdown button -->
               */}{" "}
              <div className="relative ml-3">
                <div
                  className={`${
                    isProfileMenuOpen ? "block" : "hidden"
                  } fixed inset-0 z-50 bg-black/20 `}
                  onClick={() => setIsProfileMenuOpen(false)}
                ></div>
                <button
                  type="button"
                  className={`relative flex z-60 rounded-full cursor-pointer shadow-[0_0_20px] shadow-neutral-800 hover:scale-105 bg-orange-500 text-sm focus:outline-none ${
                    isProfileMenuOpen
                      ? "focus:ring-white focus:ring-2"
                      : "ring-1 ring-gray-200"
                  }`}
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={profileDefault}
                    alt=""
                  />
                  <span className="mx-1 p-1 text-sm text-white">
                    {session.user?.name?.slice(0, 5)}
                  </span>
                </button>
                {/*             <!-- Profile dropdown -->
                 */}{" "}
                <div
                  id="user-menu"
                  className={`${
                    isProfileMenuOpen ? "block" : "hidden"
                  } py-2 mt-6 z-70 flex text-center fixed left-0 w-full flex-col md:flex-none md:absolute md:left-auto md:right-0 md:w-60 md:origin-top-right space-y-2 rounded-b-lg md:rounded-lg
                    bg-gradient-to-b from-neutral-900/99 via-neutral-800/98 to-teal-950/97 shadow-[-3px_3px_20px_rgb(0,0,0,0.2)] md:shadow-[-3px_3px_20px_rgb(0,0,0,0.2)] shadow-teal-800 ring-1 ring-teal-950 ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <Link
                    href="/profile"
                    className="block linkactive linkactive2 linkhover px-4 py-2 text-sm cursor-pointer text-gray-300"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-0"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/properties/saved"
                    className="block linkactive linkactive2 linkhover px-4 py-2 text-sm cursor-pointer text-gray-300"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-1"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Saved Properties
                  </Link>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      signOut({ redirect: false });
                      router.push("/");
                    }}
                    className="block linkactive linkactive2 linkhover w-full px-4 py-2 text-sm cursor-pointer text-gray-300"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/*     <!-- Mobile menu, show/hide based on menu state. -->
       */}{" "}
      <div
        className={`${
          isMobileMenuOpen ? "fixed inset-0 z-40 bg-black/20" : "hidden"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={
            isMobileMenuOpen
              ? "absolute bg-gradient-to-b from-neutral-900/99 via-neutral-800/98 to-teal-950/97 shadow-[-3px_3px_20px_rgb(0,0,0,0.2)] md:shadow-[-3px_3px_20px_rgb(0,0,0,0.2)] shadow-teal-800 ring-1 rounded-b-md ring-teal-950 ring-opacity-5 py-1 border-teal-200 w-full top-20 z-50"
              : "hidden"
          }
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 text-sm">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-gray-200 block  linkactive linkactive2 linkhover leading-7 rounded-md px-3 py-2 text-center ${
                pathname === "/" ? "linkanimation" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-gray-200 block  linkactive linkactive2 linkhover leading-7 rounded-md px-3 py-2 text-center ${
                pathname === "/properties" ? "linkanimation" : ""
              }`}
            >
              Properties
            </Link>
            {session && (
              <Link
                href="/properties/add"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-gray-200 block  linkactive linkactive2 linkhover leading-7 rounded-md px-3 py-2 text-center ${
                  pathname === "/properties/add" ? "linkanimation" : ""
                }`}
              >
                Add Property
              </Link>
            )}
            {!session && (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center  w-full justify-center cursor-pointer tracking-wider leading-7 font-semibold linkactive linkactive2 linkhover text-gray-200 bg-gradient-to-b from-amber-500 via-amber-900 to-amber-600 hover:text-gray-200 rounded-md px-3 py-2 mt-5 mb-3"
              >
                <FaGoogle className="mr-2" />
                <span>Login or Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
