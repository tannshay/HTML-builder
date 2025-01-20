const fs = require('fs')
const path = require('path')

const stylesFolder = path.join(__dirname, 'styles')
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css')

fs.readdir(stylesFolder, (err, files) => {
  if (err) {
    process.stdout.write(`Error: ${err}`)
    process.exit()
  }

  const cssFiles = files.filter((file) => path.extname(file) === '.css')

  const writeStream = fs.createWriteStream(bundleFile)

  cssFiles.forEach((file) => {
    const filePath = path.join(stylesFolder, file)
    const readStream = fs.createReadStream(filePath, 'utf8')

    readStream.on('data', (chunk) => writeStream.write(chunk + '\n'))
    readStream.on('error', (err) => process.stdout.write(`Error: ${err}`))
  })
})
