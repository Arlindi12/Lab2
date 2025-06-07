import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const userNavItems = [
    { path: '/Home', label: 'Home' },
    { path: '/Kategorite', label: 'Kategorite' },
    { path: '/Huazimet', label: 'Huazimet' },
    { path: '/Librat', label: 'Librat' },
    { path: '/Contact', label: 'Contact' },
  ];

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <FooterCompanyInfo />
          <FooterQuickLinks userNavItems={userNavItems} />
          <FooterContact />
          <FooterSocial />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};

const FooterCompanyInfo = () => (
  <div className="footer-column">
    <h2 className="footer-heading">LibraryManager</h2>
    <p className="footer-description">Manage your library efficiently with smart tools and solutions.</p>
    <h4 className="footer-subscribe-title">Subscribe</h4>
    <form className="subscribe-form">
      <input type="email" placeholder="Enter your email" className="form-control" />
      <button type="submit" className="btn-subscribe">Subscribe</button>
    </form>
  </div>
);

const FooterQuickLinks = ({ userNavItems }) => (
  <div className="footer-column">
    <h4 className="footer-heading">Quick Links</h4>
    <ul className="footer-links">
      {userNavItems.map((item, index) => (
        <li key={index}>
          <a href={item.path}>{item.label}</a>
        </li>
      ))}
    </ul>
  </div>
);

const FooterContact = () => (
  <div className="footer-column">
    <h4 className="footer-heading">Contact</h4>
    <p>Email: info@librarymanager.com</p>
    <p>Phone: +383 49 123 456</p>
    <p>Address: Prishtina, Kosova</p>
  </div>
);

const FooterSocial = () => (
  <div className="footer-column">
    <h4 className="footer-heading">Follow Us</h4>
    <div className="social-icons">
      <a href="#"><FaFacebookF /></a>
      <a href="#"><FaTwitter /></a>
      <a href="#"><FaLinkedinIn /></a>
    </div>
  </div>
);

const FooterBottom = () => (
  <div className="footer-bottom">
    <p>&copy; {new Date().getFullYear()} LibraryManager. All rights reserved.</p>
    <div className="footer-privacy">
      <a href="/privacy-policy">Privacy</a>
      <span>|</span>
      <a href="/terms-and-conditions">Terms & Conditions</a>
    </div>
  </div>
);

export default Footer;
