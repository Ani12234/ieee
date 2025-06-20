import React from "react";
import Home from "../components/Home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import UnderConstruction from "../components/UnderConstruction/UnderConstruction";
import Notfound from "../components/NotFound/Notfound";
import Execoms from "../components/Execoms/Execoms";
import ScrollToTop from "../components/NotFound/ScrollToTop";
import AuthLogin from "../pages/login";
// import AuthRegister from "../pages/register";
import CheckAuth from "../pages/common/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "../store/auth-slice";
import AuthLayout from "../components/auth-layout";
import QRScanner from "../components/components/QRScanner"
import CommitteePage from "../components/pages/CommitteePage";
import EventsManager from "../pages/events";
import AdminDashboard from "../../src/pages/events-management";
import MeetingsManager from "../../src/pages/meetings";
import EventsPage from "../pages/page";
import AdminLayout from "../components/layout";

const SiteRoutes = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={
            isAuthenticated ? 
              (user?.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/operate" />)
              : <AuthLayout />
          }
        >
          <Route path="login" element={<AuthLogin />} />
          {/* <Route path="register" element={<AuthRegister />} /> */}
        </Route>
        <Route
          path="/operate"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
             <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="qr" element={<QRScanner/>} />
          <Route path="events" element={<AdminDashboard/>} />
          <Route path="meetings" element={<MeetingsManager/>} />
        </Route>
        <Route path="/about" element={<UnderConstruction />} />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/achievements" element={<UnderConstruction />} />
        <Route path="/execoms" element={<CommitteePage />} />
        <Route path="/execoms/*" element={<Navigate to="/execoms" replace />} />
        <Route path="/societies" element={<UnderConstruction />} />
        <Route path="/affinities" element={<UnderConstruction />} />
        <Route path="/membership" element={<UnderConstruction />} />
        <Route path="/photo-gallery" element={<UnderConstruction />} />
        <Route path="/joinIEEE" element={<UnderConstruction />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
};

export default SiteRoutes;