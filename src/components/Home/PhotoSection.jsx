import React, { useEffect, useState } from "react";
import { TiArrowRight } from "react-icons/ti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import "./css/grid.css";

const PhotoSection = () => {
  const navigate = useNavigate();
  gsap.registerPlugin(ScrollTrigger);

  const [isSM, setIsSM] = useState(false);

  useEffect(() => {
    const updateGridValues = () => {
      const width = window.innerWidth;
      setIsSM(width < 1024);
    };

    updateGridValues();
    const handleResize = debounce(updateGridValues, 100);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   document.querySelectorAll(".elem").forEach(elem => {
  //     let image = elem.querySelector("img")
  //     let tl = gsap.timeline()

  //     let xTransform = gsap.utils.random(-100, 100);

  //     tl.set(image,{
  //       transformOrigin: `${xTransform < 0 ? 0 : '100%'}`,
  //     },"start")
  //     .to(image, {
  //       scale: 0,
  //       ease:"none",
  //       scrollTrigger: {
  //         trigger:image,
  //         start: "top top",
  //         end: "bottom top",
  //         scrub: true
  //       }
  //     },"start")
  //   })
  // },[])

  return (
    <>
      <div className="w-full h-fit relative pt-24">
        <div className="grid lg:grid-cols-8 grid-cols-4 grid-rows-20 gap-2 overflow-hidden">
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 1, "--c": 3 }} 
          >
            <img src={`./assets/1.jpg`} alt={`image 1`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 1, "--c": isSM ? 1 : 7 }} 
          >
            <img src={`./assets/2.jpg`} alt={`image 2`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 2, "--c": 2 }}
          >
            <img src={`./assets/3.jpg`} alt={`image 3`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 2, "--c": isSM ? 4 : 6 }}
          >
            <img src={`./assets/4.jpg`} alt={`image 4`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 3, "--c": isSM ? 2 : 4 }}
          >
            <img src={`./assets/5.jpg`} alt={`image 5`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 3, "--c": isSM ? 3 : 8 }}
          >
            <img src={`./assets/6.jpg`} alt={`image 6`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 4, "--c": 1 }}
          >
            <img src={`./assets/7.jpg`} alt={`image 7`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 4, "--c": isSM ? 4 : 7 }}
          >
            <img src={`./assets/8.jpg`} alt={`image 8`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 5, "--c": 2 }}
          >
            <img src={`./assets/9.jpg`} alt={`image 9`} />
          </div>
          {/* <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 5, "--c": 5 }}
          >
            <img src={`./assets/10.jpg`} alt={`image 10`} />
          </div> */}
          {/* <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 6, "--c": 3 }}
          >
            <img src={`./assets/11.jpg`} alt={`image 11`} />
          </div> */}
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 6, "--c": isSM ? 1 : 7 }}
          >
            <img src={`./assets/12.jpg`} alt={`image 12`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 7, "--c": isSM ? 3 : 5 }}
          >
            <img src={`./assets/13.jpg`} alt={`image 13`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 7, "--c": isSM ? 2 : 8 }}
          >
            <img src={`./assets/14.jpg`} alt={`image 14`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 8, "--c": 1 }}
          >
            <img src={`./assets/15.jpg`} alt={`image 15`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 8, "--c": 4 }}
          >
            <img src={`./assets/16.jpg`} alt={`image 16`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 9, "--c": 3 }}
          >
            <img src={`./assets/17.jpg`} alt={`image 17`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 9, "--c": isSM ? 1 : 6 }}
          >
            <img src={`./assets/18.jpg`} alt={`image 18`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 10, "--c": 2 }}
          >
            <img src={`./assets/19.jpg`} alt={`image 19`} />
          </div>
          <div
            className="elem col-span-1 row-span-1"
            style={{ "--r": 10, "--c": isSM ? 4 : 7 }}
          >
            <img src={`./assets/20.jpg`} alt={`image 20`} />
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center text-white" style={{WebkitTextStroke: "0.2px black"}}>
            Memorable Moments
          </h1>
          <h1 className="text-base sm:text-lg lg:text-2xl font-bold text-center text-white">
            Relive our cherished memories through a captivating photo gallery.
          </h1>
          <div className="flex justify-center items-center w-full">
            <button
              className="group bg-white text-black rounded-full px-5 py-3 font-bold flex justify-center items-center gap-2 mt-5"
              onClick={() => navigate("/photo-gallery")}
            >
              Photo Gallery
              <TiArrowRight className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default PhotoSection;
