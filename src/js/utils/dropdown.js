/**
 * Toggles the dropdown open or closed when the dropdown button is clicked.
 * @param {Event} event - The click event.
 */
export const toggleDropdown = (event) => {
  const dropdownButton = event.target
  toggleButtonState(dropdownButton)
  closeOtherDropdowns(dropdownButton)
  closeAllDropdownsWhenClickOutside()
}

/**
 * Toggles the state of the dropdown button.
 * @param {Element} button - The dropdown button.
 */
function toggleButtonState(button) {
  button.setAttribute(
    "aria-expanded",
    button.getAttribute("aria-expanded") === "true" ? "false" : "true"
  )
  button.nextElementSibling.toggleAttribute("open")
  button.nextElementSibling.toggleAttribute("hidden")
}

/**
 * Closes all other dropdowns except the current one.
 * @param {Element} currentButton - The current dropdown button.
 */
function closeOtherDropdowns(currentButton) {
  const dropdownButtons = document.querySelectorAll(".dropdown-button")
  dropdownButtons.forEach((button) => {
    if (button !== currentButton) {
      closeDropdown(button)
    }
  })
}

/**
 * Closes all dropdowns when a click is detected outside of any dropdown.
 */
function closeAllDropdownsWhenClickOutside() {
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown")) {
      const dropdownButtons = document.querySelectorAll(".dropdown-button")
      dropdownButtons.forEach((button) => {
        closeDropdown(button)
      })
    }
  })
}

/**
 * Closes a dropdown.
 * @param {Element} button - The dropdown button.
 */
function closeDropdown(button) {
  button.setAttribute("aria-expanded", "false")
  button.nextElementSibling.removeAttribute("open")
  button.nextElementSibling.setAttribute("hidden", true)
}
