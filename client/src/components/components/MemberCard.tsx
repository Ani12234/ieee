import React from 'react';
import type { Member } from '../data/committees';
import { FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

type MemberCardProps = Member;

const MemberCard = ({ image, name, designation, linkedin, email, portfolio }: MemberCardProps) => {
  return (
    <div className="w-full px-4 sm:w-[250px] mx-auto mb-6">
      {/* Card Container */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
        {/* Main Image */}
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center brightness-90 group-hover:brightness-100 transition-all duration-300"
        />

        {/* Content Overlay - Always Visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300">
          {/* Social Links - Appear on Hover */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all duration-300"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all duration-300"
              >
                <MdEmail className="h-5 w-5" />
              </a>
            )}
          </div>

          {/* Explore Button - Appear on Hover */}
          {portfolio && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <a
                href={portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-300"
              >
                Explore
              </a>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500/30 to-transparent transform rotate-45 translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-purple-500/30 to-transparent transform -rotate-45 -translate-x-8 translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Name and Designation - Below Card */}
      <div className="mt-4 text-center">
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">{name}</h3>
        <p className="text-sm text-purple-200 group-hover:text-purple-100 transition-colors duration-300">{designation}</p>
      </div>
    </div>
  );
};

export default MemberCard;
