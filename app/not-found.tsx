import React from "react";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section
      style={{ backgroundImage: "url('images/background.png')" }}
      className="bg-cover bg-center bg-fixed bg-no-repeat"
    >
      <div className="container m-auto max-w-2xl py-30">
        <div className="bg-black/50 px-2 py-10 flex flex-col shadow-md rounded-xl border m-6 md:m-0">
          <div className="flex justify-center">
            <FaExclamationTriangle className="text-6xl text-yellow-400"></FaExclamationTriangle>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-teal-200 tracking-wider mt-4 mb-2">Dear Visitor</h1>
            <p className="text-teal-500 md:text-lg text-md  mb-10">
              The page you are looking for does not exist.
            </p>
            <Link
              href="/"
              className="linkbuttonamber text-white font-bold py-4 px-6 rounded-md"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
