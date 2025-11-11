import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import { removeFavorite } from "../../redux/favoritesSlice";
import "./Mylist.css";

export default function Mylist() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleRemove = (idMeal) => {
    dispatch(removeFavorite(idMeal));
  };

  return (
    <>
      <Navbar />
      <div className="mylist-container">
        <h1>My List</h1>

        {favorites.length === 0 ? (
          <p>No items in your list yet.</p>
        ) : (
          <div className="mylist-grid" data-aos="fade-up">
            {favorites.map((item) => (
              <div key={item.idMeal} className="mylist-card">
                <div className="image-wrapper">
                  <img
                    className="mylist-card-img"
                    src={item.strMealThumb}
                    alt={item.strMeal}
                  />
                </div>
                <h3 className="mylist-card-title">{item.strMeal}</h3>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.idMeal)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
