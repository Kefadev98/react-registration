import React from "react";
import vectorOne from "../assets/vectorOne.svg";
import vectorTwo from "../assets/vectorTwo.svg";

const Footer = () => {
  return (
    <div className="footer">
      <img src={vectorOne} alt="vectorOne" className="footer-img" />
      <img src={vectorTwo} alt="vectorOne" className="footer-img" />
    </div>
  );
};

export default Footer;
