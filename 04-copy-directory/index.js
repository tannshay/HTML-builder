const fs = require('fs')
const path = require('path')
const fsPromises = fs.promises

;(async () => {
  const sourceFolder = path.join(__dirname, 'files')
  const destinationFolder = path.join(__dirname, 'files-copy')

  try {
    await fsPromises.mkdir(destinationFolder, { recursive: true })

    const files = await fsPromises.readdir(sourceFolder)

    for (let file of files) {
      const sourceFile = path.join(sourceFolder, file)
      const destinationFile = path.join(destinationFolder, file)

      await fsPromises.copyFile(sourceFile, destinationFile)
    }
    process.stdout.write('Copying completed')
  } catch (err) {
    process.stdout.write(`Error: ${err}`)
  }
})()
