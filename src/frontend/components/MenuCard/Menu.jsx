import React from 'react'
import './Menu.css'
import { useState,useEffect } from 'react'
import Navbar from '../Home/Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'

export default function Menu() {
  const [menu,setMenu] = useState([])
  const [loading,setloading] = useState(false)
  const navigate = useNavigate()
useEffect(()=>{
    const fetchMenuDetails = async() => {
        try{
            const respose = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
            const data = await respose.json()
            setMenu(data.categories)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setloading(true)
        }
        
    }
    fetchMenuDetails()
},[])

if(!loading){
    return <h1>Loading..</h1>
}

    return (
  <>
    <Navbar />
    <div className="menu-section-wrapper">  
      <div className="menu-container">
        <h1 className='title'>Yummy & Tasty</h1>
        <h1 className="menu-title">Available Now</h1>
        <div className="menu-grid" data-aos="fade-up">
          {menu.map((item) => (
            <div className="menu-card" key={item.idCategory}>
              <div className="menu-left">
                <img src={item.strCategoryThumb} alt={item.strCategory} />
                <div className="menu-info">
                  <h3>{item.strCategory}</h3>
                  <p>{item.strCategoryDescription.slice(0, 35)}...</p>
                </div>
              </div>
              <div className="menu-btn">
                <button onClick={() => navigate(`/categories/${item.strCategory}`)}>
                  View Meals
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </>
)

  
}
