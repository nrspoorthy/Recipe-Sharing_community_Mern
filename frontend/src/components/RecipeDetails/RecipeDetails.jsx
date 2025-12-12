import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";
import Footer from "../Footer/Footer";
import Navbar from "../Home/Navbar/Navbar";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/favoritesSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import StarRating from "../StarRating/StarRating";
import Share from "../Share/Share";
import { BASE_URL } from "../../config";

export default function RecipeDetails() {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

 
  const [translatedText, setTranslatedText] = useState("");
  const [translating, setTranslating] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const alreadyFavorite = recipe
    ? favorites.some((item) => item.idMeal === recipe.idMeal)
    : false;

  const handleFavorite = () => {
    if (alreadyFavorite) {
      dispatch(removeFavorite(recipe.idMeal));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        const data = await response.json();
        setRecipe(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(true);
      }
    };
    fetchRecipeDetails();
  }, [idMeal]);

  if (!loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!recipe) {
    return <h1 className="loading">No Recipe Found</h1>;
  }

  // 🌍 Translation Function
  const handleTranslate = async (lang) => {
    setTranslating(true);
    setTranslatedText("");

    try {
      const resp = await fetch(`${BASE_URL}/api/chatbot/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instructions: recipe.strInstructions,
          targetLang: lang,
        }),
      });

      const data = await resp.json();
      setTranslatedText(data.translation || "Translation unavailable.");
    } catch (error) {
      console.log(error);
      setTranslatedText("Error translating text.");
    } finally {
      setTranslating(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="recipe-container">

        <h1 className="recipe-title" data-aos="fade-up">
          <span className="title-main">{recipe.strMeal.split(" ")[0]}</span>{" "}
          <span className="title-highlight">
            {recipe.strMeal.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <StarRating initialRating={0} maxStars={5} />

        <p className="recipe-sub" data-aos="fade-up">
          {recipe.strCategory} • {recipe.strArea}
        </p>

        <img
          src="https://foodily.vercel.app/_next/static/media/separate.5241f059.png"
          className="bgborder"
          alt="divider"
        />

        <div className="recipe-main">
          {/* Left Image Section */}
          <div className="recipe-img" data-aos="fade-right">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />

            <button className="fav-btn" onClick={handleFavorite}>
              {alreadyFavorite ? (
                <FaHeart className="heart filled" />
              ) : (
                <FaRegHeart className="heart" />
              )}
            </button>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Share title={recipe.strMeal} url={window.location.href} />
            </div>
          </div>

          {/* Ingredients */}
          <div className="ingredients-box" data-aos="fade-left">
            <h2>Ingredients</h2>
            <ul>
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];
                return (
                  ingredient && (
                    <li key={i}>
                      <span className="measure">{measure}</span>
                      <span className="ingredient">{ingredient}</span>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>

        {/* Instructions Block */}
        <div className="instructions-box" data-aos="fade-up">
          <h2>Instructions</h2>

          <p>{recipe.strInstructions}</p>

          {/* 🌍 Translation UI */}
          <div className="translate-box">
            <h3>Translate Instructions</h3>

            <select onChange={(e) => handleTranslate(e.target.value)}>
              <option value="">Select Language</option>
              <option value="Hindi">Hindi</option>
              <option value="Telugu">Telugu</option>
              <option value="Tamil">Tamil</option>
              <option value="Kannada">Kannada</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Spanish">Spanish</option>
            </select>

            {translating && (
              <div className="spinner small-spinner"></div>
            )}

            {translatedText && (
              <p className="translated-text">{translatedText}</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
