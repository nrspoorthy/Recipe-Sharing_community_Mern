import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Category.css";
// import { BASE_URL } from "../../../config";


function Category() {
  const [Category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
console.log(import.meta.env.VITE_API_URL);
  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
        const data = await response.json();
        console.log("Fetched categories:", data);
        setCategory(data.categories || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchcategory();
  }, []);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 480);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

if (loading) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}


  const visibleCategories = isMobile ? Category.slice(0, 6) : Category;

  return (
    <>
      <h1 className='h1'>Our Menu</h1>

      <div className='categoryimgs'>
        {visibleCategories.map((cat) => (
          <Link key={cat.idCategory} to={`/categories/${cat.strCategory}`}>
            <div>
              <img src={cat.strCategoryThumb} alt={cat.strCategory} />
            </div>
            <h3>{cat.strCategory}</h3>
          </Link>
        ))}
      </div>

      {/* View More Button (only in mobile view) */}
      {isMobile && (
        <div className="view-more-btn">
          <button onClick={() => navigate('/menu')}>View More</button>
        </div>
      )}

      <img
        src="https://foodily.vercel.app/assets/images/background/pattern-1.png"
        alt="background pattern"
      />
    </>
  );
}

export default Category;
