import React, { useEffect, useState } from "react";
import "./App.css";
import SiteRoutes from "./Routes/SiteRoutes.jsx";
import Navbar from "./components/NavBar/Navbar.jsx";
import Lenis from "lenis";
import Loader from "./components/Loader/Loader.jsx";
import Confetti from "react-confetti";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const width = window.innerWidth-20;
  const height = window.innerHeight;

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Simulate a loading time (e.g., 2 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6500);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  if (loading) {
    return <Loader />; // Show the loader
  }

  return (
    <>
      <Confetti width={width} height={height} numberOfPieces={1000} run={true} recycle={false} tweenDuration={50000} className="" />
      <Navbar />
      <SiteRoutes />
    </>
  );
};

export default Index;
