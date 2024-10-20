import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <div class="title-container">
        <h1 className="title">Decision Maker</h1> {/* Shared title */}
      </div>
      <Outlet />{" "}
      {/* This will render the specific page content (either input or wheel) */}
    </div>
  );
};

export default Layout;
