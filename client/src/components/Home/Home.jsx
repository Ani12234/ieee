import React, { useEffect, lazy, Suspense } from "react";
const Card = lazy(() => import("../3Dmodel/Card"));
import Journey from "./Journey";
import Success from "./Success";
import ExecutiveTeam from "./ExecutiveTeam";
import Chapters from "./Chapters";
import PhotoSection from "./PhotoSection";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import Popup from "../NavBar/Popup";

const Home = () => {

  return (
    
    <>
    <Popup
        text={
          <>
            You're missing out on something awesome!
            <br />
            Open this on your desktop for the full experience!!
          </>
        }
      />
      
      <div className="w-full h-screen">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D Experience...</div>}>
          <Card />
        </Suspense>
      </div>
      <Journey />
      <Success />
      <ExecutiveTeam />
      <Chapters />
      <PhotoSection />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
