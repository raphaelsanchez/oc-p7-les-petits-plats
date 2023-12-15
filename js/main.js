import { recipes as recipesData } from "./data/recipes.js"
import RecipesModel from "./models/recipesModel.js"
import RecipesView from "./views/recipesView.js"
import RecipesController from "./controllers/recipesController.js"
import SearchController from "./controllers/searchController.js"
import SearchView from "./views/searchView.js"

// This is the main entrypoint
function initializeApp() {
  // Get the recipes data
  const recipesModel = new RecipesModel(recipesData)

  // Create the recipes view
  const recipesView = new RecipesView()

  // Create the search view
  const searchView = new SearchView()

  // Handle initial recipes list
  const recipesController = new RecipesController(recipesModel, recipesView)
  recipesController.renderInitialRecipesList()

  // Initialize the controller
  const searchController = new SearchController(searchView)
  searchController.initializeController()
}

// Wait for the page to load before running the script
window.addEventListener("load", initializeApp)
