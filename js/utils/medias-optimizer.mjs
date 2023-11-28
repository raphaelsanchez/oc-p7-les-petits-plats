import fs from "fs"
import path from "path"
import sharp from "sharp"

// Constants
const SIZES = [1920, 400, 20]
const SOURCE_FOLDER = "./assets/"

// Generate a resized image
const generateResizedImage = async (filePath, size) => {
  const imageBuffer = await sharp(filePath).resize({ width: size, fit: "cover" }).webp().toBuffer()
  await fs.promises.writeFile(filePath.replace(/\.(jpg|jpeg|png)$/i, `.${size}.webp`), imageBuffer)
}

// Check if a size of an image has already been generated
const isSizeAlreadyGenerated = async (filePath, size) => {
  const webpFilePath = path.join(
    path.dirname(filePath),
    path.basename(filePath, path.extname(filePath)) + `.${size}.webp`,
  )
  try {
    await fs.promises.access(webpFilePath)
    return true
  } catch {
    return false
  }
}

// Process images in folders
const processFolder = async (folderPath) => {
  const files = await fs.promises.readdir(folderPath, { withFileTypes: true })
  let count = 0
  let total = files.filter((file) => !file.isDirectory() && /\.(jpg|jpeg|png)$/i.test(file.name)).length
  for (const file of files) {
    const filePath = path.join(folderPath, file.name)
    if (file.isDirectory()) {
      console.log(`\nProcess ${filePath} folder: ${total} images to process\n`)
      await processFolder(filePath)
    } else if (/\.(jpg|jpeg|png)$/i.test(file.name)) {
      const sizesToGenerate = []
      for (const size of SIZES) {
        if (!(await isSizeAlreadyGenerated(filePath, size))) {
          sizesToGenerate.push(size)
        }
      }
      if (sizesToGenerate.length === 0) {
        console.log(`⏭️  Skipped already processed image: ${filePath}`)
        continue
      }
      for (const size of sizesToGenerate) {
        await generateResizedImage(filePath, size)
      }
      count++
      console.log(`✅ Processed image (${count}/${total}): ${filePath}`)
      console.log("-> Generated sizes:", sizesToGenerate)
    }
  }
}

// Run the image processing script and log in console
const run = async () => {
  try {
    console.log("\n=============================================\n")
    console.log("SHARP MEDIAS OPTIMIZER")
    console.log("\n=============================================\n")
    console.log("\nStarting image processing... 🚀\n")
    await processFolder(path.join(SOURCE_FOLDER))
    console.log("\n")
    console.log("Image processing complete ! 🎉")
    console.log("\n")
  } catch (error) {
    console.error(error)
    throw error
  }
}

run()
