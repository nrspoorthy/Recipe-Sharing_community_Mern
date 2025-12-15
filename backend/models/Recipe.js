import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    ingredients: String,
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
