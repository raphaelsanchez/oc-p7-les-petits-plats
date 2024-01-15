import { normalizeString } from "../utils"

export default class RecipeModel {
  constructor(recipeData) {
    if (!Array.isArray(recipeData)) {
      throw new TypeError("Expected recipeData to be an array")
    }
    this.allRecipes = recipeData
    this.activeFilters = []
  }

  getAllRecipes() {
    return this.allRecipes
  }

  findRecipesBySearchTerm(searchTerm) {
    const normalizedSearchTerms = normalizeString(searchTerm).split(" ")
    return this.allRecipes.filter((recipe) =>
      this.isRecipeMatchingSearchTerms(recipe, normalizedSearchTerms)
    )
  }

  isRecipeMatchingSearchTerms(recipe, searchTerms) {
    function isTermIncludedInString(mainString, term) {
      return normalizeString(mainString).includes(term)
    }

    const isTermIncludedInRecipe = (recipe, term) => {
      return (
        isTermIncludedInString(recipe.name, term) ||
        isTermIncludedInString(recipe.description, term) ||
        isTermIncludedInString(recipe.appliance, term) ||
        recipe.ingredients.some((ingredient) =>
          isTermIncludedInString(ingredient.ingredient, term)
        ) ||
        recipe.ustensils.some((utensil) =>
          isTermIncludedInString(utensil, term)
        )
      )
    }

    return searchTerms.every((term) => isTermIncludedInRecipe(recipe, term))
  }
}
