const qrcode = require('qrcode')

/* Braille Code Points
 * 0x2800 +
 *  01 08
 *  02 10
 *  04 20
 *  40 80
 */
const BRAILLE_BASE = 0x2800
const BRAILLE_LUT = [0x01, 0x08, 0x02, 0x10, 0x04, 0x20, 0x40, 0x80]

function createQrBraille(content) {
  const qr = qrcode.create(content)

  const { size, data } = qr.modules

  // const lines = []
  const lines = []
  let offsets = []

  // a QRCode must be an square which sides have a length of `size`
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const braillePos = j % 2 + i % 4 * 2
      const offsetPos = Math.floor(j / 2)
      if (data[i * size + j] === 1) {
        offsets[offsetPos] = (offsets[offsetPos] || 0) + BRAILLE_LUT[braillePos]
      }
    }

    if (i % 4 === 3 || i === size - 1) {
      lines.push(offsets.map(o => String.fromCodePoint(BRAILLE_BASE + o)).join(''))
      console.log(offsets)
      console.log(lines[lines.length - 1])
      offsets = []
    }
  }

  return lines.join('\n')
}

// eslint-disable-next-line
console.log(createQrBraille('https://marcong.tech'))
