function zeros(shape) {
  if (shape && shape.length > 0) {
    const [len, ...rest] = shape
    return new Array(len)
      .fill(null)
      .map(() => zeros(rest))
  } else {
    return 0
  }
}

function levenshtein(fst, snd, { logDPMatrix } = {}) {
  const dp = zeros([fst.length + 1, snd.length + 1])

  for (let i = 0; i <= fst.length; i++) {
    dp[i][0] = i
  }
  for (let j = 0; j <= snd.length; j++) {
    dp[0][j] = j
  }

  for (let i = 1; i <= fst.length; i++) {
    for (let j = 1; j <= snd.length; j++) {
      if (fst[i - 1] === snd[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1], // substitute
          dp[i][j - 1], // insert
          dp[i - 1][j] // delete
        ) + 1
      }
    }
  }

  if (logDPMatrix) {
    logDPMatrix(dp)
  }

  return dp[fst.length][snd.length]
}

function _lcsDp(fst, snd) {
  const dp = zeros([fst.length + 1, snd.length + 1])

  for (let i = 1; i <= fst.length; i++) {
    for (let j = 1; j <= snd.length; j++) {
      if (fst[i - 1] === snd[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp
}

function _getLCS(dp, fst, snd, i = fst.length, j = snd.length) {
  if (i <= 0 || j <= 0) {
    return ''
  }

  const curr = dp[i][j]
  const left = dp[i][j - 1]
  const up = dp[i - 1][j]
  if (curr === up + 1 && curr === left + 1) {
    // upper-left
    return _getLCS(dp, fst, snd, i - 1, j - 1) + fst[i - 1]
  } else if (curr === up + 1) {
    // left
    return _getLCS(dp, fst, snd, i, j - 1)
  } else {
    // up
    return _getLCS(dp, fst, snd, i - 1, j)
  }
}

function longestCommonSubsequence(fst, snd, { logDPMatrix } = {}) {
  const dp = _lcsDp(fst, snd)

  if (logDPMatrix) {
    logDPMatrix(dp)
  }

  return _getLCS(dp, fst, snd)
}

function _getSES(dp, fst, snd, i = fst.length, j = snd.length) {
  if (i <= 0 && j <= 0) {
    return []
  } if (i === 0) {
    // left
    return _getSES(dp, fst, snd, i, j - 1).concat([{
      op: 'insert',
      index: i - 1,
      char: snd[j - 1]
    }])
  } else if (j === 0) {
    // up
    return _getSES(dp, fst, snd, i - 1, j).concat([{
      op: 'remove',
      index: i - 1,
      char: fst[i - 1]
    }])
  } else if (i < 0 || j < 0) {
    throw new Error(`Reach (${i}, ${j}) when backtracking.`)
  }

  const curr = dp[i][j]
  const left = dp[i][j - 1]
  const up = dp[i - 1][j]
  if (curr === up + 1 && curr === left + 1) {
    // upper-left
    return _getSES(dp, fst, snd, i - 1, j - 1).concat([{
      op: 'common',
      index: i - 1,
      char: fst[i - 1]
    }])
  } else if (curr === up + 1) {
    // left
    return _getSES(dp, fst, snd, i, j - 1).concat([{
      op: 'insert',
      index: i - 1,
      char: snd[j - 1]
    }])
  } else {
    // up
    return _getSES(dp, fst, snd, i - 1, j).concat([{
      op: 'remove',
      index: i - 1,
      char: fst[i - 1]
    }])
  }
}

function shortestEditScript(fst, snd, { logDPMatrix, logSES } = {}) {
  const dp = _lcsDp(fst, snd)

  if (logDPMatrix) {
    logDPMatrix(dp)
  }
  const ses = _getSES(dp, fst, snd)
  if (logSES) {
    logSES(ses)
  }

  return ses
}

module.exports = {
  levenshtein,
  longestCommonSubsequence,
  shortestEditScript
}

if (require.main === module) {
  const options = {
    logDPMatrix: matrix => {
      matrix.forEach(row => console.log(row.join(' ')))
      console.log()
    },
    logSES: ops => {
      const chalk = require('chalk')
      const formatted = ops.map(op => ({
        insert: chalk.green,
        remove: chalk.red
      }[op.op] || chalk.reset)(op.char)).join('')
      console.log(`visualization: ${formatted}`)
    }
  }
  Object.entries(module.exports).forEach(([name, algo]) => {
    console.log(`-------- ${name} --------\n`)
    const result = algo('kitten', 'sitting', options)
    // const result = algo('cbabac', 'abcabba', options)
    if (typeof result === 'object') {
      process.stdout.write('result: ')
      console.dir(result)
    } else {
      console.log(`result: ${result}\n`)
    }
  })
}
