const fs = require('fs')
const path = require('path')
const fsPromises = fs.promises

const projectDist = path.join(__dirname, 'project-dist')
const templatePath = path.join(__dirname, 'template.html')
const componentsDir = path.join(__dirname, 'components')
const stylesDir = path.join(__dirname, 'styles')
const assetsDir = path.join(__dirname, 'assets')
const outputHtml = path.join(projectDist, 'index.html')
const outputCss = path.join(projectDist, 'style.css')
const outputAssets = path.join(projectDist, 'assets')

async function buildProject() {
  try {
    await fsPromises.mkdir(projectDist, { recursive: true })

    let template = await fsPromises.readFile(templatePath, 'utf8')
    const tags = template.match(/{{[\w]+}}/g) || []

    for (let tag of tags) {
      const componentName = tag.replace(/[{}]/g, '').trim()
      const componentPath = path.join(componentsDir, `${componentName}.html`)

      try {
        const componentContent = await fsPromises.readFile(
          componentPath,
          'utf-8',
        )
        template = template.replace(new RegExp(tag, 'g'), componentContent)
      } catch (err) {
        console.error(`${componentName} not found`)
      }
    }
    await fsPromises.writeFile(outputHtml, template)

    const files = await fsPromises.readdir(stylesDir)
    let styles = ''

    for (const file of files) {
      const filePath = path.join(stylesDir, file)
      if (path.extname(file) === '.css') {
        const fileContent = await fsPromises.readFile(filePath, 'utf-8')
        styles += fileContent + '\n'
      }
    }

    await fsPromises.writeFile(outputCss, styles)

    await copyAssets(assetsDir, outputAssets)

    process.stdout.write('OK')
  } catch (err) {
    process.stdout.write(`Error: ${err}`)
  }
}

async function copyAssets(src, dest) {
  await fsPromises.mkdir(dest, { recursive: true })

  const files = await fsPromises.readdir(src, { withFileTypes: true })

  for (const file of files) {
    const srcPath = path.join(src, file.name)
    const destPath = path.join(dest, file.name)

    if (file.isDirectory()) {
      await copyAssets(srcPath, destPath)
    } else {
      await fsPromises.copyFile(srcPath, destPath)
    }
  }
}

buildProject()
