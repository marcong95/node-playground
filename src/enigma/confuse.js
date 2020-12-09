const _ = require('lodash')

function confuse(str, chunkSize = 2) {
  const confuseGroupRE = new RegExp(_.repeat('.', chunkSize), 'gu')
  return str.replace(confuseGroupRE,
    chunk => chunk.split('').reverse().join(''))
}

module.exports = confuse
