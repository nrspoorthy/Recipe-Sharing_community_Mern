import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  strMeal: { type: String, required: true },
  strMealThumb: { type: String, required: true },
  idMeal: { type: String, required: true },
  strCategory: { type: String, required: true },
});

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;
