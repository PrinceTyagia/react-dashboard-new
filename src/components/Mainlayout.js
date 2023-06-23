import React, { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logo, background, profileimage } from '../helper/Constants'
import Footer from "./Footer.js";
import "../assets/css/header.css";
import "../assets/css/sidebar.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { logout } from "../redux/authSlice";




const Mainlayout = () => {
  //hook area
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.token);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  //tokenExpiredFn
  const isTokenExpired = useCallback((token) => {
    const currentTime = Date.now();
    const tokenExpiration = decodeToken(token).exp * 1000;
    if (currentTime > tokenExpiration) {
      return true; // Token is expired
    }
    return false; // Token is not expired
  }, []);
  //token decodeFn
  const decodeToken = (token) => {
    const expirationTime = 24 * 60 * 60; // 1 day in seconds
    const decodedToken = {
      exp: Math.floor(Date.now() / 1000) + expirationTime,
      // Include other token payload data as needed
    };

    return decodedToken;
  };

  useEffect(() => {
    if (!isAuthenticated || isTokenExpired(token)) {
      // Dispatch the logout action
      dispatch(logout());
      // Clear the token from local storage
      localStorage.removeItem("token");
      // Redirect to login page
      navigate("/");
    }
  }, [isAuthenticated, dispatch, navigate, isTokenExpired, token]);

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Clear the token from local storage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/");
  };


  return (
    <>
      <div className={`${isSidebarOpen ? "toggle-sidebar" : ""}`}>
        <header
          id="header"
          className="header fixed-top d-flex align-items-center"
        >
          <div className="d-flex align-items-center justify-content-between">
            <i
              className="bi bi-list toggle-sidebar-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <Link to="/dashboard" className="logo d-flex align-items-center">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          {/* End Logo */}

          <div className="d-flex align-items-center">

            <span style={{ color: "#2B80FF" }}>OPTRA</span>&nbsp;CLIENT
            DASHBOARD
          </div>
          <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
              <li className="nav-item d-block d-lg-none">
                <Link className="nav-link nav-icon search-bar-toggle " to="#">
                  <i className="bi bi-search" />
                </Link>
              </li>
              {/* End Search Icon*/}
              <li className="nav-item dropdown">
                <Link className="nav-link nav-icon">
                  <i className="bi bi-bell" />
                  <span className="badge bg-primary badge-number">4</span>
                </Link>
                {/* End Notification Icon */}
              </li>
              {/* End Notification Nav */}
              <li className="nav-item dropdown">
                <Link className="nav-link nav-icon">
                  <i className="bi bi-chat-left-text" />
                  <span className="badge bg-success badge-number">3</span>
                </Link>
                {/* End Messages Icon */}
              </li>
              {/* End Messages Nav */}
              <li className="nav-item dropdown pe-3">
                <Link
                  className="nav-link nav-profile d-flex align-items-center pe-0"
                  to="#"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={profileimage}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <span className="d-none d-md-block  dropdown-toggle ps-2">
                    Suvigya Kapoor
                  </span>
                </Link>
                {/* End Profile Iamge Icon */}
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6>Suvigya Kapoor</h6>
                    <span>Web Designer</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to="editprofile"
                    >
                      <i className="bi bi-person" />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to="editprofile/#profile-settings"
                    >
                      <i className="bi bi-gear" />
                      <span>Account Settings</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to="pages-faq.html"
                    >
                      <i className="bi bi-question-circle" />
                      <span>Need Help?</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right" />
                      <span>Sign Out</span>
                    </Link>
                  </li>
                </ul>
                {/* End Profile Dropdown Items */}
              </li>
              {/* End Profile Nav */}

              <li className="nav-item dropdown">
                <Link
                  onClick={handleLogout}
                  className="nav-link nav-icon"
                  to="#"
                >
                  <i className="bi bi-box-arrow-right" />
                </Link>
                {/* End Messages Icon */}
              </li>

              {/* End Notification Nav */}
            </ul>
          </nav>
          {/* End Icons Navigation */}
        </header>
        {/* End Header */}
        {/* ======= Sidebar ======= */}
        <aside
          id="sidebar"
          className="sidebar"
          style={{ backgroundImage: `url(${background})`, position: "fixed" }}
        >
          <div style={{ padding: "7px 7px 15px 7px" }}>
            <div className="card-body2 d-flex rounded" >
              <img src={profileimage} width={36} height={36} alt="Profileimage" className="rounded-circle"
                style={{ marginRight: "5%" }} />
              <span className="text-white">Admin</span>

            </div>

          </div>
          <ul className="sidebar-nav" id="sidebar-nav">
            <li
              className={
                location.pathname === "/dashboard"
                  ? "sidebaractive nav-item"
                  : "nav-item"
              }
            >
              <Link className="nav-link " to="/dashboard">
                <i className="bi bi-grid" />
                <span>Dashboard</span>
              </Link>
            </li>
            {/* End Dashboard Nav */}
            <li
              className={
                location.pathname === "/dashboard/locationmatrics"
                  ? "sidebaractive nav-item"
                  : "nav-item"
              }
            >
              <Link className="nav-link " to="locationmatrics">
                <i class="bi bi-pin-map-fill"></i>
                <span>Location Matrics</span>
              </Link>
            </li>
            {/* End Dashboard Nav */}

            <li
              className={
                location.pathname === "/dashboard/orderstatistics"
                  ? "sidebaractive nav-item"
                  : "nav-item"
              }
            >
              <Link className="nav-link " to="orderstatistics">
                <i class="bi bi-sort-up"></i>
                <span>Order Statistics</span>
              </Link>
            </li>
            {/* End F.A.Q Page Nav */}
            <li
              className={
                location.pathname === "/dashboard/dispatchstatistics"
                  ? "sidebaractive nav-item"
                  : "nav-item"
              }
            >
              <Link className="nav-link " to="dispatchstatistics">
                <i class="bi bi-truck"></i>
                <span>Dispatch Statistics</span>
              </Link>
            </li>
            {/* End Contact Page Nav */}
            <li
              className={
                location.pathname === "/dashboard/useraccount"
                  ? "sidebaractive nav-item"
                  : "nav-item"
              }
            >
              <Link className="nav-link " to="useraccount">
                <i className="bi bi-card-list" />
                <span>User Account</span>
              </Link>
            </li>
            {/* End Register Page Nav */}
          </ul>
        </aside>
        {/* End Sidebar*/}
        <div>
          <Outlet />
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default Mainlayout;
