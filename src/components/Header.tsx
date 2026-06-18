import React, { useState } from 'react';
import { FaTelegramPlane, FaBars, FaTimes, FaHome, FaNewspaper, FaMobileAlt, FaCode, FaPaperPlane, FaSearch } from 'react-icons/fa';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="site-header">
      <div className="header-container">
        <a href="#" className="logo-area">
          <span className="logo-icon">
            <FaTelegramPlane />
          </span>
          <span className="logo-text">
            Tele<span>gram</span>
          </span>
        </a>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a href="#">
              <FaHome /> Home
            </a>
          </li>
          <li>
            <a href="#">
              <FaNewspaper /> Blog
            </a>
          </li>
          <li>
            <a href="#">
              <FaMobileAlt /> Apps
            </a>
          </li>
          <li>
            <a href="#">
              <FaCode /> API
            </a>
          </li>
          <li>
            <a href="#">
              <FaPaperPlane /> Channel
            </a>
          </li>
          <li>
            <a href="#">
              <FaSearch />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};