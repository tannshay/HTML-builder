const fs = require('fs')
const readline = require('readline')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

const writableStream = fs.createWriteStream(filePath, { flags: 'a' })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log('Enter your text or "exit"\n')

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Bye!\n')
    rl.close()
    process.exit()
  }

  writableStream.write(input + '\n')
  console.log('Enter your text or "exit" one more time')
})

rl.on('SIGINT', () => {
  console.log('\nBye!')
  rl.close()
  process.exit()
})
