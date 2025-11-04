import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
import Category from "./Category/Category";
import SampleRecipe from "../SampleRecipe/SampleRecipe";
import Footer from "../Footer/Footer";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div>
      
      <Navbar onLogout={() => setIsAuthenticated(false)} />

      
      <Header />

      
      {isAuthenticated && (
        <>
          <div data-aos="fade-up" data-aos-anchor-placement="center-center">
            <Category />
          </div>

          <div data-aos="fade-up" data-aos-offset="300" data-aos-easing="ease-in-sine">
            <SampleRecipe />
          </div>

          <div data-aos="fade-up" data-aos-offset="300" data-aos-anchor-placement="center-center">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
