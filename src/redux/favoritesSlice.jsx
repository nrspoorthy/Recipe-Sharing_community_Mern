import { createSlice } from '@reduxjs/toolkit';


const loadFavorites = () => {
  try {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFavorites(),
  reducers: {
    addFavorite: (state, action) => {
      const recipe = action.payload;
      const exists = state.find((item) => item.idMeal === recipe.idMeal);
      if (!exists) {
        state.push(recipe);
        localStorage.setItem("favorites", JSON.stringify(state));
      }
    },

    removeFavorite: (state, action) => {
      const idMeal = action.payload;
      const updated = state.filter((item) => item.idMeal !== idMeal);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    }
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
