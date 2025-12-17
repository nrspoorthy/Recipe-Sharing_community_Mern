import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./CategoryDetail.css";
import { BASE_URL } from "../../config";

export default function CategoryDetail() {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch(`${process.env.VITE_API_URL}/api/categories/meals/${categoryName}`);
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [categoryName]);

 
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="category-detail">
        <h1 className="categoryheading">{categoryName} Meals</h1>

        <Swiper
          modules={[Grid, Pagination]}
          pagination={{ clickable: true }}
          grid={{ rows: 2, fill: "row" }}
          spaceBetween={10}
          breakpoints={{
            0: {
              slidesPerView: 2,
              grid: { rows: 2, fill: "row" },
            },
            600: {
              slidesPerView: 4,
              grid: { rows: 2, fill: "row" },
            },
            1024: {
              slidesPerView: 5,
              grid: { rows: 2, fill: "row" },
            },
          }}
        >
          {meals.map((meal) => (
            <SwiperSlide key={meal.idMeal} >
              <div data-aos="fade-up">
              <Link to={`/recipe/${meal.idMeal}`}>
                <div className="meal-card">
                  <img src={meal.strMealThumb} alt={meal.strMeal} />
                  <h3>{meal.strMeal}</h3>
                </div>
              </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Footer />
    </>
  );
}
