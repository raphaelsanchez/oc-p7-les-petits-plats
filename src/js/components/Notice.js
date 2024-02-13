/**
 * Creates a notice message of a given type.
 * @param {string} type - The type of the notice. Can be "info", "error", "warning", or "success".
 * @param {string} msg - The message to display in the notice.
 * @returns {string} The HTML string of the notice.
 */
const Notice = (type, msg) => {
  const noticeType = {
    info: "bg-neutral-300 text-neutral-900",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    success: "bg-green-100 text-green-800",
  }

  // Get the class for the given type
  const noticeClasses = noticeType[type]

  // Handle unknown notice types
  if (!noticeClasses) {
    console.error(`Unknown notice type: ${type}`)
    return ""
  }

  return `
    <div class="p-4 rounded-lg col-span-full ${noticeClasses}">
      <p>${msg}</p>
    </div>
  `
}

export default Notice
