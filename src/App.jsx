import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./frontend/components/Home/Home";
import CategoryDetail from "./frontend/components/CategoryDetail/CategoryDetail";
import Menu from "./frontend/components/MenuCard/Menu";
import RecipeDetails from "./frontend/components/RecipeDetails/RecipeDetails";
import Mylist from "./frontend/components/Mylist/Mylist";
import ProtectedRoute from "./frontend/components/ProtectedRoute/ProtectedRoute";


import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Gallery from './frontend/components/Gallery/Gallery';
import About from './frontend/components/About/About';

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
        
        
        
        <Route path="/" element={<Home />} />
        


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
  )
}

export default App
