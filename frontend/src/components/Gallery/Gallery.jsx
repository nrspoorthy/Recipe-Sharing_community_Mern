import React, { useState } from "react";
import "./Gallery.css";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Gallery() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null); // For mobile tap overlay
  const [showViewPopup, setShowViewPopup] = useState(false);

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Kiwi Chia Pudding",
      description: "Healthy and refreshing layered pudding.",
      ingredients: "Chia seeds, Kiwi, Milk, Honey",
      image:
        "https://i.pinimg.com/1200x/8d/b5/dd/8db5ddfd1828d38ddbb00a0f628d0b3a.jpg",
    },
    {
      id: 2,
      name: "Fruit Mocktails",
      description: "Vibrant and chilled summer drinks.",
      ingredients: "Mixed fruits, Soda, Lemon, Ice cubes",
      image: "https://foodily.vercel.app/assets/images/gallery/32.jpg",
    },
    {
      id: 3,
      name: "Paneer Butter Masala",
      description: "Rich, creamy and flavorful paneer curry.",
      ingredients: "Paneer, Butter, Cream, Tomatoes, Spices",
      image:
        "https://i.pinimg.com/736x/61/e6/3d/61e63d6a1d196b434eb0441f5b8ec2e6.jpg",
    },
    {
      id: 4,
      name: "Watermelon Drink",
      description: "Cool and sweet watermelon delight.",
      ingredients: "Watermelon, Lemon juice, Mint leaves, Ice cubes",
      image:
        "https://i.pinimg.com/1200x/0c/3a/f6/0c3af6e9b74530b1c426f63764cceca0.jpg",
    },
    {
      id: 5,
      name: "Onam Food",
      description: "Traditional South Indian festive platter.",
      ingredients: "Rice, Sambar, Avial, Papadam, Payasam",
      image:
        "https://i.pinimg.com/1200x/f7/41/5f/f7415f93ecdccc842224b4790f541112.jpg",
    },
    {
      id: 6,
      name: "Samosa",
      description: "Crispy, golden and spicy Indian snack.",
      ingredients: "Potatoes, Peas, Spices, Wheat flour, Oil",
      image:
        "https://i.pinimg.com/1200x/1b/da/ca/1bdaca54b40441bc8a1bccc733e3ca43.jpg",
    },
  ]);

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    image: "",
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewRecipe({ ...newRecipe, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newRecipe.name || !newRecipe.image) {
      alert("Please fill all required fields!");
      return;
    }
    setRecipes([...recipes, { id: recipes.length + 1, ...newRecipe }]);
    setNewRecipe({ name: "", description: "", ingredients: "", image: "" });
    setShowPopup(false);
  };

  const handleShare = (item) => {
    const shareData = {
      title: item.name,
      text: `Check out this recipe: ${item.name}`,
      url: item.image,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error("Share failed:", err));
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `Check out this recipe: ${item.name} - ${item.image}`
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleViewProcedure = (recipe) => {
    setSelectedRecipe(recipe);
    setShowViewPopup(true);
  };

  return (
    <>
      <Navbar />

      <section className="about-section" data-aos="fade-up" data-aos-offset="200">
        <div className="about-header">
          <h1>Recipe Gallery</h1>
          <p>
            <a href="/">Home</a> : Recipe Gallery
          </p>
        </div>
      </section>

      <div className="gallery-container" data-aos="fade-up" data-aos-offset="400">
        <div className="gallery-header">
          <h2>Explore Delicious Recipes</h2>
          <button className="add-btn" onClick={() => setShowPopup(true)} title="Add Recipe">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="add-icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        <div className="gallery-grid">
          {recipes.map((item, index) => (
            <div
              key={item.id}
              className="gallery-item"
              onClick={() =>
                window.innerWidth <= 768
                  ? setActiveIndex(activeIndex === index ? null : index)
                  : null
              }
            >
              <img src={item.image} alt={item.name} />
              <div className={`overlay ${activeIndex === index ? "show" : ""}`}>
                <h3>{item.name}</h3>
                <div className="overlay-btns">
                  <button className="view-btn" onClick={() => handleViewProcedure(item)}>
                    Explore
                  </button>
                  <button className="share-btn" onClick={() => handleShare(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="share-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Recipe Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-form">
              <h3>Add Your Recipe</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Recipe Name"
                  value={newRecipe.name}
                  onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={newRecipe.description}
                  onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
                ></textarea>
                <textarea
                  placeholder="Ingredients (comma separated)"
                  value={newRecipe.ingredients}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, ingredients: e.target.value })
                  }
                ></textarea>

                <input
                  type="text"
                  placeholder="Enter Image URL"
                  value={newRecipe.image}
                  onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
                />
                <p style={{ textAlign: "center", margin: "8px 0" }}>or</p>
                <input type="file" onChange={handleFileUpload} />

                <button type="submit">Add Recipe</button>
                <button type="button" className="cancel-btn" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* View Recipe Popup */}
        {showViewPopup && selectedRecipe && (
          <div className="popup-overlay">
            <div className="popup-form view-popup">
              <img src={selectedRecipe.image} alt={selectedRecipe.name} className="view-img" />
              <h2>{selectedRecipe.name}</h2>
              <p className="desc"><b>Description:</b> {selectedRecipe.description}</p>
              <p className="ing"><b>Ingredients:</b> {selectedRecipe.ingredients}</p>
              <button className="cancel-btn" onClick={() => setShowViewPopup(false)}>
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
