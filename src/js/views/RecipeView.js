import Notice from "../components/Notice"
import RecipeCard from "../components/RecipeCard"
import { debounce } from "../utils.js"

export default class RecipeView {
  constructor() {
    this.recipeListElement = document.querySelector("[data-recipes-list]")
    this.recipeCounterElement = document.querySelector("[data-recipes-counter]")
    this.recipeSearchInputElement = document.querySelector(
      "[data-recipes-search]"
    )
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
}
