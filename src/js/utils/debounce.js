/**
 * Creates a debounced function that delays the invocation of the handler function until after delay milliseconds have elapsed since the last time the debounced function was invoked.
 * @param {Function} handler - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay the invocation of handler.
 * @returns {Function} The debounced function.
 */
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
