import React from "react";
import './footer.css'

const Footer = () => {
  return (
    <>
      <div
        className="sticky-footer"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          position: "sticky",
          top: "100%",
          width: "100%",
          textAlign: "center",
          padding:'20px'
        }}
      >
        &copy; {new Date().getFullYear()} Copyright :
        {" Developed By Akshay Jadav "}
      </div>
    </>
  );
};

export default Footer;
