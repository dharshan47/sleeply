"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();
  const hidePages = ["/login", "/signup", "/forget-password", "/reset-password"];
  const hideNavbar = hidePages.includes(pathname);

  if (hideNavbar) return null;

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <footer aria-label="Footer" className="border-t border-gray-200 bg-white p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <Link href="/" aria-label="Sleeply Home">
              <span className="text-xl font-bold bg-linear-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent mb-1 block">
                Sleeply
              </span>
            </Link>
            <p className="text-gray-600 text-sm">
              Track your sleep, improve your health.
            </p>
          </div>
          <nav aria-label="Footer Navigation">
            <div className="flex flex-wrap justify-center space-x-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-purple-600 font-medium text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Sleeply. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
