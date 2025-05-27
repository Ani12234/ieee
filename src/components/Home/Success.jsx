import React, { useState } from "react";
import { TiArrowRight } from "react-icons/ti";
import collage from "./assets/achievementCollage.png";
import { Navigate } from "react-router-dom";

const Success = () => {
  const [navigate, setNavigate] = useState(false);

  const handleNavigate = () => {
    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to="/achievements" />;
  }

  return (
    <>
      <div className="w-full ">
        <h1 className="font-bold text-4xl text-center lg:hidden">
          Our Achievements & Success
        </h1>
        <div className="lg:flex justify-center">
          <div className="flex justify-center items-center w-full p-5 py-10 lg:w-1/2 ">
            <img src={collage} className="" alt="images" />
          </div>

          <div className="w-full lg:w-1/2 px-5 xl:pt-24 lg:py-10">
            <h1 className="hidden lg:block font-bold text-5xl">
              Our Achievements
            </h1>
            <h1 className="hidden lg:block font-bold text-5xl">& Success</h1>

            <p className="w-full xl:w-3/4 lg:mt-14 lg:text-justify">
              Our Student Branch has consistently raised the bar with remarkable
              accomplishments. We successfully organized NKCON 2024, our
              flagship conference, which united innovators, researchers, and
              thought leaders to share transformative ideas and breakthroughs.
              This event stood as a testament to our commitment to fostering
              knowledge and collaboration. Adding to our legacy, we proudly
              received the prestigious IEEE-NKSS Outstanding Student Branch
              Award for 2023, a recognition of our dedication to excellence and
              impact.
              <br />
              <br />
              These milestones are just a glimpse of our journey—a journey
              filled with passion, hard work, and relentless innovation. Dive
              deeper into the incredible achievements that define us and the
              countless stories behind them!
            </p>

            <button 
              onClick={handleNavigate}
              className="group bg-white text-black rounded-full px-5 py-3 font-bold flex justify-center items-center gap-2 mt-14"
            >
              Our Milestones
              <TiArrowRight className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
