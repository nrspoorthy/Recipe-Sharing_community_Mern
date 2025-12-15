import express from "express";
import upload from "../middleware/upload.js";
import Recipe from "../models/Recipe.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, ingredients } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const recipe = new Recipe({
      name,
      description,
      ingredients,
      image: `/uploads/${req.file.filename}`,
    });

    await recipe.save();
    res.status(201).json(recipe);

  } catch (error) {
    console.error("UPLOAD ERROR 👉", error); // ⭐ ADD THIS
    res.status(500).json({ message: "Recipe upload failed" });
  }
});

router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

export default router; 
