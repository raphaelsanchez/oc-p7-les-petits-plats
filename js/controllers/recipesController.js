export default class RecipesController {
  constructor(recipesModel, recipesView) {
    this.recipesModel = recipesModel
    this.recipesView = recipesView
    this.recipesView.bindSearchInputEvent(this.handleSearchInputEvent)
  }

  // Initialize the controller
  init() {
    this.recipesModel.init()
    this.refreshIngredientsList()
  }

  // Render the initial list of recipes
  handleInitialRecipesList() {
    const recipes = this.recipesModel.getAllRecipes()
    this.recipesView.renderRecipes(recipes)
  }

  // Update the search term and refresh the list of recipes
  handleSearchInputEvent = (searchTerm) => {
    this.recipesModel.setSearchTerm(searchTerm)
    this.refreshFilteredRecipesList()
  }

  // Update the filter and refresh the list of recipes
  handleFilterEvent = (filterType, filterValue) => {
    this.recipesModel.setFilter(filterType, filterValue)
    this.refreshFilteredRecipesList()
  }

  // Refresh the list of recipes based on the current search term and filters
  refreshFilteredRecipesList = () => {
    const recipes = this.recipesModel.getAllRecipes()
    const searchTerm = this.recipesModel.getSearchTerm()

    if (searchTerm === "" || searchTerm.length < 3) {
      this.recipesView.renderRecipes(recipes)
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
    this.recipesView.renderRecipes(filteredRecipes)
  }

  // Refresh the list of ingredients based on the current list of recipes
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
