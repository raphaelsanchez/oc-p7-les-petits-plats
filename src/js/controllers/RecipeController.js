import { normalizeString } from "../utils/normalizer"
export default class RecipeController {
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  // Initialization methods
  initialize() {
    this.displayAllRecipes()
    this.bindEvents()
  }

  // Event binding methods
  bindEvents() {
    this.view.bindSearchInput(this.handleUserInput)
    this.view.bindFilterItemClick(this.handleFilterClick)
    this.view.bindFilterRemoveClick(this.handleFilterRemove.bind(this))
    this.view.bindFilterSearchInput(this.handleFilterSearch)
  }

  // Event handling methods
  handleUserInput = (inputValue) => {
    let recipes
    const activeFilters = this.model.getActiveFilters()

    if (inputValue.trim().length === 0) {
      recipes =
        activeFilters.length > 0
          ? this.model.findRecipesByActiveFilters()
          : this.model.getAllRecipes()
    } else {
      recipes = this.model.findRecipesBySearchTermAndFilters(
        inputValue,
        activeFilters
      )
    }

    this.model.setFilteredRecipes(recipes)
    this.model.setSearchInput(inputValue)
    this.updateAndDisplayRecipes(recipes)
    this.bindEvents()
  }

  handleFilterSearch = (inputValue, filters) => {
    filters.forEach((filter) => {
      const filterAttribute = filter.getAttribute("data-filter")

      let shouldHide = inputValue.length > 0
      if (filterAttribute && inputValue.length !== 0) {
        const normalizedFilter = normalizeString(filterAttribute)
        const normalizedSearchTerm = normalizeString(inputValue)
        shouldHide = !normalizedFilter.includes(normalizedSearchTerm)
      }

      this.view.updateFilterVisibility(filter, shouldHide)
    })
  }

  handleFilterClick = (type, filter) => {
    this.model.setActiveFilters(filter)
    this.model.setFilteredRecipes(this.model.getRecipes())
    const recipes = this.getRecipesBasedOnFilter(type, filter)
    this.updateDisplayAndBindEvents(recipes)
  }

  handleFilterRemove = (filter) => {
    this.model.removeActiveFilter(filter)
    const searchTerm = this.model.getSearchInput() || ""
    const activeFilters = this.model.getActiveFilters()
    const recipes = this.model.findRecipesBySearchTermAndFilters(
      searchTerm,
      activeFilters
    )
    this.model.setFilteredRecipes(recipes)
    this.updateDisplayAndBindEvents(recipes)
  }

  // Recipe retrieval methods
  getRecipesBasedOnInput(inputValue) {
    return inputValue.length >= 3
      ? this.model.findRecipesBySearchTerm(inputValue)
      : this.model.getRecipes()
  }

  getRecipesBasedOnFilter() {
    return this.model.getActiveFilters().length > 0
      ? this.model.findRecipesByActiveFilters()
      : this.model.getRecipes()
  }

  // Display methods
  updateAndDisplayRecipes(recipes) {
    const filters = this.model.findFiltersByRecipes(recipes)
    this.view.displayRecipes(recipes)
    this.view.displayFilters(filters)
    this.view.displayRecipeCount(recipes.length)
  }

  displayAllRecipes() {
    const allRecipes = this.model.getRecipes()
    const allFilters = this.model.findFiltersByRecipes(allRecipes)
    this.view.displayRecipes(allRecipes)
    this.view.displayFilters(allFilters)
    this.view.displayRecipeCount(allRecipes.length)
  }

  displayActiveFilters() {
    const activeFilters = this.model.getActiveFilters()
    this.view.displayActiveFilters(activeFilters)
  }

  // Update methods
  updateDisplayAndBindEvents(recipes) {
    this.updateAndDisplayRecipes(recipes)
    this.displayActiveFilters()
    this.bindEvents()
  }
}
