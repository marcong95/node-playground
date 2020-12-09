const readline = require('readline')

async function calcMonitorSize() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  const question = query => new Promise(resolve => {
    rl.question(query, resolve)
  })

  const diagLenStr = await question('Diagonal length (inches): ')
  const diagLen = parseFloat(diagLenStr)

  const resolutionStr = await question('Resolution (width * height): ')
  const resolution = resolutionStr.split('*').map(str => parseInt(str.trim(), 10))
  const [wPx, hPx] = resolution

  const theta = Math.atan2(hPx, wPx)
  const wIn = diagLen * Math.cos(theta)
  const hIn = diagLen * Math.sin(theta)
  const [wCm, hCm] = [wIn, hIn].map(inches => inches * 2.54)

  console.log('Monitor size (inches):', wIn.toFixed(2), hIn.toFixed(2))
  console.log('Monitor size (centimeters):', wCm.toFixed(2), hCm.toFixed(2))

  rl.close()
}

calcMonitorSize()
  .catch(console.error)
