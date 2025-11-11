import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./components/Home/Home";
import CategoryDetail from "./components/CategoryDetail/CategoryDetail";
import Menu from "./components/MenuCard/Menu";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import Mylist from "./components/Mylist/Mylist";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Gallery from "./components/Gallery/Gallery";
import About from "./components/About/About";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1300,
      once: true,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/categories/:categoryName"
          element={<ProtectedRoute><CategoryDetail /></ProtectedRoute>}
        />
        <Route
          path="/menu"
          element={<ProtectedRoute><Menu /></ProtectedRoute>}
        />
        <Route
          path="/gallery"
          element={<ProtectedRoute><Gallery /></ProtectedRoute>}
        />
        <Route
          path="/about"
          element={<ProtectedRoute><About /></ProtectedRoute>}
        />
        <Route
          path="/recipe/:idMeal"
          element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>}
        />
        <Route
          path="/mylist"
          element={<ProtectedRoute><Mylist /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
