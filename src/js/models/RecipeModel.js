import { normalizeString } from "../utils/normalizer"

/**
 * Model for the Recipe application.
 */
export default class RecipeModel {
  /**
   * @param {Array} recipeData - The initial set of recipes.
   */
  constructor(recipeData) {
    // recipeData must be an array
    if (!Array.isArray(recipeData)) {
      throw new TypeError("Expected recipeData to be an array")
    }
    this.allRecipes = recipeData
    this.filteredRecipes = [...this.allRecipes]
    this.activeFilters = []
    this.currentSearchInput = ""
  }

  /**
   * Returns the filtered recipes.
   * @returns {Array} The filtered recipes.
   */
  getRecipes() {
    return this.filteredRecipes
  }

  /**
   * Returns all recipes.
   * @returns {Array} All recipes.
   */
  getAllRecipes() {
    return this.allRecipes
  }

  /**
   * Returns the filtered recipes.
   * @returns {Array} The filtered recipes.
   */
  getFilteredRecipes() {
    return this.filteredRecipes
  }

  /**
   * Returns the active filters.
   * @returns {Array} The active filters.
   */
  getActiveFilters() {
    return this.activeFilters
  }

  /**
   * Returns the current search input.
   * @returns {string} The current search input.
   */
  getSearchInput() {
    return this.currentSearchInput
  }

  /**
   * Sets the filtered recipes.
   * @param {Array} recipes - The recipes to set as the filtered recipes.
   */
  setFilteredRecipes(recipes) {
    this.filteredRecipes = recipes.filter((recipe) => {
      return this.isRecipeMatchingActiveFilters(recipe, this.getActiveFilters())
    })
  }

  /**
   * Sets the search input.
   * @param {string} searchInput - The search input to set.
   */
  setSearchInput(searchInput) {
    this.currentSearchInput = searchInput
  }

  /**
   * Sets the active filters.
   * @param {string} filter - The filter to add or remove from the active filters.
   */
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

  /**
   * Removes an active filter.
   * @param {string} filter - The filter to remove from the active filters.
   */
  removeActiveFilter(filter) {
    const filterIndex = this.activeFilters.indexOf(filter)

    if (filterIndex !== -1) {
      this.activeFilters.splice(filterIndex, 1)
    }
  }

  /**
   * Finds recipes by search term.
   * @param {string} searchTerm - The search term to use.
   * @returns {Array} The recipes that match the search term.
   */
  findRecipesBySearchTerm(searchTerm) {
    const normalizedSearchTerms = normalizeString(searchTerm).split(" ")
    return this.filteredRecipes.filter((recipe) =>
      this.isRecipeMatchingSearchTerms(recipe, normalizedSearchTerms)
    )
  }

  /**
   * Finds recipes by active filters.
   * @returns {Array} The recipes that match the active filters.
   */
  findRecipesByActiveFilters() {
    return this.filteredRecipes.filter((recipe) =>
      this.isRecipeMatchingActiveFilters(recipe, this.activeFilters)
    )
  }

  /**
   * Finds recipes by search term and filters.
   * @param {string} searchTerm - The search term to use.
   * @param {Array} filters - The filters to use.
   * @returns {Array} The recipes that match the search term and filters.
   */
  findRecipesBySearchTermAndFilters(searchTerm, filters) {
    searchTerm = searchTerm || ""
    const normalizedSearchTerms = normalizeString(searchTerm).split(" ")
    const recipes = this.allRecipes.filter(
      (recipe) =>
        this.isRecipeMatchingSearchTerms(recipe, normalizedSearchTerms) &&
        this.isRecipeMatchingActiveFilters(recipe, filters)
    )

    return recipes
  }

  /**
   * Checks if a recipe matches search terms.
   * @param {Object} recipe - The recipe to check.
   * @param {Array} searchTerms - The search terms to use.
   * @returns {boolean} Whether the recipe matches the search terms.
   */
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

  /**
   * Checks if a recipe matches active filters.
   * @param {Object} recipe - The recipe to check.
   * @param {Array} filter - The filters to use.
   * @returns {boolean} Whether the recipe matches the filters.
   */
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

  /**
   * Finds filters by recipes.
   * @param {Array} recipes - The recipes to use.
   * @returns {Object} The filters that match the recipes.
   */
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

    // exlude active filters from filters
    const activeFilters = this.getActiveFilters()
    Object.keys(filters).forEach((filterType) => {
      filters[filterType] = [...filters[filterType]].filter(
        (filter) => !activeFilters.includes(filter)
      )
    })

    return filters
  }
}
