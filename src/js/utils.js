// Normalize string
export const normalizeString = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/gi, "")
    .toLowerCase()
}

// Sluggify string
export const sluggifyString = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/gi, "")
    .toLowerCase()
    .replace(/\s/g, "-")
}

// Debounce function
export const debounce = (handler, delay) => {
  let timeout
  return function (event) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      handler(event)
    }, delay)
  }
}
