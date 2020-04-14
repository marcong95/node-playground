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

// Levenshtein Distance
function levDist(fst, snd, logging) {
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

  if (logging) {
    logging(dp)
  }

  return dp[fst.length][snd.length]
}

module.exports = levDist

if (require.main === module) {
  console.log(levDist('kitten', 'sitting', matrix => {
    matrix.forEach(row => console.log(row.join(' ')))
  }))
}
