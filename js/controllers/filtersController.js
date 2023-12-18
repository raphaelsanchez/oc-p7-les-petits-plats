export default class FiltersController {
  constructor(searchView) {
    this.searchView = searchView
    this.searchView.bindSearchFormSubmitEvent(this.submitSearchForm)
    this.searchView.bindFiltersClickEvent(this.updateFilterAndRefresh)
  }

  updateFilterAndRefresh(onFilterClick) {
    // Toggles the filter
    const filterContent = onFilterClick.parentElement
    filterContent.classList.toggle("is-open")

    // close when click other place
    document.addEventListener("click", (event) => {
      if (!filterContent.contains(event.target)) {
        filterContent.classList.remove("is-open")
      }
    })
  }

  // Initialize the controller by setting up event listeners
  initializeController() {
    this.setupEventListeners()
    this.searchView.addSearchKeyHelper(this.isMac())
  }

  // Determine if the user is on a Mac
  isMac() {
    return window.navigator.userAgent.includes("Mac")
  }

  // Open the search form
  openSearchForm() {
    this.searchView.openSearchForm()
  }

  // Close the search form
  closeSearchForm() {
    this.searchView.closeSearchForm()
  }

  // Focus on the first recipe card
  focusOnFirstRecipeCard() {
    this.searchView.focusOnFirstRecipeCard()
  }

  // Submit the search form
  submitSearchForm = () => {
    this.searchView.submitSearchForm()
  }

  // Set up event listeners for keyboard shortcuts
  setupEventListeners() {
    document.addEventListener("keydown", (event) => {
      const key = this.isMac() ? "Meta" : "Control"

      event.key === "k" && event.getModifierState(key) && this.openSearchForm()
      event.key === "Escape" && this.closeSearchForm()
    })
  }
}
