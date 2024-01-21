// Debounce function
const debounce = (handler, delay) => {
  let timeout
  return function (event) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      handler(event)
    }, delay)
  }
}

export default debounce
