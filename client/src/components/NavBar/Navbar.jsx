import React, { useState, useEffect, useRef } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BecLogo from "/assets/beclogo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  
  // Set active link based on current path only when page loads
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Special handling for admin area
    if (currentPath.startsWith('/operate')) {
      return; // Don't update the active tab for admin pages
    }
    
    if (currentPath === "/") {
      setActiveLink("/");
    } else {
      // Find the exact matching path or closest parent path
      const matchingLink = links.find(link => 
        currentPath === link.path || 
        (currentPath.startsWith(link.path + "/") && link.path !== "/")
      );
      
      if (matchingLink) {
        setActiveLink(matchingLink.path);
      }
    }
  }, [location.pathname]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuRef]);
  const links = [
    { name: "HOME", path: "/", width: "80px" },
    { name: "ABOUT", path: "/about", width: "80px" },
    { name: "EVENTS", path: "/events", width: "90px" },
    { name: "ACHIEVEMENTS", path: "/achievements", width: "140px" },
    { name: "EXECOMS", path: "/execoms", width: "100px" },
    { name: "SOCIETIES", path: "/societies", width: "100px" },
    { name: "AFFINITIES", path: "/affinities", width: "110px" },
    { name: "MEMBERSHIP", path: "/membership", width: "140px" },
  ];
  const activeIndex = links.findIndex((link) => link.path === activeLink);
  const activeWidth = links[activeIndex]?.width || "60px";

  return (
    <>
      {/* Desktop View */}
      <div className="hidden fixed h-36 w-full text-white lg:flex justify-center items-center z-10">
        <div className="relative h-12 w-[800px] bg-black rounded-full flex justify-between items-center text-sm font-light gap-10">
          <div
            className="absolute bg-white rounded-full leading-[3rem] h-12 transition-all duration-300 ease-in-out z-0"
            style={{
              left: `calc(${activeIndex < 3 ? activeIndex * 75 : activeIndex == 3 ? activeIndex * 79 : activeIndex == 4 ? activeIndex * 93 : activeIndex * 94}% / ${links.length})`,
              width: activeWidth,
            }}
          ></div>
          <div className="absolute w-full h-12 flex justify-between items-center z-10 px-5">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setActiveLink(link.path)}
                className={`transition-all duration-300 ${
                  activeLink === link.path ? "text-black font-bold" : "text-white font-medium drop-shadow-md"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden fixed w-full z-10">
        <div className="bg-black h-16 flex justify-between items-center px-4">
          <img src={BecLogo} alt="BEC Logo" className="h-12" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? <IoCloseSharp /> : <HiMenuAlt3 />}
          </button>
        </div>

        {menuOpen && (
          <div
            ref={menuRef}
            className="bg-black absolute w-full py-4 px-4 space-y-4"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => {
                  setActiveLink(link.path);
                  setMenuOpen(false);
                }}
                className={`block text-white hover:text-gray-300 transition-colors duration-200 ${
                  activeLink === link.path ? "text-gray-300" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Navbar;