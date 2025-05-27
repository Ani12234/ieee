import React, { useEffect, useState } from "react";
import "./App.css";
import SiteRoutes from "./Routes/SiteRoutes.jsx";
import Navbar from "./components/NavBar/Navbar.jsx";
import Lenis from "lenis";
import Loader from "./components/Loader/Loader.jsx";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { isAuthenticated } = useSelector(state => state.auth);
  
  // Reset loading state on logout
  const [hasLoggedOut, setHasLoggedOut] = useState(false);
  
  useEffect(() => {
    // If user logs out, we want to show the loader again
    if (!isAuthenticated && hasLoggedOut) {
      setLoading(true);
      setHasLoggedOut(false);
    }
  }, [isAuthenticated, hasLoggedOut]);

  useEffect(() => {
    if (!isAuthenticated && location.pathname === "/" && !loading) {
      setHasLoggedOut(true);
    }
  }, [isAuthenticated, location.pathname]);

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
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 6500);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [loading]);

  if (loading) {
    return <Loader />; // Show the loader
  }

  // Only show Navbar when not on /operate routes and not on auth routes
  const isAuthRoute = location.pathname.startsWith("/auth");
  const isOperateRoute = location.pathname.startsWith("/operate");
  const shouldShowNavbar = !isOperateRoute && !isAuthRoute;

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <SiteRoutes />
    </>
  );
};

export default App;
