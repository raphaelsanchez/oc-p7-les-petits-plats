// Components imports
import Notice from "../components/Notice"
import RecipeCard from "../components/RecipeCard"

// Utils import
import { debounce } from "../utils.js"

export default class RecipeView {
  constructor() {
    this.recipesList = document.querySelector("[data-recipes-list]")
    this.recipesCounter = document.querySelector("[data-recipes-counter]")
    this.recipesSearchInput = document.querySelector("[data-recipes-search]")
  }

  bindSearchInputEvent(handler) {
    this.recipesSearchInput.addEventListener(
      "input",
      debounce((event) => {
        handler(event.target.value)
      }, 300)
    )
  }

  renderRecipesCounter(count) {
    this.recipesCounter.textContent = `${count} ${count > 1 ? "recettes" : "recette"}`
  }

  renderNoRecipesMsg(type, msg) {
    return Notice(
      "info",
      "Aucune recette ne correspond à votre critère... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc..."
    )
  }

  renderRecipesCards(recipes) {
    return recipes.map((recipe) => RecipeCard(recipe)).join("")
  }

  renderRecipes(recipes) {
    this.recipesList.innerHTML =
      recipes.length === 0
        ? this.renderNoRecipesMsg()
        : this.renderRecipesCards(recipes)
  }
}
