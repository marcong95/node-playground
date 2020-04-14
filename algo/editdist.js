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

function getLCSFromMatrix(matrix, fst, i = fst.length, j = matrix.length) {
  if (i <= 0 || j <= 0) {
    return ''
  }
}

function longestCommonSubsequence(fst, snd, { logDPMatrix } = {}) {
  const dp = zeros([fst.length + 1, snd.length + 1])

  for (let i = 1; i <= fst.length; i++) {
    for (let j = 1; j <= snd.length; j++) {
      if (fst[i - 1] === snd[j - 1]) {
        dp[i][j] = dp[i][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  if (logDPMatrix) {
    logDPMatrix(dp)
  }

  return getLCSFromMatrix(dp, fst)
}

function shortedEditScript(fst, snd) {}

module.exports = {
  levenshtein,
  longestCommonSubsequence,
  shortedEditScript
}

if (require.main === module) {
  const options = {
    logDPMatrix: matrix => {
      matrix.forEach(row => console.log(row.join(' ')))
      console.log()
    }
  }
  Object.entries(module.exports).forEach(([name, algo]) => {
    console.log(`-------- ${name} --------\n`)
    const result = algo('kitten', 'sitting', options)
    console.log(`result: ${result}\n`)
  })
}
