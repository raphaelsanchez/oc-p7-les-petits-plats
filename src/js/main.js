// Styles import
import "../css/style.css"

// Data import
import { recipes as recipesData } from "./data/recipes.js"

// MVC import
import RecipeModel from "./models/RecipeModel.js"
import RecipeView from "./views/RecipeView.js"
import RecipeController from "./controllers/RecipeController.js"

// Create recipes model instance
const recipeModel = new RecipeModel(recipesData)

// Create recipes view instance
const recipeView = new RecipeView()

// Create recipes controller instance
const recipeController = new RecipeController(recipeModel, recipeView)
recipeController.init()
