import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  const { eventId } = useParams<{ eventId: string }>();
  const isHome =
    location.pathname === "/" || location.pathname.startsWith("/contacts");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const assignComplete = location.state?.fromAssignComplete || false;

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

        <div className="flex gap-2 items-center">
          <img
            src="https://pachtml-production.s3-us-west-2.amazonaws.com/www/luca-multi/branding/logo.png"
            className="w-8"
          />
          <h1 className="text-xl font-bold">Luca</h1>
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
                  Buddies
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
                  to={`/tickets/${eventId}`}
                  className={`px-3 py-1 rounded-md ${
                    location.pathname.includes("/tickets/")
                      ? "bg-white text-green-900"
                      : "text-green-100 hover:bg-green-700"
                  }`}
                >
                  Assign
                </Link>
                <Link
                  to={`/preview/${eventId}`}
                  className={`px-3 py-1 rounded-md ${
                    location.pathname.includes("/preview/")
                      ? "bg-white text-green-900"
                      : assignComplete
                      ? "text-green-100 hover:bg-green-700"
                      : "text-gray-400 cursor-not-allowed pointer-events-none"
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
