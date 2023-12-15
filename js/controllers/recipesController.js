export default class RecipesController {
  constructor(recipesModel, recipesView) {
    this.recipesModel = recipesModel
    this.recipesView = recipesView
    this.recipesView.bindSearchInputChangeEvent(this.updateSearchTermAndRefresh)
  }

  // Initialize the controller and refresh the ingredients list
  initializeController() {
    this.recipesModel.init()
    this.refreshIngredientsList()
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

  // Refresh the list of recipes based on the current search term and filters in the model
  updateAndRenderFilteredRecipes = () => {
    const recipes = this.recipesModel.getAllRecipes()
    const searchTerm = this.recipesModel.getSearchTerm()

    if (searchTerm === "" || searchTerm.length < 3) {
      this.recipesView.renderRecipesList(recipes)
      return
    }

    const filteredRecipes = recipes.filter((recipe) => {
      const recipeName = recipe.name.toLowerCase()
      const recipeDescription = recipe.description.toLowerCase()
      const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase())
      const recipeUstensils = recipe.ustensils.map((ustensil) => ustensil.toLowerCase())
      const recipeAppliances = recipe.appliance.toLowerCase()

      return (
        recipeName.includes(searchTerm.toLowerCase()) ||
        recipeDescription.includes(searchTerm.toLowerCase()) ||
        recipeIngredients.includes(searchTerm.toLowerCase()) ||
        recipeUstensils.includes(searchTerm.toLowerCase()) ||
        recipeAppliances.includes(searchTerm.toLowerCase())
      )
    })

    this.recipesModel.setFilteredRecipes(filteredRecipes)
    this.recipesView.renderRecipesList(filteredRecipes)
  }

  // Refresh the list of ingredients in the model based on the current list of recipes
  refreshIngredientsList = () => {
    const ingredients = new Set()
    for (const recipe of this.recipesModel.filteredRecipes) {
      for (const ingredient of recipe.ingredients) {
        ingredients.add(ingredient.ingredient)
      }
    }
    this.recipesModel.setIngredients(ingredients)
  }
}
