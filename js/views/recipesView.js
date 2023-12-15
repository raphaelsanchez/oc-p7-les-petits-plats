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
  bindSearchInputEvent(onInputChange) {
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
  bindSearchFormEvent(onFormSubmit) {
    const searchForm = document.querySelector(".js-search-form")
    const searchInput = document.querySelector(".js-search-input")

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault()
      const searchFormValue = searchInput.value
      console.log(searchFormValue)
      onFormSubmit(searchFormValue)
    })
  }

  // Render the list of recipes in the DOM and update the counter
  renderRecipes(recipes) {
    const recipesContainer = document.querySelector(".js-recipes-container")
    const recipesCount = document.querySelector(".js-recipes-counter")

    // Message to display when no recipes match the search criteria
    const noRecipesMessage = `<div class="recipes__no-recipes">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc...</div>`

    // Update the counter with the number of recipes
    recipesCount.textContent = `${recipes.length} ${recipes.length > 1 ? "recettes" : "recette"}`

    // Display the recipes or a message if no recipes were found
    recipesContainer.innerHTML =
      recipes.length === 0 ? noRecipesMessage : recipes.map((recipe) => this.recipeCard(recipe)).join("")
  }
}
