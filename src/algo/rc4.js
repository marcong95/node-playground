function rc4(data, key) {
  // Key-scheduling algorithm
  const s = Array(256).fill(0).map((_v, idx) => idx)
  let i = 0
  let j = 0

  for (i = 0; i < 256; i++) {
    j = (j + s[i] + key[i % key.length]) % 256
    ;[s[i], s[j]] = [s[j], s[i]]
  }

  // Pseudo-random generation algorithm
  const result = []
  let m = 0; let n = 0
  for (i = 0; i < data.length; i++) {
    m = (m + 1) % 256
    n = (n + s[m]) % 256;
    [s[m], s[n]] = [s[n], s[m]]

    const k = (s[m] + s[n]) % 256
    result.push(s[k] ^ data[i])
  }

  return result
}

function formatBuffer(buffer) {
  return Array.from(buffer)
    .map(byte => byte ? byte.toString(16).padStart(2, '0') : '??')
    .join(' ')
}

function encodeBase64(str) {
  return Buffer.from(str).toString('base64')
}

const data = [0x1d, 0x0a, 0x70]
const key = [0x30, 0x31]

const ciphered = rc4(data, key) // should be [0xc1, 0xc8, 0xb5]
console.log(formatBuffer(ciphered))
console.log(formatBuffer(rc4(ciphered, key)))

function rc4String(data, key) {
  const [bufData, bufKey] = [data, key].map(str => Array.from(Buffer.from(str, 'utf-8')))
  return rc4(bufData, bufKey)
}

module.exports = {
  rc4,
  rc4String,
  formatBuffer,
  encodeBase64
}
