// based on: https://gist.github.com/ChrisJefferson/cb8db2a4c67a9506c56c
exports.cartesianProduct = function(...arrays) {
  return arrays.reduce((a, b) =>
    a.flatMap(x =>
      b.map(y =>
        [...x, y]
      )), [[]])
}
