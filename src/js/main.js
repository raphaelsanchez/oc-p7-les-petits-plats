// Styles import
import "../css/style.css"
// Import logo to be used in the HTML
import "../images/logo.svg"
import "../images/hero-background.webp"

// Data import
import { recipes as recipesData } from "./data/recipes.js"

// MVC import
import RecipeView from "./views/RecipeView.js"
import RecipeModel from "./models/RecipeModel.js"
import RecipeController from "./controllers/RecipeController.js"

// Create recipes view instance
const recipeView = new RecipeView()

// Create recipes model instance
const recipeModel = new RecipeModel(recipesData)

// Create recipes controller instance
const recipeController = new RecipeController(recipeModel, recipeView)
recipeController.initialize()
