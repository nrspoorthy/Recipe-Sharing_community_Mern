import React, { useEffect, useState } from "react";
import "./Gallery.css";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
// import { BASE_URL } from "../../config";



export default function Gallery() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);


  const staticRecipes = [
    {
      _id: "s1",
      name: "Kiwi Chia Pudding",
      description: "Healthy and refreshing layered pudding.",
      ingredients: "Chia seeds, Kiwi, Milk, Honey",
      image:
        "https://i.pinimg.com/1200x/8d/b5/dd/8db5ddfd1828d38ddbb00a0f628d0b3a.jpg",
    },
    {
      _id: "s2",
      name: "Fruit Mocktails",
      description: "Vibrant and chilled summer drinks.",
      ingredients: "Mixed fruits, Soda, Lemon, Ice cubes",
      image: "https://foodily.vercel.app/assets/images/gallery/32.jpg",
    },
    {
      _id: "s3",
      name: "Paneer Butter Masala",
      description: "Rich, creamy and flavorful paneer curry.",
      ingredients: "Paneer, Butter, Cream, Tomatoes, Spices",
      image:
        "https://i.pinimg.com/736x/61/e6/3d/61e63d6a1d196b434eb0441f5b8ec2e6.jpg",
    },
  ];

  const [recipes, setRecipes] = useState(staticRecipes);

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    image: null,
  });

  // 🔹 FETCH BACKEND RECIPES & MERGE
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recipes`)
      .then((res) => res.json())
      .then((data) => setRecipes([...data, ...staticRecipes]))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 FILE UPLOAD
  const handleFileUpload = (e) => {
    setNewRecipe({ ...newRecipe, image: e.target.files[0] });
  };

  // 🔹 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newRecipe.name || !newRecipe.image) {
      alert("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newRecipe.name);
    formData.append("description", newRecipe.description);
    formData.append("ingredients", newRecipe.ingredients);
    formData.append("image", newRecipe.image);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes`, {
      method: "POST",
      body: formData,
    });

    const saved = await res.json();
    setRecipes([saved, ...recipes]);
    setShowPopup(false);

    setNewRecipe({
      name: "",
      description: "",
      ingredients: "",
      image: null,
    });
  };

  // 🔹 SHARE
  const handleShare = (item) => {
    const link = item.image.startsWith("http")
      ? item.image
      : `${import.meta.env.VITE_API_URL}${item.image}`;

    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `Check out this recipe: ${item.name} - ${link}`
      )}`,
      "_blank"
    );
  };

  return (
    <>
      <Navbar />

      
      <section className="about-section">
        <div className="about-header">
          <h1>Recipe Gallery</h1>
          <p>
            <a href="/">Home</a> : Recipe Gallery
          </p>
        </div>
      </section>

      <div className="gallery-container">
        <div className="gallery-header">
          
          <button className="add-btn" onClick={() => setShowPopup(true)}>
            +
          </button>
        </div>

        <div className="gallery-grid">
          {recipes.map((item, index) => {
            const imgSrc = item.image.startsWith("http")
              ? item.image
              : `${import.meta.env.VITE_API_URL}${item.image}`;

            return (
              <div
                key={item._id}
                className="gallery-item"
                onClick={() =>
                  window.innerWidth <= 768
                    ? setActiveIndex(activeIndex === index ? null : index)
                    : null
                }
              >
                <img src={imgSrc} alt={item.name} />

                <div className={`overlay ${activeIndex === index ? "show" : ""}`}>
                  <h3>{item.name}</h3>
                  <div className="overlay-btns">
                    <button
                      className="view-btn"
                      onClick={() => {
                        setSelectedRecipe({ ...item, image: imgSrc });
                        setShowViewPopup(true);
                      }}
                    >
                      Explore
                    </button>
                    <button
                      className="share-btn"
                      onClick={() => handleShare(item)}
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-form">
              <h3>Add Your Recipe</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Recipe Name"
                  value={newRecipe.name}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, name: e.target.value })
                  }
                  required
                />
                <textarea
                  placeholder="Short Description"
                  value={newRecipe.description}
                  onChange={(e) =>
                    setNewRecipe({
                      ...newRecipe,
                      description: e.target.value,
                    })
                  }
                />
                <textarea
                  placeholder="Ingredients (comma separated)"
                  value={newRecipe.ingredients}
                  onChange={(e) =>
                    setNewRecipe({
                      ...newRecipe,
                      ingredients: e.target.value,
                    })
                  }
                />
                <input type="file" onChange={handleFileUpload} required />

                <div className="form-actions">
                  <button type="submit">Add Recipe</button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        
        {showViewPopup && selectedRecipe && (
          <div className="popup-overlay">
            <div className="popup-form view-popup">
              <img src={selectedRecipe.image} alt={selectedRecipe.name} />
              <h2>{selectedRecipe.name}</h2>
              <p>
                <b>Description:</b> {selectedRecipe.description}
              </p>
              <p>
                <b>Ingredients:</b> {selectedRecipe.ingredients}
              </p>
              <button
                className="cancel-btn"
                onClick={() => setShowViewPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
