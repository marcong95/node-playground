const crypto = require('node:crypto')

const randomstring = require('randomstring')

function run(algorithm) {
  const key = Buffer.from(randomstring.generate({
    length: 32,
    charset: 'hex'
  }), 'hex')
  const iv = Buffer.from(randomstring.generate({
    length: 32,
    charset: 'hex'
  }), 'hex')

  const timeStarted = Date.now()

  const cipher = crypto.createCipheriv(algorithm, key, iv)

  cipher.final('hex')

  return Date.now() - timeStarted
}

run('aes-128-cbc')
