export default class RecipeController {
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  init() {
    this.view.renderRecipes(this.model.getRecipes())
    this.view.renderRecipesCounter(this.model.getRecipes().length)
    this.view.bindSearchInputEvent(this.handleSearchInput)
  }

  handleSearchInput = (value) => {
    const recipes =
      value.length >= 3
        ? this.model.getRecipesBySearchString(value)
        : this.model.getRecipes()

    this.updateRecipes(recipes)
  }

  updateRecipes(recipes) {
    this.view.renderRecipes(recipes)
    this.view.renderRecipesCounter(recipes.length)
  }
}
