import Notice from "../components/Notice"
import RecipeCard from "../components/RecipeCard"
import FilterButton from "../components/ActiveFilter"
import debounce from "../utils/debounce"
import { toggleDropdown } from "../utils/dropdown"
import { normalizeString } from "../utils/normalizer"

export default class RecipeView {
  constructor() {
    this.recipeListElement = document.querySelector("[data-recipes-list]")
    this.recipeCounterElement = document.querySelector("[data-recipes-counter]")
    this.recipeSearchInputElement = document.querySelector(
      "[data-recipes-search]"
    )
    this.recipeFiltersElement = document.querySelector("[data-recipes-filters]")
    this.addDropdownToggleHandler()
  }

  bindSearchInput(handler) {
    this.recipeSearchInputElement.addEventListener(
      "input",
      debounce((event) => {
        handler(event.target.value)
      }, 300)
    )
  }

  displayRecipeCount(count) {
    this.recipeCounterElement.textContent = `${count} ${count > 1 ? "recettes" : "recette"}`
  }

  displayNoRecipesMessage() {
    return Notice(
      "info",
      "Aucune recette ne correspond à votre critère... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc..."
    )
  }

  createRecipeCards(recipes) {
    return recipes.map((recipe) => RecipeCard(recipe)).join("")
  }

  displayRecipes(recipes) {
    this.recipeListElement.innerHTML =
      recipes.length === 0
        ? this.displayNoRecipesMessage()
        : this.createRecipeCards(recipes)
  }

  // Filters
  selectFilterContainer(filterType) {
    return document.querySelector(`[data-recipes-filters="${filterType}"]`)
  }

  addDropdownToggleHandler() {
    const dropdownButtons = document.querySelectorAll(".dropdown-button")
    dropdownButtons.forEach((button) => {
      button.addEventListener("click", toggleDropdown)
    })
  }

  generateFilterItemHTML(filterType, filter) {
    return `
        <li class="filter__item">
          <button
            class="filter__button"
            data-filter-type="${filterType}"
            data-filter="${filter}"
          >
            ${filter}
          </button>
        </li>
      `
  }

  generateFilterItemsHTML(filterType, filters) {
    return filters
      .map((filter) => this.generateFilterItemHTML(filterType, filter))
      .join("")
  }

  generateFilterListHTML(filterType, filters) {
    return `
        <ul class="filter__list">
          ${this.generateFilterItemsHTML(filterType, filters)}
        </ul>
      `
  }

  bindFilterItemClick(handler) {
    const filterButtons = document.querySelectorAll(".filter__button")
    filterButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const filterType = event.target.dataset.filterType
        const filter = normalizeString(event.target.dataset.filter)
        handler(filterType, filter)
      })
    })
  }

  displayFilters(filters) {
    const filterTypes = ["ingredients", "appliances", "utensils"]

    filterTypes.forEach((filterType) => {
      const sortedFilters = [...filters[filterType]].sort()
      const filterContainer = this.selectFilterContainer(filterType)
      filterContainer.innerHTML = this.generateFilterListHTML(
        filterType,
        sortedFilters
      )
    })
  }

  displayActiveFilters(activeFilters) {
    const activeFiltersElement = document.querySelector("[data-active-filters]")
    const activeFiltersHTML = activeFilters
      .map((filter) => {
        return FilterButton(filter)
      })
      .join("")

    activeFiltersElement.innerHTML = activeFiltersHTML
  }

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
