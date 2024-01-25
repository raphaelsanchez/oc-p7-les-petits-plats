const FilterItem = (filterType, filter) => {
  return `
    <li class="filter__item">
      <button
        class="filter__button w-full focus-visible:ring ring-accent rounded-sm focus:outline-none"
        data-filter-type="${filterType}"
        data-filter="${filter}">
        ${filter}
      </button>
    </li>
  `
}
export default FilterItem
