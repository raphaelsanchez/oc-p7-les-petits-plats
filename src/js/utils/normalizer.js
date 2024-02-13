/**
 * Normalizes a string by removing diacritics, non-alphanumeric characters, and converting to lower case.
 * @param {string} str - The string to normalize.
 * @returns {string} The normalized string.
 */
export const normalizeString = (str) => {
  if (!str) {
    return ""
  }
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/gi, "")
    .toLowerCase()
}

/**
 * Converts a string into a slug by removing diacritics, non-alphanumeric characters, converting to lower case, and replacing spaces with hyphens.
 * @param {string} str - The string to convert into a slug.
 * @returns {string} The slugified string.
 */
export const sluggifyString = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/gi, "")
    .toLowerCase()
    .replace(/\s/g, "-")
}
