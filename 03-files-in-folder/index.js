const fs = require('fs/promises')
const path = require('path')

;(async () => {
  try {
    const files = await fs.readdir(path.join(__dirname, 'secret-folder'), {
      withFileTypes: true,
    })

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(__dirname, 'secret-folder', file.name)
        const fileStats = await fs.stat(filePath)

        const fileName = path.parse(file.name).name
        const fileExtension = path.extname(file.name).slice(1)
        const fileSize = (fileStats.size / 1024).toFixed(3)

        console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`)
      }
    }
  } catch (err) {
    console.error('Error: ', err)
  }
})()
