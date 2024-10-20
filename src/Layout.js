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
      <footer
        style={{
          marginTop: "20px",
          textAlign: "center",
          padding: "10px",
          fontSize: "14px",
        }}
      >
        <p>
          Powered by{" "}
          <a
            href="https://multi-app-web.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            MultiApp
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
