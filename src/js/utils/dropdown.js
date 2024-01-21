export const toggleDropdown = (event) => {
  const dropdownButton = event.target
  toggleButtonState(dropdownButton)
  closeOtherDropdowns(dropdownButton)
  closeAllDropdownsWhenClickOutside()
}

function toggleButtonState(button) {
  button.setAttribute(
    "aria-expanded",
    button.getAttribute("aria-expanded") === "true" ? "false" : "true"
  )
  button.nextElementSibling.toggleAttribute("open")
}

function closeOtherDropdowns(currentButton) {
  const dropdownButtons = document.querySelectorAll(".dropdown-button")
  dropdownButtons.forEach((button) => {
    if (button !== currentButton) {
      closeDropdown(button)
    }
  })
}

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

function closeDropdown(button) {
  button.setAttribute("aria-expanded", "false")
  button.nextElementSibling.removeAttribute("open")
}
