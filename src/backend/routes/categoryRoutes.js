import express from "express";
import Category from "../models/Category.js";
import Meal from "../models/Meal.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories", error });
  }
});


router.post("/", async (req, res) => {
  try {
    const { idCategory, strCategory, strCategoryThumb, strCategoryDescription } = req.body;
    const newCategory = new Category({
      idCategory,
      strCategory,
      strCategoryThumb,
      strCategoryDescription,
    });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully", newCategory });
  } catch (error) {
    console.error("Error inserting category:", error);
    res.status(400).json({ message: "Error inserting category", error });
  }
});


router.get("/meals/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const meals = await Meal.find({ strCategory: category });

    if (!meals.length) {
      return res.status(404).json({ message: "No meals found for this category." });
    }

    res.json({ meals });
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/addMealsBulk", async (req, res) => {
  try {
    const { meals } = req.body;

    if (!Array.isArray(meals)) {
      return res.status(400).json({ message: "Expected an array of meals" });
    }

    await Meal.insertMany(meals);
    res.status(201).json({ message: "Meals added successfully" });
  } catch (error) {
    console.error("Error inserting meals:", error);
    res.status(400).json({ message: "Error inserting meals", error });
  }
});

router.delete("/deleteAllMeals", async (req, res) => {
  try {
    await Meal.deleteMany({});
    res.json({ message: "All meals deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting meals", error });
  }
});


export default router;
