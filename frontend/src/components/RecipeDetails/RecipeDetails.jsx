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


export default function RecipeDetails() {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

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
    return <h1 className="loading">Loading...</h1>;
  }

  if (!recipe) {
    return <h1 className="loading">No Recipe Found</h1>;
  }

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
          {/* Left side */}
          <div className="recipe-img" data-aos="fade-right">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />

            {/* Favorite button */}
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

          {/* Right side */}
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

        <div className="instructions-box" data-aos="fade-up">
          <h2>Instructions</h2>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
