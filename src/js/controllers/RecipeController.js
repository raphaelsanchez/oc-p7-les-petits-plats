export default class RecipeController {
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  initialize() {
    this.renderAllRecipes()
    this.bindSearchInputEvent()
  }

  handleUserInput = (inputValue) => {
    const recipes = this.getRecipesBasedOnInput(inputValue)
    this.updateAndRenderRecipes(recipes)
  }

  getRecipesBasedOnInput(inputValue) {
    return inputValue.length >= 3
      ? this.model.findRecipesBySearchTerm(inputValue)
      : this.model.getAllRecipes()
  }

  updateAndRenderRecipes(recipes) {
    this.view.displayRecipes(recipes)
    this.view.displayRecipeCount(recipes.length)
  }

  renderAllRecipes() {
    const allRecipes = this.model.getAllRecipes()
    this.view.displayRecipes(allRecipes)
    this.view.displayRecipeCount(allRecipes.length)
  }

  bindSearchInputEvent() {
    this.view.bindSearchInput(this.handleUserInput)
  }
}
