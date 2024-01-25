const FilterItem = (filterType, filter) => {
  return `
    <li class="filter__item">
      <button
        class="filter__button w-full text-left py-2 px-4 hover:bg-accent hover:text-neutral-900 transition focus-visible:outline-2 -outline-offset-2 outline-accent rounded-sm"
        data-filter-type="${filterType}"
        data-filter="${filter}">
        ${filter}
      </button>
    </li>
  `
}
export default FilterItem
