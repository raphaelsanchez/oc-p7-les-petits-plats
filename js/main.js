import { recipes as recipesData } from "./data/recipes.js"
import RecipesModel from "./models/recipesModel.js"
import RecipesView from "./views/recipesView.js"
import RecipesController from "./controllers/recipesController.js"

// This is the main entrypoint
function initializeApp() {
  // Get the recipes data
  const recipesModel = new RecipesModel(recipesData)

  // Create the recipes view
  const recipesView = new RecipesView()

  // Handle initial recipes list
  const recipesController = new RecipesController(recipesModel, recipesView)
  recipesController.renderInitialRecipesList()
}

// Wait for the page to load before running the script
window.addEventListener("load", initializeApp)
