"use client";


import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();
  const hidePages = ["/login", "/signup", "/foret-password", "/reset-password"];
  const hideNavbar = hidePages.includes(pathname);

  if (hideNavbar) return null;
  return (
    <footer className="border-t border-gray-200 shadow-sm mx-auto  ">
      <div className=" container px-4 sm:px-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent mb-1">
              Sleeply
            </span>
            <p className="text-gray-600 text-sm">
              Track your sleep, improve your health.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 px-2 py-1 font-medium text-sm"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-purple-600 px-2 py-1 font-medium text-sm"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-purple-600 px-2 py-1 font-medium text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-2">
          © {new Date().getFullYear()} Sleeply. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
