import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick"; 
import "./CategoryDetail.css"
import "./CategoryDetail.css";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function CategoryDetail() {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch(
         `http://localhost:3000/api/categories/meals/${categoryName}`
        );
        const data = await response.json();
        console.log(data);
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryDetails();
  }, [categoryName]);

  const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  rows: meals.length <= 4 ? 1 : 2, 
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        rows: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        rows: 1
      }
    }
  ]
};


  if (loading) {
    return <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>;
  }

  return (
    <>
      <Navbar />
      <div className="category-detail">
        <h1 className="categoryheading">{categoryName} Meals</h1>
        {meals.length === 0 ? (
          <p>No meals found for this category.</p>
        ) : (
          <Slider {...sliderSettings}>
            {meals.map((meal, index) => (
              <div key={meal.idMeal} className="meal-slide" data-aos="fade-up" data-aos-delay={index * 100}>
                <Link to={`/recipe/${meal.idMeal}`}>
                  <div className="meal-card">
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <h3>{meal.strMeal}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>

        )}
      </div>
      <Footer />
    </>
  );
}
