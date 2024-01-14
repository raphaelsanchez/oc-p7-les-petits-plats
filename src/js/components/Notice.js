const Notice = (type, msg) => {
  // Define classes depending on the type of notice
  const noticeType = {
    info: "bg-neutral-300 text-neutral-900",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    success: "bg-green-100 text-green-800",
  }

  // Get the class for the given type
  const noticeClasses = noticeType[type]

  return `
    <div class="p-4 rounded-lg col-span-full ${noticeClasses}">
      <p>${msg}</p>
    </div>
  `
}

export default Notice
