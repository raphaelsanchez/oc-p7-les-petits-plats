import { normalizeString } from "../utils/normalizer"

/**
 * Controller for the Recipe application.
 */
export default class RecipeController {
  /**
   * @param {Object} model - The model of the application.
   * @param {Object} view - The view of the application.
   */
  constructor(model, view) {
    this.model = model
    this.view = view
    this.view.bindSearchInput(this.handleUserInput)
  }

  /**
   * Initializes the controller.
   */
  initialize() {
    this.displayAllRecipes()
    this.bindEvents()
  }

  /**
   * Binds events to the view.
   */
  bindEvents() {
    this.view.bindFilterItemClick(this.handleFilterClick)
    this.view.bindFilterRemoveClick(this.handleFilterRemove.bind(this))
    this.view.bindFilterSearchInput(this.handleFilterSearch)
  }

  /**
   * Handles user input.
   * @param {string} inputValue - The user input.
   */
  handleUserInput = (inputValue) => {
    const activeFilters = this.model.getActiveFilters()
    let recipes

    if (inputValue.trim().length >= 3) {
      recipes = this.model.findRecipesBySearchTermAndFilters(
        inputValue,
        activeFilters
      )
    } else {
      this.model.filteredRecipes = this.model.allRecipes
      recipes =
        activeFilters.length > 0
          ? this.model.findRecipesByActiveFilters()
          : this.model.getAllRecipes()
    }

    this.model.setFilteredRecipes(recipes)
    this.model.setSearchInput(inputValue)
    this.updateAndDisplayRecipes(recipes)
    this.bindEvents()
  }

  /**
   * Handles filter search.
   * @param {string} inputValue - The user input.
   * @param {Array} filters - The filters.
   */
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

  /**
   * Handles filter click.
   * @param {string} type - The type of the filter.
   * @param {string} filter - The filter.
   */
  handleFilterClick = (type, filter) => {
    this.model.setActiveFilters(filter)
    this.model.setFilteredRecipes(this.model.getRecipes())
    const recipes = this.getRecipesBasedOnFilter(type, filter)
    this.updateDisplayAndBindEvents(recipes)
  }

  /**
   * Handles filter removal.
   * @param {string} filter - The filter to remove.
   */
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

  /**
   * Retrieves recipes based on user input.
   * @param {string} inputValue - The user input.
   * @returns {Array} The matching recipes.
   */
  getRecipesBasedOnInput(inputValue) {
    return inputValue.length >= 3
      ? this.model.findRecipesBySearchTerm(inputValue)
      : this.model.getRecipes()
  }

  /**
   * Retrieves recipes based on active filters.
   * @returns {Array} The matching recipes.
   */
  getRecipesBasedOnFilter() {
    return this.model.getActiveFilters().length > 0
      ? this.model.findRecipesByActiveFilters()
      : this.model.getRecipes()
  }

  /**
   * Updates and displays recipes.
   * @param {Array} recipes - The recipes to display.
   */
  updateAndDisplayRecipes(recipes) {
    recipes = recipes || []
    const filters = this.model.findFiltersByRecipes(recipes)
    this.view.displayRecipes(recipes)
    this.view.displayFilters(filters)
    this.view.displayRecipeCount(recipes.length)
  }

  /**
   * Displays all recipes.
   */
  displayAllRecipes() {
    const allRecipes = this.model.getRecipes()
    const allFilters = this.model.findFiltersByRecipes(allRecipes)
    this.view.displayRecipes(allRecipes)
    this.view.displayFilters(allFilters)
    this.view.displayRecipeCount(allRecipes.length)
  }

  /**
   * Displays active filters.
   */
  displayActiveFilters() {
    const activeFilters = this.model.getActiveFilters()
    this.view.displayActiveFilters(activeFilters)
  }

  /**
   * Updates the display and binds events.
   * @param {Array} recipes - The recipes to display.
   */
  updateDisplayAndBindEvents(recipes) {
    this.updateAndDisplayRecipes(recipes)
    this.displayActiveFilters()
    this.bindEvents()
  }
}
