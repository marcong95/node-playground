function rc4(data, key) {
  // Key-scheduling algorithm
  const s = Array(256).fill(0).map((_v, idx) => idx)
  let i = 0
  let j = 0

  for (i = 0; i < 256; i++) {
    j = (j + s[i] + key[i % key.length]) % 256

    // 协议文档中生成 key 的方法似乎与标准 RC4 不一致，略迷
    // 协议文档中的写法为：j = (j + key[i] + (int) T[i]) % 255;
    // 其中 T[i] = key[i]; i in [0, 256)
    // j = (j + (key[i] || 0) * 2) % 255
    // j = (j + s[i] + (key[i] || 0)) % 256

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
    .map(byte => byte != null && !Number.isNaN(byte) ? byte.toString(16).padStart(2, '0') : '??')
    .join(' ')
}

function rc4String(data, key) {
  const [bufData, bufKey] = [data, key].map(str => Array.from(Buffer.from(str, 'utf-8')))
  return rc4(bufData, bufKey)
}

function encodeBase64(str) {
  return Buffer.from(str).toString('base64')
}

function isDataMatched(data1, data2) {
  return data1.length === data2.length &&
    data1.every((byte, offset) => byte === data2[offset])
}

;[
  // Test cases from Wikipedia
  // ['Plaintext', 'Key', Buffer.from('BBF316E8D940AF0AD3', 'hex')],
  // ['pedia', 'Wiki', Buffer.from('1021BF0420', 'hex')],
  // ['Attack at dawn', 'Secret', Buffer.from('45A01F645FC35B383552544B9BF5', 'hex')],

  // Test cases from Protocol Specs
  // [[0x01, 0x0a, 0x70], [0x30, 0x31], [0x45, 0x6c, 0xc2]],
  // [[0x01, 0x65], [0x30, 0x31], [0x45, 0x03]],
  // [[0x01, 0x01, 0x00, 0x01, 0x00, 0x01, 0x6a], [0x30, 0x31], [0x45, 0x67, 0xb2, 0x56, 0x18, 0x0c, 0x87]]
  [[0x00, 0x01, 0xfd], [0xb0, 0x9e], []]
].forEach(([data, key, expected], idx) => {
  if (idx > 0) {
    console.log(new Array(64).fill('-').join(''))
  }

  let ciphered
  if (typeof data === 'string') {
    console.log(`   encrypt \`${data}\` with key \`${key}\``)
    console.log('  encoded:', formatBuffer(Buffer.from(data, 'utf-8')))

    ciphered = rc4String(data, key)
    console.log('   actual:', formatBuffer(ciphered))

    if (expected != null) {
      const isMatched = isDataMatched(ciphered, expected)
      console.log(' expected:', formatBuffer(expected), isMatched ? '(matched)' : '(mismatched)')
    }

    const decrypted = rc4String(ciphered, key)
    console.log('decrypted:', formatBuffer(decrypted))
    const decoded = Buffer.from(decrypted).toString('utf-8')
    console.log(`  decoded: \`${decoded}\``, decoded === data ? '(matched)' : '(mismatched)')
  } else if (data.length != null) {
    console.log('   encrypt', formatBuffer(data), 'with key', formatBuffer(key))

    ciphered = rc4(data, key)
    console.log('   actual:', formatBuffer(ciphered))

    if (expected != null) {
      const isMatched = isDataMatched(ciphered, expected)
      console.log(' expected:', formatBuffer(expected), isMatched ? '(matched)' : '(mismatched)')
    }

    const decrypted = rc4(ciphered, key)
    console.log('decrypted:', formatBuffer(decrypted), isDataMatched(decrypted, data) ? '(matched)' : '(mismatched)')
  } else {
    console.error('unknown data type:', typeof data, data.constructor.name)
  }
})

module.exports = {
  rc4,
  rc4String,
  formatBuffer,
  encodeBase64,
  isDataMatched
}
