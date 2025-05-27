import React from 'react';
import { CiInstagram } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#181818] text-white py-10">
      <div className="max-w-[85rem] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Section 1 */}
        <div>
          <p className="text-lg font-semibold mb-2">
            Unlock opportunities, connect with peers, and access exclusive resources by joining <span className="text-[#A548B1]">IEEE</span>.
          </p>
          <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200"
          onClick={() => navigate("/joinIEEE")}
          >
            Join IEEE Today!
          </button>
        </div>

        {/* Section 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-[#A548B1] font-extralight">About Us</Link></li>
            <li><Link to="/events" className="hover:text-[#A548B1] font-extralight">Events</Link></li>
            <li><Link to="/membership" className="hover:text-[#A548B1] font-extralight">Membership</Link></li>
            <li><Link to="https://www.ieee.org" target="_blank" className="hover:text-[#A548B1] font-extralight">IEEE</Link></li>
            <li><Link to="https://www.ieeer10.org/" target="_blank" className="hover:text-[#A548B1] font-extralight">Region 10</Link></li>
            <li><Link to="https://ieeebangalore.org/" target="_blank" className="hover:text-[#A548B1] font-extralight">Bangalore Section</Link></li>
            <li><Link to="https://ieee-collabratec.ieee.org/" target="_blank" className="hover:text-[#A548B1] font-extralight">IEEE Collaborate</Link></li>
            <li><Link to="https://www.ieee.org/membership/index.html" target="_blank" className="hover:text-[#A548B1] font-extralight">About Global IEEE Membership</Link></li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Societies</h4>
          <ul className="space-y-2">
            <li><Link to="https://www.computer.org/" target="_blank" className="hover:text-[#A548B1] font-extralight">Computer Society</Link></li>
            <li><Link to="https://www.comsoc.org/" target="_blank" className="hover:text-[#A548B1] font-extralight">Communications Society</Link></li>
            <li><Link to="https://ieee-pes.org/" target="_blank" className="hover:text-[#A548B1] font-extralight">Power and Energy Society</Link></li>
            <li><Link to="https://www.ieee-ras.org/" target="_blank" className="hover:text-[#A548B1] font-extralight">Robotics and Automation Society</Link></li>
            <li><Link to="https://ieee-aess.org/" target="_blank" className="hover:text-[#A548B1] font-extralight">Aerospace and Electronic Systems Society</Link></li>
          </ul>
          <h4 className="text-lg font-semibold mt-6 mb-2">Affinities</h4>
          <ul className="space-y-2">
            <li><Link to="https://sight.ieee.org/about-ieee-sight/" target="_blank" className="hover:text-[#A548B1] font-extralight">Special Interest Group on Humanitarian Technology</Link></li>
            <li><Link to="https://wie.ieee.org/" target="_blank" className="hover:text-[#A548B1] font-extralight">Women in Engineering</Link></li>
          </ul>
        </div>

        {/* Section 4 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Address:</h4>
          <p className="mb-4 font-extralight">Basaveshwar Engineering College, Vidyagiri, Bagalkote, Karnataka 587102</p>
          <div className="flex space-x-4 text-xl">
            <Link to="https://www.instagram.com/bec_ieee/" target="_blank" className="hover:text-[#A548B1]"><CiInstagram className='text-3xl' /></Link>
            <Link to="https://x.com/ieee_bec" target="_blank" className="hover:text-[#A548B1]"><FaXTwitter className='text-3xl' /></Link>
            <Link to="https://www.linkedin.com/company/bec-ieee/" target="_blank" className="hover:text-[#A548B1]"><CiLinkedin className='text-3xl' /></Link>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-400">
        <p>© All rights reserved BEC IEEE</p>
        <p>Crafted with ❤️ & passion by <Link to={"/execoms/Web-team/2024"} className='underline text-[#A548B1]'>BEC IEEE Web Team 2024</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
