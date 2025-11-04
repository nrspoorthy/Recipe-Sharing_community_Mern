import React from "react";
import "./About.css";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function About() {
  return (
    <>
    <Navbar/>
      {/* Top Banner */}
      <section className="about-section" data-aos="fade-up" data-aos-offset="200">
        <div className="about-header">
          <h1>About Us</h1>
          <p>
            <a href="/">Home</a> : About Us
          </p>
        </div>
      </section>
      

      {/* About Content Section */}
      <section className="about-content">
        <div className="about-container">
          <div className="about-image-wrapper">
            <img
              src="https://i.pinimg.com/736x/d8/76/85/d8768525cbe4a5131cd77bf0b11065b2.jpg"
              alt="Chef Cooking"
              className="main-chef-img"
            />
            
          </div>

          <div className="about-text">
            <h5>Our Vision And Story</h5>
            <h2>
              A Recipe Sharing <br /> <span>Community</span>
            </h2>
            <p>
              Welcome to <strong>Recipe Sharing Community</strong> — a platform
              designed for passionate cooks, food lovers, and creative chefs who
              believe that food connects people. Our mission is to bring
              together individuals from all over to share their favorite
              recipes, explore new dishes, and inspire each other through the
              art of cooking.
            </p>
            <p>
              Whether you’re a home cook or a professional chef, our community
              gives you the space to post recipes, upload food photos, and
              interact with others. Together, we aim to make discovering and
              sharing recipes an easy, fun, and inspiring experience.
            </p>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
