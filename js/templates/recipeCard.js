// create recipe card template
export default function recipeCard(recipe) {
  // Get image optimized for webp
  const imageName = recipe.image.split(".")[0]
  const imagePlaceholder = `assets/medias/${imageName}.20.webp`
  const image = `assets/medias/${imageName}.400.webp`

  return `
      <article class="recipe-card" tabindex="0">
        <figure class="recipe-card__cover">
          <img class="recipe-card__cover-image" src="${image}" data-placeholder="${imagePlaceholder}" alt="${
            recipe.name
          }" />
        </figure>
        <div class="recipe-card__header">
          <h3 class="recipe-card__title">${recipe.name}</h3>
          <div class="recipe-card__time">${recipe.time} min</div>
        </div>
        <div class="recipe-card__body">
          <div class="recipe-card__description">
            <h4 class="recipe-card__description-title">Description</h4>
            <p class="recipe-card__description-text">${recipe.description}</p>
          </div>
          <div class="recipe-card__ingredients">
            <h4 class="recipe-card__ingredients-title">Ingredients</h4>
            <ul class="recipe-card__ingredients-list">
              ${recipe.ingredients
                .map(({ ingredient, quantity, unit }) => {
                  return `
                  <li class="recipe-card__ingredient">
                    <span class="recipe-card__ingredient-name">${ingredient}</span>
                    <span class="recipe-card__ingredient-quantity">${quantity || ""}</span>
                    <span class="recipe-card__ingredient-unit">${unit || ""}</span>
                  </li>
                `
                })
                .join("")}
            </ul>
          </div>
        </div>
      </article>
    `
}
