// La vue n'est en charge que de l'affichage des données, elle ne doit pas contenir de logique métier
// Elle ne doit pas contenir de données, elle doit les recevoir en paramètre de ses méthodes
// Gère l'affichage et des données dans le HTML

import recipeCard from "../templates/recipeCard.js"

export default class RecipesView {
  constructor() {
    this.recipes = []
    this.recipeCard = recipeCard
  }

  // Bind the updateRecipesList method to the search input
  bindSearchInputChangeEvent(onInputChange) {
    const searchInput = document.querySelector(".js-search-input")
    searchInput.addEventListener("input", (event) => {
      clearTimeout(this.timeout)
      // debounce search input event to avoid too many requests
      this.timeout = setTimeout(() => {
        onInputChange(event.target.value)
      }, 300)
    })
  }

  // Bind the updateRecipesList method when form is submitted
  bindSearchFormSubmitEvent(onFormSubmit) {
    const searchForm = document.querySelector(".js-search-form")
    const searchInput = document.querySelector(".js-search-input")

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault()
      const searchFormValue = searchInput.value
      console.log(searchFormValue)
      onFormSubmit(searchFormValue)
    })
  }

  // Refresh recipes counter
  updateRecipesCount(count) {
    const recipesCount = document.querySelector(".js-recipes-counter")
    recipesCount.textContent = `${count} ${count > 1 ? "recettes" : "recette"}`
  }

  // Render the "No recipes" message
  renderNoRecipesMsg() {
    return `<div class="recipes__no-recipes">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc...</div>`
  }

  // Render a list of recipes cards
  renderRecipeCards(recipes) {
    return recipes.map((recipe) => this.recipeCard(recipe)).join("")
  }

  // Render the list of recipes in the DOM and update the counter
  renderRecipesList(recipes) {
    const recipesContainer = document.querySelector(".js-recipes-container")

    // Update the counter with the number of recipes
    this.updateRecipesCount(recipes.length)

    // Display the recipes or a message if no recipes were found
    recipesContainer.innerHTML = recipes.length === 0 ? this.renderNoRecipesMsg() : this.renderRecipeCards(recipes)
  }
}
