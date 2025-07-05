

import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "./Footer.css";

// Import images from assets
import logo1 from "../assets/logo.jpg";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <img src={logo1} alt="Logo 1" className="footer-img" />
          
        </div>

        {/* CENTER: Quick Links */}
        <div className="footer-center">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* RIGHT: Social Icons */}
        <div className="footer-right">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="icon" /> Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="icon" /> Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Boot's Buy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
