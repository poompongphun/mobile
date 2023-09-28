import { MEALS } from "../../data/dummy-data";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case "TOGGLE_FAVORITE":
        const existingIndex = state.favoriteMeals.findIndex(
            (meal) => meal.id === action.mealId
        );
        if (existingIndex >= 0) {
            const updatedFavMeals = [...state.favoriteMeals];
            updatedFavMeals.splice(existingIndex, 1);
            return { ...state, favoriteMeals: updatedFavMeals };
        } else {
            const meal = state.meals.find((meal) => meal.id === action.mealId);
            return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
        }
  }
};

export default mealsReducer;
