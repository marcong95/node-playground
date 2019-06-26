process.stdin.resume()
process.stdin.setEncoding('utf8')
// 自分の得意な言語で
// Let's チャレンジ！！

var lines = []
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
reader.on('line', (line) => {
  lines.push(line)
})
reader.on('close', () => {
  // eslint-disable-next-line no-unused-vars
  const [height, width, steps] = lines.shift().split(' ').map(v => parseInt(v))
  let x = 0; let y = 0

  for (let step of lines) {
    switch (step) {
      case 'U':
        y++
        break
      case 'D':
        y--
        break
      case 'L':
        x--
        break
      case 'R':
        x++
        break
    }

    if (x < 0 || x >= width || y < 0 || y >= height) {
      console.log('invalid')
      return
    }
  }

  console.log('valid')
})
