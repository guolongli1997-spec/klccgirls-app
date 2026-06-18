import React from 'react';
import {
  FaBuilding,
  FaLink,
  FaPhone,
  FaShareAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTelegramPlane,
  FaGithub,
  FaHashtag,
  FaHeart,
  FaChevronRight,
} from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>
            <FaBuilding style={{ color: '#0088cc', marginRight: '8px' }} /> Company
          </h4>
          <p>Telegram FZ-LLC</p>
          <p>Dubai, UAE</p>
          <p>&copy; 2026 Telegram</p>
        </div>

        <div className="footer-col">
          <h4>
            <FaLink style={{ color: '#0088cc', marginRight: '8px' }} /> Quick Links
          </h4>
          <a href="#">
            <FaChevronRight style={{ fontSize: '0.6rem', marginRight: '6px' }} /> About Us
          </a>
          <a href="#">
            <FaChevronRight style={{ fontSize: '0.6rem', marginRight: '6px' }} /> Blog
          </a>
          <a href="#">
            <FaChevronRight style={{ fontSize: '0.6rem', marginRight: '6px' }} /> API Docs
          </a>
          <a href="#">
            <FaChevronRight style={{ fontSize: '0.6rem', marginRight: '6px' }} /> Telegram Channel
          </a>
        </div>

        <div className="footer-col">
          <h4>
            <FaPhone style={{ color: '#0088cc', marginRight: '8px' }} /> Contact
          </h4>
          <p>
            <FaEnvelope style={{ width: '20px' }} /> support@telegram.org
          </p>
          <p>
            <FaPhoneAlt style={{ width: '20px' }} /> +1 (800) 555-0199
          </p>
          <p>
            <FaMapMarkerAlt style={{ width: '20px' }} /> Dubai, UAE
          </p>
        </div>

        <div className="footer-col">
          <h4>
            <FaShareAlt style={{ color: '#0088cc', marginRight: '8px' }} /> Social
          </h4>
          <div className="social-links">
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="#" aria-label="Telegram">
              <FaTelegramPlane />
            </a>
            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
          <p style={{ marginTop: '14px' }}>
            <FaHashtag style={{ color: '#0088cc' }} /> #TelegramMiniApps
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Built with <FaHeart style={{ color: '#d32f2f' }} /> for the Telegram community. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};