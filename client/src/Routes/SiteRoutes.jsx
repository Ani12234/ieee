import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "../components/NotFound/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "../store/auth-slice";
import CheckAuth from "../pages/common/index";

// Lazy-loaded components
const Home = lazy(() => import("../components/Home/Home"));
const UnderConstruction = lazy(() => import("../components/UnderConstruction/UnderConstruction"));
const Notfound = lazy(() => import("../components/NotFound/Notfound"));
const AuthLogin = lazy(() => import("../pages/login"));
const QRScanner = lazy(() => import("../components/components/QRScanner"));
const CommitteePage = lazy(() => import("../components/pages/CommitteePage"));
const AdminDashboard = lazy(() => import("../../src/pages/events-management"));
const MeetingsManager = lazy(() => import("../../src/pages/meetings"));
const EventsPage = lazy(() => import("../pages/page"));
const AdminLayout = lazy(() => import("../components/layout"));
const AuthLayout = lazy(() => import("../components/auth-layout"));

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
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
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
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default SiteRoutes;