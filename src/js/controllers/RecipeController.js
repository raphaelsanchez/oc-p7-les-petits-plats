export default class RecipeController {
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  initialize() {
    this.displayAllRecipes()
    this.bindEvents()
  }

  bindEvents() {
    this.bindSearchInputEvent()
    this.bindFilterClickEvent()
    this.bindFilterRemoveEvent()
  }

  handleUserInput = (inputValue) => {
    const recipes = this.getRecipesBasedOnInput(inputValue)
    this.updateAndDisplayRecipes(recipes)
    this.bindEvents()
  }

  handleFilterClick = (type, filter) => {
    this.model.setActiveFilters(filter)
    const recipes = this.getRecipesBasedOnFilter(type, filter)
    this.updateDisplayAndBindEvents(recipes)
  }

  updateDisplayAndBindEvents(recipes) {
    this.updateAndDisplayRecipes(recipes)
    this.displayActiveFilters()
    this.bindEvents()
  }

  handleFilterRemove(filter) {
    this.model.removeActiveFilter(filter)
    const recipes = this.getRecipesBasedOnFilter()
    this.updateDisplayAndBindEvents(recipes)
  }

  getRecipesBasedOnInput(inputValue) {
    return inputValue.length >= 3
      ? this.model.findRecipesBySearchTerm(inputValue)
      : this.model.getAllRecipes()
  }

  getRecipesBasedOnFilter() {
    return this.model.getActiveFilters().length > 0
      ? this.model.findRecipesByActiveFilters()
      : this.model.getAllRecipes()
  }

  updateAndDisplayRecipes(recipes) {
    const filters = this.model.findFiltersByRecipes(recipes)
    this.view.displayRecipes(recipes)
    this.view.displayFilters(filters)
    this.view.displayRecipeCount(recipes.length)
  }

  displayAllRecipes() {
    const allRecipes = this.model.getAllRecipes()
    const allFilters = this.model.findFiltersByRecipes(allRecipes)
    this.view.displayRecipes(allRecipes)
    this.view.displayFilters(allFilters)
    this.view.displayRecipeCount(allRecipes.length)
  }

  displayActiveFilters() {
    const activeFilters = this.model.getActiveFilters()
    this.view.displayActiveFilters(activeFilters)
  }

  bindSearchInputEvent() {
    this.view.bindSearchInput(this.handleUserInput)
  }

  bindFilterClickEvent() {
    this.view.bindFilterItemClick(this.handleFilterClick)
  }

  bindFilterRemoveEvent() {
    this.view.bindFilterRemoveClick(this.handleFilterRemove.bind(this))
  }
}
