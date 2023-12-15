export default class SearchView {
  constructor() {
    this.searchForm = this.selectElement(".js-search-form")
    this.searchInput = this.selectElement(".js-search-input")
  }

  // Select an element and throw an error if it doesn't exist
  selectElement(selector) {
    const element = document.querySelector(selector)
    if (!element) {
      throw new Error(`No element found with selector "${selector}"`)
    }
    return element
  }

  // Bind the form submit event to the controller
  bindSearchFormSubmitEvent(onFormSubmit) {
    this.searchForm.addEventListener("submit", (event) => {
      event.preventDefault()
      // searchForm containe the class search-form--overflown when the search bar is open
      if (this.searchForm.classList.contains("search-form--overflown")) {
        this.searchForm.classList.remove("search-form--overflown")
      }

      onFormSubmit(this.searchInput.value)
    })
  }

  // Add a contextual helper to the search form to show the keyboard shortcut
  addSearchKeyHelper(isMac) {
    const helperContainer = this.selectElement(".search-form__key-helper")
    const keyHelper = isMac ? "cmd+k" : "ctrl+k"

    helperContainer.textContent = keyHelper
  }

  // Open the search form
  openSearchForm() {
    this.searchForm.classList.add("search-form--overflown")
    this.searchInput.focus()
  }

  // Close the search form
  closeSearchForm() {
    this.searchForm.classList.remove("search-form--overflown")
  }

  // Submit the search form
  submitSearchForm() {
    this.searchForm.addEventListener("submit", (event) => {
      event.preventDefault()

      if (this.searchForm.classList.contains("search-form--overflown")) {
        this.searchForm.classList.remove("search-form--overflown")
      }

      this.focusOnFirstRecipeCard()
    })
  }

  // Focus on the first recipe card
  focusOnFirstRecipeCard() {
    const firstRecipeCard = this.selectElement(".recipe-card")
    firstRecipeCard.focus()
  }
}
