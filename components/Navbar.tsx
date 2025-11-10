"use client";

import Link from "next/link";
import React, { useState } from "react";
import UserButton from "./UserButton";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const hidePages = ["/login", "/signup","/foret-password","/reset-password"];
  const hideNavbar = hidePages.includes(pathname);

  if (hideNavbar) return null;

  return (
    <nav className="fixed z-20 px-4 sm:px-6 md:px-8 border-b border-gray-200 top-0 left-0 right-0 backdrop-blur-md shadow-sm mx-auto ">
      <div className="container  flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link href="/" className="">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Sleeply
            </span>
          </Link>
        </div>
        <div className=" hidden md:flex items-center space-x-4">
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
          <UserButton />
        </div>
        <div className=" flex md:hidden space-x-4 items-center">
          <UserButton />
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu/>}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden fixed top-16 left-0 right-0 border-b border-gray-300 bg-white/40 backdrop-blur-lg shadow-lg transition-all duration-300">
            <nav className="flex flex-col text-right space-y-4 px-3 py-6 ">
              <Link
                onClick={() => setIsOpen(false)}
                href="/"
                className="text-gray-700 hover:text-purple-600 px-2 py-1 font-medium text-sm"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-purple-600 px-2 py-1 font-medium text-sm"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-purple-600 px-2 py-1 font-medium text-sm"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
