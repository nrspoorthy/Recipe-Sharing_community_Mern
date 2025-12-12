import express from "express";
import Category from "../models/Category.js";
import Meal from "../models/Meal.js";

const router = express.Router();


let cachedCategories = null;
let lastCategoryFetch = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes


router.get("/", async (req, res) => {
  try {
    const now = Date.now();


    if (cachedCategories && now - lastCategoryFetch < CACHE_DURATION) {
      return res.json({ categories: cachedCategories, cached: true });
    }

    const categories = await Category.find().lean();

    cachedCategories = categories;
    lastCategoryFetch = now;

    res.json({ categories, cached: false });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
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


    cachedCategories = null;

    res.status(201).json({ message: "Category added successfully", newCategory });
  } catch (error) {
    console.error("Error inserting category:", error);
    res.status(400).json({ message: "Error inserting category", error });
  }
});

router.get("/meals/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const meals = await Meal.find({ strCategory: category })
      .lean()
      .limit(300); // Prevent huge payloads

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


    await Meal.insertMany(meals, { ordered: false });

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
