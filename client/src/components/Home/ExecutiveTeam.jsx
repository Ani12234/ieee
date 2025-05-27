import React, { useEffect, useState } from "react";
import { TiArrowRight } from "react-icons/ti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);
import SG from "./assets/SG.png";
import SGBg from "./assets/SGBg.png";
import Sambhav from "./assets/Sambhav.png";
import SambhavBg from "./assets/Sambhav.jpg";
import ShravaniBg from "./assets/shravani.jpg"
import Shravani from "./assets/shravani.png"
import Bharatesh from "./assets/Bharatesh.png";
import BharateshBg from "./assets/Bharatesh.jpg";
import ChannabasavaBg from "./assets/Channabasava.jpg"
import SuhasBg from "./assets/SuhasBg.png"
import Suhas from "./assets/Suhas.png"

const ExecutiveTeam = () => {
  const [navigate, setNavigate] = useState(false);

  // useEffect(() => {
  //   const t1 = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".ExecutiveTeam",
  //       start: "top 80%",
  //       end: "top 20%",
  //       scrub: true,
  //     },
  //   });

  //   // Animate the "team" class elements
  //   const animeClasses = [".anime1", ".anime2", ".anime3", ".anime4", ".anime5"];
  //   animeClasses.forEach((animeClass) => {
  //     t1.to(animeClass, { opacity: 1 });
  //   });

  //   const handleResize = () => {
  //     if (window.innerWidth >= 1024) {
  //       const t2 = gsap.timeline({
  //         scrollTrigger: {
  //           trigger: ".ExecutiveTeam",
  //           start: "top -5%",
  //           end: "bottom -100%",
  //           scrub: true,
  //           pin: true,
  //         },
  //       });

  //       t2.fromTo(
  //         [".mem1", ".title1", ".img1", ".mem2", ".title2", ".img2", ".mem3", ".title3", ".img3", ".mem4", ".title4", ".img4", ".mem5", ".title5", ".img5"],
  //         { y: 500, opacity: 0 },
  //         { y: 0, opacity: 1, stagger: 0.2, duration: 0.5, ease: "power2.out" }
  //       );

  //       return () => {
  //         t2.kill(); // Kill timeline on component unmount
  //       };
  //     }
  //   };

  //   handleResize(); // Call on mount
  //   window.addEventListener('resize', handleResize); // Add resize event listener

  //   // Cleanup
  //   return () => {
  //     t1.kill(); // Kill timeline on component unmount
  //     window.removeEventListener('resize', handleResize); // Remove event listener on unmount
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Remove scroll triggers
  //   };
  // }, []);

  if (navigate) {
    return <Navigate to="/execoms" />;
  }

  return (
    <>
      <div className="ExecutiveTeam h-fit max-w-[90rem] lg:px-5 sm:px-8 px-5 mx-auto mt-10 pt-10">
        <div className="lg:h-[33vmin] h-fit flex items-center">
          <div className="xl:w-[55%] lg:w-[48%] w-full">
            <h1 className="anime1 xl:text-[3.62rem] lg:text-5xl md:text-6xl sm:text-5xl text-3xl font-bold">
              THE BEC-IEEE EXECUTIVE TEAM
            </h1>
            <h1 className="anime2 xl:text-[3.62rem] lg:text-5xl md:text-6xl sm:text-5xl text-3xl font-thin">
              YOU'VE BEEN
            </h1>
            <h1 className="anime3 xl:text-[3.62rem] lg:text-5xl md:text-6xl sm:text-5xl text-3xl font-thin">
              LOOKING FOR
            </h1>
          </div>
          <div className="xl:w-[45%] lg:w-[52%] hidden lg:block pl-20 text-justify">
            <p className="anime4 lg:text-sm">
              Our executive team is the backbone of our branch, leading with
              passion, innovation, and a relentless commitment to excellence.
              Each member plays a vital role in driving our vision forward,
              fostering a culture of collaboration and growth. Curious to know
              who’s behind the success stories and groundbreaking initiatives?
              Dive deeper and discover the brilliant minds shaping our journey!
            </p>
            <button 
              className="anime5 group bg-white text-black rounded-full px-5 py-3 font-bold flex justify-center items-center gap-2 mt-5"
              onClick={() => setNavigate(true)}
            >
              MEET OUR EXECOM
              <TiArrowRight className="text-3xl group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        <div className="execoms w-full xl:h-[67vmin] lg:h-[90vmin] hidden lg:flex justify-start items-end">

          <div className="mem1  xl:w-[20%] lg:w-[25%] h-full bg-[#F4A261] rounded-full flex flex-col justify-end items-center">
            <div className="title1">
              <h1 className="text-center text-2xl font-bold text-black">
              Dr. Sangamesh .Y. G
              </h1>
              <h1 className="text-center text-lg text-black">
                Branch Counselor
              </h1>
            </div>
            <img src={SG} className="img1 rounded-b-full mt-24 w-80" alt="image" />
          </div>

          <div className="mem2 xl:w-[20%] lg:w-[25%] h-[85%] bg-[#CBD5D4] rounded-full flex flex-col justify-end items-center">
            <div className="title2">
              <h1 className="text-center text-2xl font-bold text-black">
                Sambhav Oswal
              </h1>
              <h1 className="text-center text-lg text-black">Chairperson</h1>
            </div>
            <img
              src={Sambhav}
              className="img2 rounded-b-full mt-4"
              alt="image"
            />
          </div>

          <div className="mem3 xl:w-[20%] lg:w-[25%] h-[75%] bg-[#E4DBD2] rounded-full flex flex-col justify-end items-center">
            <div className="title3">
              <h1 className="text-center text-2xl font-bold text-black">
                Shravani Uppar
              </h1>
              <h1 className="text-center text-lg text-black">
                Vice Chairperson
              </h1>
            </div>
            <img
              src={Shravani}
              className="img3 rounded-b-full"
              alt="image"
            />
          </div>

          <div className="mem4 xl:w-[20%] lg:w-[25%] h-[90%] bg-[#FFC931] rounded-full flex flex-col justify-end items-center">
            <div className="mt-10 title4">
              <h1 className="text-center text-2xl font-bold text-black">
                Bharatesh B karbhari
              </h1>
              <h1 className="text-center text-lg text-black">Secretary</h1>
            </div>
            <img
              src={Bharatesh}
              className="img4 rounded-b-full mt-8"
              alt="image"
            />
          </div>

          <div className="mem5 xl:w-[20%] hidden h-[65%] bg-[#FEB9CE] rounded-full xl:flex flex-col justify-end items-center">
            <div className="title5">
              <h1 className="text-center text-2xl font-bold text-black">
                Suhas Kulkarni
              </h1>
              <h1 className="text-center text-lg text-black">Treasurer</h1>
            </div>
            <img
              src={Suhas}
              className="img5 rounded-b-full"
              alt="image"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:hidden gap-6 place-items-center mt-16">

          <div className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700" style={{backgroundImage: `url(${SGBg})`, backgroundSize: 'cover'}}>
            <div className="bg-black w-full text-center rounded-b-md">
              <h2 className="text-sm sm:text-base font-semibold">Dr. Sangamesh .Y. G</h2>
              <p className="text-sm">Branch Counselor</p>
            </div>
          </div>

          <div className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700" style={{backgroundImage: `url(${SambhavBg})`, backgroundSize: 'cover'}}>
            <div className="bg-black w-full text-center rounded-b-md">
              <h2 className="text-md font-semibold">Sambhav Oswal</h2>
              <p className="text-sm">Chairperson</p>
            </div>
          </div>

          <div className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700" style={{backgroundImage: `url(${ShravaniBg})`, backgroundSize: 'cover'}}>
            <div className="bg-black w-full text-center rounded-b-md">
              <h2 className="text-md font-semibold">Shravani Uppar</h2>
              <p className="text-sm">Vice Chairperson</p>
            </div>
          </div>

          <div className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700" style={{backgroundImage: `url(${BharateshBg})`, backgroundSize: 'cover'}}>
            <div className="bg-black w-full text-center rounded-b-md">
              <h2 className="text-md font-semibold">Bharatesh karbhari</h2>
              <p className="text-sm">Secretary</p>
            </div>
          </div>

          <div className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700" style={{backgroundImage: `url(${SuhasBg})`, backgroundSize: 'cover', backgroundPosition: 'right'}}>
            <div className="bg-black w-full text-center rounded-b-md">
              <h2 className="text-md font-semibold">Suhas Kulkarni</h2>
              <p className="text-sm">Treasurer</p>
            </div>
          </div>

          <div className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700" style={{backgroundImage: `url(${ChannabasavaBg})`, backgroundSize: 'cover'}}>
            <div className="bg-black w-full text-center rounded-b-md">
              <h2 className="text-md font-semibold">Channabasava B</h2>
              <p className="text-sm">Design head</p>
            </div>
          </div>

        </div>

        <div className="lg:hidden w-full px-5 sm:text-justify mt-10">
            <p className="anime4  lg:text-sm">
              Our executive team is the backbone of our branch, leading with
              passion, innovation, and a relentless commitment to excellence.
              Each member plays a vital role in driving our vision forward,
              fostering a culture of collaboration and growth. Curious to know
              who’s behind the success stories and groundbreaking initiatives?
              Dive deeper and discover the brilliant minds shaping our journey!
            </p>
            <button 
              className="anime5  group bg-white text-black rounded-full px-5 py-3 font-bold flex justify-center items-center gap-2 mt-5"
              onClick={() => setNavigate(true)}
            >
              MEET OUR EXECOM
              <TiArrowRight className="text-3xl  group-hover:opacity-100 transition-opacity duration-300" />
            </button>
        </div>

      </div>
    </>
  );
};

export default ExecutiveTeam;
