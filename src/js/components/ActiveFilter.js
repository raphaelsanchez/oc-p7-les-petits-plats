/**
 * Creates an active filter item.
 * @param {string} filter - The active filter.
 * @returns {string} The HTML string of the active filter item.
 */
const ActiveFilter = (filter) => {
  return `
  <li class="bg-accent flex gap-4 my-2 p-4 rounded-lg">
  <button class="filter__remove | flex gap-4 items-center">
  ${filter} 
      <svg class="pointer-events-none" width="14" height="13" viewBox="0 0 14 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="currentColor" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </li>
  `
}

export default ActiveFilter
