// Utils imports
import debounce from "../utils/debounce"
import { toggleDropdown } from "../utils/dropdown"

// Components imports
import Notice from "../components/Notice"
import RecipeCard from "../components/RecipeCard"
import FilterButton from "../components/ActiveFilter"
import FilterItem from "../components/FilterItem"
import FilterList from "../components/FilterList"

/**
 * Updates the display and binds events.
 * @param {Array} recipes - The recipes to display.
 */
export default class RecipeView {
  constructor() {
    /**
     * Initializes the view by selecting DOM elements and adding dropdown toggle handler.
     */
    this.recipeListElement = document.querySelector("[data-recipes-list]")
    this.recipeCounterElement = document.querySelector("[data-recipes-counter]")
    this.recipeSearchInputElement = document.querySelector(
      "[data-recipes-search]"
    )
    this.recipeFiltersElement = document.querySelector("[data-recipes-filters]")
    this.addDropdownToggleHandler()
  }

  /**
   * Binds the search input to a handler.
   * @param {Function} handler - The function to call when the search input changes.
   */
  bindSearchInput(handler) {
    this.recipeSearchInputElement.addEventListener(
      "input",
      debounce((event) => {
        handler(event.target.value)
      }, 300)
    )
  }

  /**
   * Displays the count of recipes.
   * @param {number} count - The number of recipes.
   */
  displayRecipeCount(count) {
    this.recipeCounterElement.textContent = `${count} recette${
      count > 1 ? "s" : ""
    }`
    this.recipeCounterElement.setAttribute("aria-label", `${count} recettes`)
  }

  /**
   * Displays a message when no recipes are found.
   * @returns {string} The HTML string of the notice.
   */
  displayNoRecipesMessage() {
    return Notice(
      "info",
      "Aucune recette ne correspond à votre critère... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc..."
    )
  }

  /**
   * Renders the recipe cards.
   * @param {Array} recipes - The recipes to render.
   * @returns {string} The HTML string of the recipe cards.
   */
  renderRecipeCards(recipes) {
    return recipes.map((recipe) => RecipeCard(recipe)).join("")
  }

  /**
   * Displays the recipes.
   * @param {Array} recipes - The recipes to display.
   */
  displayRecipes(recipes) {
    recipes = recipes || []
    this.recipeListElement.innerHTML =
      recipes.length === 0
        ? this.displayNoRecipesMessage()
        : this.renderRecipeCards(recipes)
    // lazyLoadImages()
  }

  /**
   * Selects the filter container for a given filter type.
   * @param {string} filterType - The type of the filter.
   * @returns {Element} The filter container element.
   */
  selectFilterContainer(filterType) {
    return document.querySelector(`[data-recipes-filters="${filterType}"]`)
  }

  /**
   * Adds a handler to toggle the dropdown.
   */
  addDropdownToggleHandler() {
    const dropdownButtons = document.querySelectorAll(".dropdown-button")
    dropdownButtons.forEach((button) => {
      button.addEventListener("click", toggleDropdown)
    })
  }

  /**
   * Generates the HTML for the filter items.
   * @param {string} filterType - The type of the filter.
   * @param {Array} filters - The filters.
   * @returns {string} The HTML string of the filter items.
   */
  generateFilterItemsHTML(filterType, filters) {
    return filters.map((filter) => FilterItem(filterType, filter)).join("")
  }

  /**
   * Binds the filter search input to a handler.
   * @param {Function} handler - The function to call when the filter search input changes.
   */
  bindFilterSearchInput(handler) {
    const filterSearchInputs = document.querySelectorAll(".js-filter-list")

    filterSearchInputs.forEach((input) => {
      const filterResults = document.querySelector(".js-filter-results")
      const filters = filterResults.querySelectorAll("[data-filter]")
      input.addEventListener(
        "input",
        debounce((event) => {
          handler(event.target.value, filters)
        }, 300)
      )
    })
  }

  /**
   * Updates the visibility of a filter.
   * @param {Element} filter - The filter element.
   * @param {boolean} shouldHide - Whether the filter should be hidden.
   */
  updateFilterVisibility(filter, shouldHide) {
    filter.parentNode.classList.toggle("hidden", shouldHide)
  }

  /**
   * Binds the filter item click to a handler.
   * @param {Function} handler - The function to call when a filter item is clicked.
   */
  bindFilterItemClick(handler) {
    const filterButtons = document.querySelectorAll(".filter__button")
    filterButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const filterType = event.target.dataset.filterType
        const filter = event.target.dataset.filter
        handler(filterType, filter)
      })
    })
  }

  /**
   * Displays the filters.
   * @param {Object} filters - The filters to display.
   * @param {Object} activeFilters - The active filters.
   */
  displayFilters(filters, activeFilters) {
    const filterTypes = ["ingredients", "appliances", "utensils"]

    filterTypes.forEach((filterType) => {
      let sortedFilters = [...filters[filterType]].sort()
      if (activeFilters && activeFilters[filterType]) {
        sortedFilters = sortedFilters.filter(
          (filter) => !activeFilters[filterType].includes(filter)
        )
      }
      const filterContainer = this.selectFilterContainer(filterType)
      filterContainer.innerHTML = FilterList(
        this.generateFilterItemsHTML.bind(this),
        filterType,
        sortedFilters
      )
    })
  }

  /**
   * Displays the active filters.
   * @param {Array} activeFilters - The active filters.
   */
  displayActiveFilters(activeFilters) {
    const activeFiltersElement = document.querySelector("[data-active-filters]")
    const activeFiltersHTML = activeFilters
      .map((filter) => {
        console.log(filter)
        return FilterButton(filter)
      })
      .join("")

    activeFiltersElement.innerHTML = activeFiltersHTML
  }

  /**
   * Binds the filter remove click to a handler.
   * @param {Function} handler - The function to call when a filter remove button is clicked.
   */
  bindFilterRemoveClick(handler) {
    const activeFilterRemoveButtons =
      document.querySelectorAll(".filter__remove")

    activeFilterRemoveButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const filter = event.target.textContent.trim()
        handler(filter)
      })
    })
  }
}
