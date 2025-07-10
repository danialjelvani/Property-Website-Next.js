import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-black/40 w-full py-4">
      <div className="flex items-center justify-center -mt-1">
        <FaGithub className="text-xl mr-2" />
        <Link
          className="ml-1 text-sm text-white/70 hover:text-white active:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/danialjelvani"
        >
          Connect with me on GitHub: <span className="underline">danialjelvani</span>
        </Link>
      </div>
    </footer>
  );
};

export default footer;
