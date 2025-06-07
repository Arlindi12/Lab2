import React, { useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import { FaBook, FaUsers, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGetStarted = () => {
    navigate("/Contact");
  };
  return (
    <div className="home">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to LibraryManager</h1>
          <p>Your complete solution for managing books, users, and borrowings.</p>
          <button className="btn-cta" onClick={scrollToFeatures}>
            Start Exploring
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="container">
          <h2>About LibraryManager</h2>
          <p>
            LibraryManager is a modern and user-friendly system designed to streamline all your
            library operations. Whether you're tracking books, managing readers, or reviewing
            borrowing history, we've got you covered.
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section" ref={featuresRef}>
        <div className="container">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-box">
              <FaBook className="icon" />
              <h3>Book Catalog</h3>
              <p>Organize and manage your entire book collection with ease.</p>
            </div>
            <div className="feature-box">
              <FaUsers className="icon" />
              <h3>User Profiles</h3>
              <p>Handle librarian and reader accounts with role-based access.</p>
            </div>
            <div className="feature-box">
              <FaCalendarCheck className="icon" />
              <h3>Borrow & Return</h3>
              <p>Track borrowing activity and return deadlines accurately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to digitize your library?</h2>
          <p>Join thousands of users using LibraryManager to manage their libraries efficiently.</p>
          <button className="btn-cta" onClick={handleGetStarted}>
            Get Started Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
