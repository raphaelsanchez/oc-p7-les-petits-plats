/**
 * Lazy loads images by setting their source when they intersect the viewport.
 * Uses the Intersection Observer API to detect when an image enters the viewport.
 * When an image enters the viewport, its source is set to the value of its `data-src` attribute.
 */
export const lazyLoadImages = () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    observer.observe(img)
  })
}
