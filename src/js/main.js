// Styles import
import "../css/style.css"

// Images import
import "../images/logo.svg"
import "../images/hero-background.webp"

// Data import
import { recipes as recipesData } from "./data/recipes.js"

// MVC import
import RecipeView from "./views/RecipeView.js"
import RecipeModel from "./models/RecipeModel.js"
import RecipeController from "./controllers/RecipeController.js"

/**
 * Creates an instance of RecipeView.
 * @type {RecipeView}
 */
const recipeView = new RecipeView()

/**
 * Creates an instance of RecipeModel.
 * @type {RecipeModel}
 * @param {Array} recipesData - The initial set of recipes.
 */
const recipeModel = new RecipeModel(recipesData)

/**
 * Creates an instance of RecipeController.
 * @type {RecipeController}
 * @param {RecipeModel} recipeModel - The model of the application.
 * @param {RecipeView} recipeView - The view of the application.
 */
const recipeController = new RecipeController(recipeModel, recipeView)

// Initializes the controller.
recipeController.initialize()
