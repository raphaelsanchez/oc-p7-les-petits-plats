const RECIPE_TEXT = "Recette"
const INGREDIENT_TEXT = "Ingrédient"

const createIngredientList = (ingredients) => {
  return ingredients
    .map(
      ({ ingredient, quantity, unit }) => `
        <li class="flex flex-col" tabindex="0">
          <span>${ingredient}</span> 
          <span class="text-neutral-600">${quantity || ""} ${unit || ""}</span>
        </li>
      `
    )
    .join("")
}

// Render the recipe image
const renderImage = (image, alt) => {
  const imageName = image.split(".")[0]
  const baseUrl =
    process.env.NODE_ENV === "production" ? "/oc-p7-les-petits-plats/" : "/"
  const recipeImage = `${baseUrl}images/${imageName}.400.webp`

  return `<img class="w-full aspect-[380/250] object-cover" data-src="${recipeImage}" src="" alt="Image de la recette ${alt}" />`
}

const RecipeCard = (recipe) => {
  // Destructure recipe object
  const { id, name, description, image, time, ingredients } = recipe

  // Return the recipe card
  return `
    <article class="bg-white rounded-lg shadow-xl overflow-hidden relative outline-none focus-visible:ring ring-accent" id="recipe-${id}" tabindex="0" aria-label="Recette : ${name}">
      ${renderImage(image, name)}
      <div class="px-4 py-8">
        <h2 class="font-display text-xl">${name}</h2>
        <p class="absolute top-4 right-4 bg-accent py-2 px-4 rounded-full text-sm" tabindex="0" aria-label="Temps de préparation : ${time} minutes">${time} min</p>
        <h3 class="mt-8 mb-4 uppercase text-neutral-600 text-sm font-bold tracking-widest" tabindex="0">${RECIPE_TEXT}</h3>
        <p class="line-clamp-4" tabindex="0">${description}</p>
        <h3 class="mt-8 mb-4 uppercase text-neutral-600 text-sm font-bold tracking-widest" tabindex="0">${INGREDIENT_TEXT}</h3>
        <ul class="grid grid-cols-2 gap-4" role="list">
          ${createIngredientList(ingredients)}
        </ul>
      </div>
    </article>
  `
}

export default RecipeCard
