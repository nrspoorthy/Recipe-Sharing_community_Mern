import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  idCategory: {
    type: String,
    required: true,
  },
  strCategory: {
    type: String,
    required: true,
  },
  strCategoryThumb: {
    type: String,
    required: true,
  },
  strCategoryDescription: {
    type: String,
    required: true,
  },
});

// 🚀 SPEED BOOST:
// Indexing makes searching & listing categories MUCH faster.
categorySchema.index({ strCategory: 1 }); 
categorySchema.index({ idCategory: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);
export default Category;
