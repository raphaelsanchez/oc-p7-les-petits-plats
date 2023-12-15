const MIN_SEARCH_TERM_LENGTH = 3

export default class RecipesController {
  // create a private property to store the ingredients and avoid mutability
  #ingredients = new Set()

  // Initialize the controller with the model and the view
  constructor(recipesModel, recipesView) {
    this.recipesModel = recipesModel
    this.recipesView = recipesView
    this.recipesView.bindSearchInputChangeEvent(this.updateSearchTermAndRefresh)
    this.recipesView.bindSearchFormSubmitEvent(this.updateSearchTermAndRefresh)
  }

  // Initialize the controller and refresh the ingredients list
  initializeController() {
    this.recipesModel.init()
    this.#refreshIngredientsList()
  }

  // Render the initial list of recipes from the model
  renderInitialRecipesList() {
    const recipes = this.recipesModel.getAllRecipes()
    this.recipesView.renderRecipesList(recipes)
  }

  // Update the search term in the model and refresh the list of recipes
  updateSearchTermAndRefresh = (searchTerm) => {
    this.recipesModel.setSearchTerm(searchTerm)
    this.updateAndRenderFilteredRecipes()
  }

  // Update the filter in the model and refresh the list of recipes
  updateFilterAndRefresh = (filterType, filterValue) => {
    this.recipesModel.setFilter(filterType, filterValue)
    this.updateAndRenderFilteredRecipes()
  }

  // Normalize and lowercase a string
  #normalizeAndLowercase = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
  }

  // Filter the recipes based on the search term
  #filterRecipes = (recipes, searchTerm) => {
    // Normalize and lowercase the search term
    const normalizedSearchTerm = this.#normalizeAndLowercase(searchTerm)

    return recipes.filter((recipe) => {
      // Normalize and lowercase all the recipe data
      const recipeName = this.#normalizeAndLowercase(recipe.name)
      const recipeDescription = this.#normalizeAndLowercase(recipe.description)
      const recipeIngredients = recipe.ingredients.map((ingredient) =>
        this.#normalizeAndLowercase(ingredient.ingredient),
      )
      const recipeUstensils = recipe.ustensils.map((ustensil) => this.#normalizeAndLowercase(ustensil))
      const recipeAppliances = this.#normalizeAndLowercase(recipe.appliance)

      // Return true if the recipe matches the search term
      return (
        recipeName.includes(normalizedSearchTerm) ||
        recipeDescription.includes(normalizedSearchTerm) ||
        recipeIngredients.includes(normalizedSearchTerm) ||
        recipeUstensils.includes(normalizedSearchTerm) ||
        recipeAppliances.includes(normalizedSearchTerm)
      )
    })
  }

  // Refresh the list of ingredients in the model based on the current list of recipes
  #refreshIngredientsList = () => {
    for (const recipe of this.recipesModel.filteredRecipes) {
      for (const ingredient of recipe.ingredients) {
        this.#ingredients.add(ingredient.ingredient)
      }
    }
    // Convert the Set to an array
    this.recipesModel.setIngredients(ingredients)
  }

  // Refresh the list of recipes based on the current search term and filters in the model
  updateAndRenderFilteredRecipes = () => {
    const recipes = this.recipesModel.getAllRecipes()
    const searchTerm = this.recipesModel.getSearchTerm()
    // If the search term is empty or too short, display the full list of recipes
    if (searchTerm === "" || searchTerm.length < MIN_SEARCH_TERM_LENGTH) {
      this.recipesView.renderRecipesList(recipes)
      return
    }
    // Filter the recipes based on the search term
    const filteredRecipes = this.#filterRecipes(recipes, searchTerm)
    // Update the list of ingredients in the model
    this.recipesModel.setFilteredRecipes(filteredRecipes)
    // Refresh the list of ingredients in the model
    this.recipesView.renderRecipesList(filteredRecipes)
  }
}
