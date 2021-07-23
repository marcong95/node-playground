const { zipWith } = require('lodash')

function compareVersion(one, another) {
  return zipWith(one.split('.'), another.split('.'),
    (o, a) => {
      const [on, an] = [o, a].map(s => parseInt(s, 10) || 0)
      return on - an
    })
    .reduce((acc, val) => acc || val, 0)
}

console.log([
  ['1', '2'],
  ['1.0', '1.1'],
  ['1.2.3', '2.1.4'],
  ['1.1.1', '1.1.1.1'],
  ['1.1.2', '1.1.1.1']
].map(args => [args, compareVersion(...args)]))

console.log([
  '1',
  '2',
  '1.0',
  '1.1',
  '1.2.3',
  '2.1.4',
  '1.1.1',
  '4.5.6',
  '11.4.514',
  '1.1.2',
  '1.1.1.1'
].sort(compareVersion))
