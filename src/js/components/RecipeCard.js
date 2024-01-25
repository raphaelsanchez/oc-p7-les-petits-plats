const RECIPE_TEXT = "Recette"
const INGREDIENT_TEXT = "Ingrédient"

const createIngredientList = (ingredients) => {
  return ingredients
    .map(
      ({ ingredient, quantity, unit }) => `
        <li class="flex flex-col">
          <span>${ingredient}</span> 
          <span class="text-neutral-600">${quantity || ""} ${unit || ""}</span>
        </li>
      `
    )
    .join("")
}

const RecipeCard = (recipe) => {
  // Destructure recipe object
  const { id, name, description, image, time, ingredients } = recipe

  // Get image optimized for webp
  const imageName = image.split(".")[0]
  const recipeImage = `/images/${imageName}.400.webp`

  // Return the recipe card
  return `
    <article class="bg-white rounded-lg shadow-xl overflow-hidden relative outline-none focus-visible:ring ring-accent" id="recipe-${id}" tabindex="0">
      <img class="w-full aspect-[380/250] object-cover" src="${recipeImage}" alt="Photo d'une recette de ${name}" loading="lazy" />
      <div class="px-4 py-8">
        <h3 class="font-display text-xl">${name}</h3>
        <p class="absolute top-4 right-4 bg-accent py-2 px-4 rounded-full text-sm">${time} min</p>
        <h4 class="mt-8 mb-4 uppercase text-neutral-600 text-sm font-bold tracking-widest">${RECIPE_TEXT}</h4>
        <p class="line-clamp-4">${description}</p>
        <h4 class="mt-8 mb-4 uppercase text-neutral-600 text-sm font-bold tracking-widest">${INGREDIENT_TEXT}</h4>
        <ul class="grid grid-cols-2 gap-4">
          ${createIngredientList(ingredients)}
        </ul>
      </div>
    </article>
  `
}

export default RecipeCard
