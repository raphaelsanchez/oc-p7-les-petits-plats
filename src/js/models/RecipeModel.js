import { normalizeString } from "../utils/normalizer"

export default class RecipeModel {
  constructor(recipeData) {
    if (!Array.isArray(recipeData)) {
      throw new TypeError("Expected recipeData to be an array")
    }
    this.allRecipes = recipeData
    this.filteredRecipes = []
    this.activeFilters = []
  }

  // Getter methods
  getAllRecipes() {
    return this.allRecipes
  }

  getFilteredRecipes() {
    return this.filteredRecipes
  }

  getActiveFilters() {
    return this.activeFilters
  }

  // Setter methods
  setFilteredRecipes(recipes) {
    this.filteredRecipes = this.allRecipes.filter((recipe) => {
      return this.isRecipeMatchingActiveFilters(recipe, filters)
    })
  }

  setActiveFilters(filter) {
    const filterIndex = this.activeFilters.indexOf(filter)

    if (filterIndex === -1) {
      this.activeFilters.push(filter)
    } else {
      this.activeFilters.splice(filterIndex, 1)
    }

    if (this.activeFilters.length === 0) {
      this.activeFilters = []
    }
  }

  removeActiveFilter(filter) {
    const filterIndex = this.activeFilters.indexOf(filter)

    if (filterIndex !== -1) {
      this.activeFilters.splice(filterIndex, 1)
    }
  }

  // Search methods
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

  // Filter methods
  findRecipesByActiveFilters() {
    return this.allRecipes.filter((recipe) =>
      this.isRecipeMatchingActiveFilters(recipe, this.activeFilters)
    )
  }

  isRecipeMatchingActiveFilters(recipe, filter) {
    const isFilterIncludedInRecipe = (recipe, filter) => {
      return (
        recipe.ingredients.some((ingredient) =>
          normalizeString(ingredient.ingredient).includes(
            normalizeString(filter)
          )
        ) ||
        normalizeString(recipe.appliance).includes(normalizeString(filter)) ||
        recipe.ustensils.some((utensil) =>
          normalizeString(utensil).includes(normalizeString(filter))
        )
      )
    }

    return filter.every((filter) => isFilterIncludedInRecipe(recipe, filter))
  }

  // Method to find filters by recipes
  findFiltersByRecipes(recipes) {
    const filters = {
      ingredients: new Set(),
      appliances: new Set(),
      utensils: new Set(),
    }

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) =>
        filters.ingredients.add(ingredient.ingredient)
      )
      filters.appliances.add(recipe.appliance)
      recipe.ustensils.forEach((utensil) => filters.utensils.add(utensil))
    })

    return filters
  }
}
