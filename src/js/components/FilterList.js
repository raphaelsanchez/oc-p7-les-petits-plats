const FilterList = (generateFilterItemsHTML, filterType, filters) => {
  return `
    <ul class="filter__list">
      <div class="flex items-center mb-2 mx-4 ps-0 pe-3 border border-neutral-400 bg-white rounded-sm sticky top-0 focus-within:ring ring-accent ">
        <input type="search" class="py-1 px-2 w-full focus:outline-none | js-filter-list" />
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="4.75" stroke="#7A7A7A" stroke-width="0.5"/>
          <line x1="9.17678" y1="9.32322" x2="13.6768" y2="13.8232" stroke="#7A7A7A" stroke-width="0.5"/>
        </svg>
      </div>
      <ul class="bg-white flex flex-col | js-filter-results">
        ${generateFilterItemsHTML(filterType, filters)}
      </ul>
    </ul>
  `
}

export default FilterList
