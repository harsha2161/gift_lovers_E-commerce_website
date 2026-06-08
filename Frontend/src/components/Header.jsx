import axios from "axios";
import { useState, useEffect, useRef } from "react";

import { FaShoppingCart, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { IoLogIn, IoLogOut, IoSettings } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState("");

  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicking outside and scrolling for the profile dropdown
  useEffect(() => {
    const handleInteraction = (event) => {
      // If it's a scroll event, just close it. If it's a click, check if it's outside.
      if (event.type === 'scroll') {
        setIsProfileDropdownOpen(false);
      } else if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleInteraction);
      window.addEventListener("scroll", handleInteraction, { passive: true });
    } else {
      document.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    }

    return () => {
      document.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, [isProfileDropdownOpen]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser("");
    navigate("/");
  };

  return (
    <>
      <header className={`w-full z-[100] font-sans transition-all duration-300 sticky top-0 border-b border-transparent ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-gray-100 py-2 md:py-3" : "bg-white py-3 md:py-4"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsDrawerOpen(true)} className="text-gray-700 hover:text-emerald-600 transition-colors p-1">
              <GiHamburgerMenu className="text-2xl" />
            </button>
          </div>

        

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {[
              { name: 'Home', path: '/' },
              { name: 'Products', path: '/products' },
              { name: 'Contact Us', path: '/contacts' },
              { name: 'About', path:'/about'},
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-[15px] font-medium tracking-wide transition-colors py-2 group ${isActive(link.path) ? "text-emerald-600" : "text-gray-600 hover:text-emerald-600"}`}
              >
                {link.name}
                <span className={`absolute left-0 bottom-0 w-full h-[2px] bg-emerald-600 transition-transform duration-300 origin-left ${isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
              </Link>
            ))}
          </nav>

          {/* Right Icons Container*/}
          <div className="flex items-center gap-2 md:gap-3 bg-gray-50/80 p-1.5 rounded-full shadow-sm border border-gray-100 backdrop-blur-sm">

            {/* Cart Button */}
            <Link to="/cart" title="View Cart" className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 shadow-sm transition-all duration-300 group">
              <FaShoppingCart className="text-[17px] md:text-lg transition-transform duration-300 group-hover:scale-110" />
            </Link>

            <div className="w-[1px] h-5 md:h-6 bg-gray-200 mx-0.5 md:mx-1"></div>

            {/* Profile Actions */}
            {!token ? (
              <Link to="/login" className="flex items-center gap-2 bg-white text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 md:px-5 py-2 md:py-2 rounded-full transition-all duration-300 font-medium text-[13px] md:text-sm shadow-sm group">
                <IoLogIn className="text-lg md:text-xl transition-transform duration-300 group-hover:-translate-x-0.5" />
                <span>Login</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2 md:gap-3">
                {/* Profile Button with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border-2 border-white shadow-sm overflow-hidden hover:border-emerald-400 hover:shadow-md transition-all duration-300 cursor-pointer group"
                    title="Account Options"
                  >
                    {user && user.img ? (
                      <img src={user.img} alt="profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <FaUser className="text-[14px] md:text-[16px] transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 transform origin-top-right transition-all">
                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                          <p className="text-sm font-semibold text-gray-800 truncate">{user?.name || "User Account"}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                        </div>

                        <button
                          onClick={() => { setIsProfileDropdownOpen(false); navigate("/profile", { state: user }); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 flex items-center gap-3 transition-colors"
                        >
                          <FaUser className="text-gray-400 text-sm" />
                          Profile Page
                        </button>

                        <button
                          onClick={() => { setIsProfileDropdownOpen(false); navigate("/#"); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 flex items-center gap-3 transition-colors"
                        >
                          <IoSettings className="text-gray-400 text-base" />
                          Settings
                        </button>

                        <div className="border-t border-gray-50 my-1"></div>

                        <button
                          onClick={() => { setIsProfileDropdownOpen(false); handleLogout(); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-3 transition-colors"
                        >
                          <IoLogOut className="text-rose-400 text-base" />
                          Logout
                        </button>
                      </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MOBILE SIDE DRAWER ================= */}
      <div className={`fixed inset-0 z-[5000] flex md:hidden transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div onClick={() => setIsDrawerOpen(false)} className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"></div>

        <div className={`relative w-[280px] max-w-[80%] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>

          {/* Drawer Header */}
          <div className="w-full h-20 border-b border-gray-100 flex justify-between items-center px-6 bg-white/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <img src="logo.jpg" className="h-10 rounded-full shadow-sm" alt="Logo" />
              <span className="font-bold text-gray-800 text-lg">Gift Lovers</span>
            </div>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 -mr-2 bg-gray-50 text-gray-500 hover:text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors">
              <IoMdClose className="text-xl" />
            </button>
          </div>

          {/* Drawer Navigation */}
          <nav className="flex flex-col flex-1 py-6 px-4 gap-2 overflow-y-auto">
            {[
              { name: 'Home', path: '/' },
              { name: 'Products', path: '/products' },
              { name: 'Contact Us', path: '/contacts' },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsDrawerOpen(false)}
                className={`text-[16px] font-medium py-3.5 px-4 rounded-xl transition-all duration-200 ${isActive(link.path) ? "bg-emerald-50 text-emerald-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                {link.name}
              </Link>
            ))}

            <div className="my-4 border-t border-gray-100"></div>

            {/* Mobile Auth/Profile details */}
            {token && user && (
              <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-xl mb-2 cursor-pointer transition-colors hover:bg-emerald-100" onClick={() => { setIsDrawerOpen(false); navigate("/profile", { state: user }); }}>
                {user.img ? (
                  <img src={user.img} alt="Profile" className="w-10 h-10 rounded-full border border-emerald-200 object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-white text-emerald-600 flex items-center justify-center rounded-full shadow-sm">
                    <FaUser className="text-lg" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-emerald-900">Your Profile</span>
                  <span className="text-xs text-emerald-600 truncate max-w-[150px]">View & edit details</span>
                </div>
              </div>
            )}

            <Link to="/cart" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-3 text-[16px] font-medium py-3.5 px-4 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all">
              <FaShoppingCart className="text-xl text-gray-400" />
              Your Cart
            </Link>

            {!token ? (
              <Link to="/login" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-3 text-[16px] font-medium py-3.5 px-4 rounded-xl text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all mt-2 shadow-sm">
                <IoLogIn className="text-xl" />
                Login / Register
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsDrawerOpen(false);
                }}
                className="flex items-center gap-3 text-[16px] font-medium py-3.5 px-4 rounded-xl text-rose-600 hover:bg-rose-50 transition-all w-full text-left mt-2 shadow-sm"
              >
                <IoLogOut className="text-xl" />
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}