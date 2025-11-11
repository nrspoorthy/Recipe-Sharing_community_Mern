import React from 'react';
import './SampleRecipe.css';
import { useNavigate } from 'react-router-dom';

export default function SampleRecipe() {
  const navigate = useNavigate();

  function handleclick() {
    navigate("/menu");
  }

  return (
    <div className="recipe-container">
      {/* Decorative Icons */}
      <img
        src="https://foodily.vercel.app/assets/images/icons/icon-1.png"
        alt="decor icon"
        className="decor decor-left"
      />
      <img
        src="https://foodily.vercel.app/assets/images/icons/icon-1.png"
        alt="decor icon"
        className="decor decor-right"
      />

      {/* Title */}
      <h1 className="title">Best for you</h1>
      <h2>Detox Smoothie Recipe</h2>

      <img
        src="https://foodily.vercel.app/_next/static/media/separate.5241f059.png"
        className="bgborder"
        alt="border"
      />

      {/* Main Layout */}
      <div className="recipe-wrapper">
        {/* Left side */}
        <div className="left-col">
          <div className="ingredient">
            <div className="circle">
              <img
                src="https://foodily.vercel.app/assets/images/resource/recipe-3.png"
                alt="Cucumber"
              />
            </div>
            <div className="text">
              <h3>Cucumber</h3>
              <p>Us percipit urbanitas referrentur ea. Mei at numquam molestiae</p>
            </div>
          </div>

          <div className="ingredient">
            <div className="circle">
              <img
                src="https://foodily.vercel.app/assets/images/resource/recipe-1.png"
                alt="Apple"
              />
            </div>
            <div className="text">
              <h3>Apple</h3>
              <p>Us percipit urbanitas referrentur ea. Mei at numquam molestiae</p>
            </div>
          </div>
        </div>

        {/* Center bottle */}
        <div className="center-bottle">
          <img
            src="https://foodily.vercel.app/assets/images/resource/recipe.png"
            alt="Bottle"
          />
        </div>

        {/* Right side */}
        <div className="right-col">
          <div className="ingredient">
            <div className="circle">
              <img
                src="https://foodily.vercel.app/assets/images/resource/recipe-4.png"
                alt="Lemon"
              />
            </div>
            <div className="text">
              <h3>Lemon</h3>
              <p>Us percipit urbanitas referrentur ea. Mei at numquam molestiae</p>
            </div>
          </div>

          <div className="ingredient">
            <div className="circle">
              <img
                src="https://foodily.vercel.app/assets/images/resource/recipe-2.png"
                alt="Fresh Water"
              />
            </div>
            <div className="text">
              <h3>Fresh Water</h3>
              <p>Us percipit urbanitas referrentur ea. Mei at numquam molestiae</p>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleclick} className="explore-recipe">
        Explore Recipes
      </button>
    </div>
  );
}
