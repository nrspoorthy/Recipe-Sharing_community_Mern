import React from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <section className="header-section">
      <div className="header-left" data-aos="fade-right">
        <h1 className="title-1">Healthy Smoothie</h1>
        <p className="subtitle">
          Discover delicious meals, explore every cuisine, and find inspiration in every swipe.
        A beautiful community-driven recipe app made for food lovers.
        </p>

      <Link> 
        <button
          className="buy-btn"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          Get Started
        </button>
      </Link> 
        <img
          src="https://foodily.vercel.app/assets/images/main-slider/icon-2.png"
          alt="Strawberry"
          className="icon-2"
          data-aos="fade-up"
          data-aos-delay="300"
        />
      </div>

      <div className="header-right">
        <img
          src="https://foodily.vercel.app/assets/images/main-slider/content-image-1.png"
          alt="Smoothie"
          className="main-img"
          data-aos="fade-up"
          data-aos-delay="200"
        />
        <img
          src="https://foodily.vercel.app/assets/images/main-slider/icon-1.png"
          alt="Leaf"
          className="icon-1"
          data-aos="fade-left"
          data-aos-delay="600"
        />
      </div>
      <img src="https://foodily.vercel.app/assets/images/main-slider/pattern-1.png" />
    </section>
  );
}
