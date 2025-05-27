import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const animateTimeline = (timeline, trigger, circleClass, linearBGClass, dateClass, paraClass) => {
  timeline.to(circleClass, {
    top: "97%",
    ease: "power1.out",
  }, 0);

  timeline.to(linearBGClass, {
    height: '100%',
    ease: "power1.out",
  }, 0);

  gsap.to(dateClass, {
    opacity: 1,
    y: -150,
    duration: 2,
    scrollTrigger: {
      trigger: trigger,
      start: "0% 50%",
      end: "8% 50%",
      scrub: true,
    },
  });

  gsap.to(paraClass, {
    opacity: 1,
    duration: 0.5,
    scrollTrigger: {
      trigger: trigger,
      start: "0% 35%",
      end: "20% 35%",
      scrub: true,
    },
  });
};

const Journey = () => {
  useEffect(() => {
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".timeLine1",
        start: "0% 50%",
        end: "40% 0%",
        scrub: true,
      },
    });
    animateTimeline(t1, ".timeLine1", '.circle1', '.linearBG1', '.date1', '.para1');

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".timeLine2",
        start: "0% 50%",
        end: "40% 0%",
        scrub: true,
      },
    });
    animateTimeline(t2, ".timeLine2", '.circle2', '.linearBG2', '.date2', '.para2');

    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".timeLine3",
        start: "0% 50%",
        end: "40% 0%",
        scrub: true,
      },
    });
    animateTimeline(t3, ".timeLine3", '.circle3', '.linearBG3', '.date3', '.para3');

    // Cleanup function to kill the ScrollTrigger instance
    return () => {
      t1.kill();
      t2.kill();
      t3.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="py-10 px-4">
        <h1 className="font-bold text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:tracking-wider">
          The Journey of
        </h1>
        <h1 className="font-bold text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:tracking-wider">
          BEC IEEE Student Branch
        </h1>
        <h3 className="text-center mt-5 text-lg lg:text-2xl font-light">
          A passion for innovation and technology brought us together.
        </h3>
        <h3 className="text-center text-lg lg:text-2xl font-light">
        Our story began over three decades ago... Get ready to dive in!
        </h3>
      </div>

      <div className="mt-20">

        <div className="timeLine1 flex justify-between w-full h-[40rem] md:h-[33rem] pl-10 pr-5 sm:px-20 md:px-32 lg:px-20">
          <h1 className="date1 hidden lg:block opacity-0 w-[45%] text-end text-5xl py-44">January 1994</h1>

          <div className="relative w-2 h-[100%] bg-[#787474] rounded-full">
            
            <div className="circle1 absolute z-10 top-0 w-7 h-7 translate-x-[-35%] border-2 border-[#787474] rounded-full bg-white"></div>

            <div className="linearBG1 absolute top-0 w-2 h-[0%] rounded-full" style={{ background: "linear-gradient(#BA3A37 0%, #D54148 50%, #A548B1 75%, #7948E4 100%)" }}></div>
          </div>

          <div className="w-[90%] lg:w-[45%] mt-36 sm:mt-40 lg:mt-0 lg:py-36">
            <h1 className="date1 absolute lg:hidden opacity-0 text-4xl sm:text-5xl">January 1994</h1>
            <p className="para1 opacity-0 xl:text-justify font-light text-md sm:text-lg">
            The IEEE Student Branch (STB35261) of Basaveshwar Engineering College, Bagalkot, was established by Dr. Suresh H. Jangamshetti, a Senior Member of IEEE and a visionary in engineering education. The branch, known as BEC-IEEE, started with the goal of fostering technical excellence, professional networking, and innovation among students. Over the years, it has played a pivotal role in organizing various events, from workshops and technical talks to humanitarian and professional activities, shaping the careers of countless students.
            </p>
          </div>
        </div>

        <div className="timeLine2 flex justify-between w-full h-[50rem] md:h-[45rem] pl-10 pr-5 sm:px-20 md:px-32 lg:px-20">
          <h1 className="date2 hidden lg:block opacity-0 w-[45%] text-end text-5xl py-44">January 2020</h1>

          <div className="relative w-2 h-[100%] bg-[#787474] rounded-full">
            
            <div className="circle2 absolute z-20 top-0 w-7 h-7 translate-x-[-35%] border-2 border-[#787474] rounded-full bg-white"></div>

            <div className="linearBG2 absolute top-0 w-2 h-[0%] rounded-full" style={{ background: "linear-gradient(#BA3A37 0%, #D54148 50%, #A548B1 75%, #7948E4 100%)" }}></div>
          </div>

          <div className="w-[90%] lg:w-[45%] mt-32 sm:mt-40 lg:mt-0 lg:py-36">
          <h1 className="date2 absolute lg:hidden opacity-0 text-4xl sm:text-5xl">January 2020</h1>
            <p className="para2 opacity-0 xl:text-justify font-light text-md sm:text-lg">
            The IEEE North Karnataka Sub Section (NKSS) was officially established, marking a transformative step in strengthening IEEE's presence in northern Karnataka. This subsection provided a structured platform for fostering innovation, collaboration, and professional development in the region. BEC-IEEE became one of its affiliated entities under the esteemed IEEE Bangalore Section, further enhancing its capabilities to contribute to IEEE's mission. With NKSS as a unifying force, BEC-IEEE actively participated in cross-institutional initiatives, hosted joint events, and facilitated networking opportunities among students, researchers, and professionals. This new affiliation also empowered the branch to bring global IEEE resources closer to its members, amplifying its impact on engineering education and technological growth in North Karnataka.
            </p>
          </div>

        </div>

        <div className="timeLine3 flex justify-between w-full h-[40rem] md:h-[30rem] pl-10 pr-5 sm:px-20 md:px-32 lg:px-20">
          <h1 className="date3 hidden lg:block opacity-0 w-[45%] text-end text-5xl py-44">September 2024</h1>

          <div className="relative w-2 h-[100%] bg-[#787474] rounded-full">
            
            <div className="circle3 absolute z-30 top-0 w-7 h-7 translate-x-[-35%] border-2 border-[#787474] rounded-full bg-white"></div>

            <div className="linearBG3 absolute top-0 w-2 h-[0%] rounded-full" style={{ background: "linear-gradient(#BA3A37 0%, #D54148 50%, #A548B1 75%, #7948E4 100%)" }}></div>
          </div>

          <div className="w-[90%] lg:w-[45%] mt-36 sm:mt-40 lg:mt-0 lg:py-36">
            <h1 className="date3 absolute lg:hidden opacity-0 text-4xl sm:text-5xl">September 2024</h1>
            <p className="para3 opacity-0 xl:text-justify font-light text-md sm:text-lg">
            BEC-IEEE successfully organized <b>NKCon - 24</b>, an international conference that attracted participants and experts from across the globe. The event showcased cutting-edge research and innovative solutions, further cementing BEC-IEEE's reputation as a hub of academic excellence and technological advancement. <b>NKCon-24</b> was not only a platform for knowledge exchange but also a celebration of 30 years of unwavering dedication to IEEE's mission of advancing technology for humanity.
            </p>
          </div>

        </div>
      </div>
      <div className="w-full flex flex-col items-center py-10 px-5">
        <h1 className="text-3xl md:text-5xl font-semibold">Today</h1>
        <h3 className="text-center max-w-[60rem] mt-5 text-md lg:text-xl font-light">
        Today, IEEE BEC Student Branch is a thriving community driven by a shared mission - to empower students to pursue their passions, cultivate meaningful connections, and make a lasting impact.
        </h3>
      </div>
    </>
  );
};

export default Journey;
