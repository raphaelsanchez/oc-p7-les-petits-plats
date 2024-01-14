// Utils import
import { normalizeString } from "../utils"

export default class RecipeModel {
  constructor(data) {
    if (!Array.isArray(data)) {
      throw new TypeError("Expected data to be an array")
    }
    this.recipes = data
    this.activeFilters = []
  }

  // Getters
  getRecipes() {
    // get all recipes
    return this.recipes
  }

  // Get recipes by search string
  getRecipesBySearchString(searchString) {
    const searchStrings = normalizeString(searchString).split(" ")
    return this.recipes.filter((recipe) =>
      this.recipeMatchesSearchString(recipe, searchStrings)
    )
  }

  // Check if a recipe matches a search string
  recipeMatchesSearchString(recipe, searchStrings) {
    // use normalizeString function to improve search
    function includesNormalized(mainString, subString) {
      return normalizeString(mainString).includes(subString)
    }

    return searchStrings.every(
      (searchString) =>
        includesNormalized(recipe.name, searchString) ||
        includesNormalized(recipe.description, searchString) ||
        recipe.ingredients.some((ingredient) =>
          includesNormalized(ingredient.ingredient, searchString)
        ) ||
        includesNormalized(recipe.appliance, searchString) ||
        recipe.ustensils.some((utensil) =>
          includesNormalized(utensil, searchString)
        )
    )
  }
}
