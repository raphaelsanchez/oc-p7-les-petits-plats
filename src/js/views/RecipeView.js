// Utils imports
import debounce from "../utils/debounce"
import { toggleDropdown } from "../utils/dropdown"

// Components imports
import Notice from "../components/Notice"
import RecipeCard from "../components/RecipeCard"
import FilterButton from "../components/ActiveFilter"
import FilterItem from "../components/FilterItem"
import FilterList from "../components/FilterList"

export default class RecipeView {
  constructor() {
    // Initialize DOM elements
    this.recipeListElement = document.querySelector("[data-recipes-list]")
    this.recipeCounterElement = document.querySelector("[data-recipes-counter]")
    this.recipeSearchInputElement = document.querySelector(
      "[data-recipes-search]"
    )
    this.recipeFiltersElement = document.querySelector("[data-recipes-filters]")
    this.addDropdownToggleHandler()
  }

  // Search methods
  bindSearchInput(handler) {
    this.recipeSearchInputElement.addEventListener(
      "input",
      debounce((event) => {
        handler(event.target.value)
      }, 300)
    )
  }

  // Recipe display methods
  displayRecipeCount(count) {
    this.recipeCounterElement.textContent = `${count} recette${
      count > 1 ? "s" : ""
    }`
  }

  displayNoRecipesMessage() {
    return Notice(
      "info",
      "Aucune recette ne correspond à votre critère... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc..."
    )
  }

  renderRecipeCards(recipes) {
    return recipes.map((recipe) => RecipeCard(recipe)).join("")
  }

  displayRecipes(recipes) {
    this.recipeListElement.innerHTML =
      recipes.length === 0
        ? this.displayNoRecipesMessage()
        : this.renderRecipeCards(recipes)
    this.lazyLoadImages()
  }

  // Lazy loading methods
  lazyLoadImages() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          observer.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      observer.observe(img)
    })
  }

  // Filter methods
  selectFilterContainer(filterType) {
    return document.querySelector(`[data-recipes-filters="${filterType}"]`)
  }

  addDropdownToggleHandler() {
    const dropdownButtons = document.querySelectorAll(".dropdown-button")
    dropdownButtons.forEach((button) => {
      button.addEventListener("click", toggleDropdown)
    })
  }

  generateFilterItemsHTML(filterType, filters) {
    return filters.map((filter) => FilterItem(filterType, filter)).join("")
  }

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

  updateFilterVisibility(filter, shouldHide) {
    filter.parentNode.classList.toggle("hidden", shouldHide)
  }

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
