import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, ArrowLeft, ChevronDown } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/contacts";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        {!isHome ? (
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} className="text-white" />
          </Link>
        ) : null}

        <div className="flex items-center">
          <Users size={28} className="mr-2" />
          <h1 className="text-xl font-bold">BuddyShare</h1>
        </div>

        <div className="ml-auto">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              <span className="text-sm font-medium">My Account</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/"
                  className={`block px-4 py-2 text-sm ${
                    location.pathname === "/"
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Events
                </Link>
                <Link
                  to="/contacts"
                  className={`block px-4 py-2 text-sm ${
                    location.pathname === "/contacts"
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacts
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isHome && (
        <div className="bg-green-800 py-2">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <nav className="flex space-x-1 text-sm font-medium">
                <Link
                  to="/"
                  className={`px-3 py-1 rounded-md ${
                    location.pathname === "/"
                      ? "bg-white text-green-900"
                      : "text-green-100 hover:bg-green-700"
                  }`}
                >
                  Events
                </Link>
                <Link
                  to={
                    location.pathname.includes("/tickets/")
                      ? location.pathname
                      : "#"
                  }
                  className={`px-3 py-1 rounded-md ${
                    location.pathname.includes("/tickets/")
                      ? "bg-white text-green-900"
                      : "text-green-100 hover:bg-green-700"
                  }`}
                >
                  Tickets
                </Link>
                <Link
                  to={
                    location.pathname.includes("/assign/")
                      ? location.pathname
                      : "#"
                  }
                  className={`px-3 py-1 rounded-md ${
                    location.pathname.includes("/assign/")
                      ? "bg-white text-green-900"
                      : "text-green-100 hover:bg-green-700"
                  }`}
                >
                  Assign
                </Link>
                <Link
                  to={
                    location.pathname.includes("/preview/")
                      ? location.pathname
                      : "#"
                  }
                  className={`px-3 py-1 rounded-md ${
                    location.pathname.includes("/preview/")
                      ? "bg-white text-green-900"
                      : "text-green-100 hover:bg-green-700"
                  }`}
                >
                  Share
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
