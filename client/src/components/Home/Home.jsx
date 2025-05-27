import React, { useEffect } from "react";
import Card from "../3Dmodel/Card";
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
        <Card />
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
