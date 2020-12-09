const seq = new Array(100).fill(0).map((_v, idx) => idx + 1)

const solutions = {
  strcatWithIf: seq => seq.map(num => {
    let res = ''
    if (num % 3 === 0) {
      res += 'Fizz'
    }
    if (num % 5 === 0) {
      res += 'Buzz'
    }
    return res || num
  }),

  strcatWithoutIf: seq => seq.map(num => [
    num % 3 === 0 ? 'Fizz' : '',
    num % 5 === 0 ? 'Buzz' : ''
  ].join('') || num)
}

console.log(Object.entries(solutions)
  .map(([name, fn]) => [name, fn(seq)]))
