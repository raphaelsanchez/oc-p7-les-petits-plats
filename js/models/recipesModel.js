export default class RecipesModel {
  constructor(recipesData) {
    this.recipes = recipesData
    this.filteredRecipes = recipesData
    this.searchTerm = ""

    // Get all filters
    this.ingredients = []
    this.ustensils = []
    this.appliances = []
  }

  // Init recipes model
  init() {
    this.recipes = recipesData
    this.fileredRecipes = recipesData
    this.searchTerm = ""
  }

  // Get all recipes
  getAllRecipes() {
    return this.recipes
  }

  // Get filtered recipes
  getFilteredRecipes() {
    return this.filteredRecipes
  }

  // Get ingredients list from all recipes
  getIngredients() {
    return this.ingredients
  }

  // Get ingredients list from all recipes
  getUstensils() {
    return this.ustensils
  }

  // Get appliances list from all recipes
  getAppliances() {
    return this.appliances
  }

  // Get search term
  getSearchTerm() {
    return this.searchTerm
  }

  // Set filter recipes
  setFilteredRecipes(filteredRecipes) {
    this.filteredRecipes = filteredRecipes
  }

  // Set ingredients list for all recipes
  setIngredients(ingredients) {
    this.ingredients = ingredients
  }

  // Set ustensils list for all recipes
  setSearchTerm(searchTerm) {
    this.searchTerm = searchTerm
  }

  // Set appliances list for all recipes
  setFilter(filterType, filterValue) {
    this.filters[filterType] = filterValue
  }
}
