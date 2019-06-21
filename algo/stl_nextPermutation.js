// try reimplement next_permutation in C++ STL using JavaScript

/**
 * @param {number[]} indicies
 * @return {boolean} whether the indicies has next permutation
 */
function nextPermutation(indicies) {
  if (indicies.length < 2) {
    return false
  }

  let i = indicies.length - 1
  while (true) {
    let j = i--

    if (indicies[i] < indicies[j]) {
      let k = indicies.length

      while (!(indicies[i] < indicies[--k]));
      [indicies[i], indicies[k]] = [indicies[k], indicies[i]]
      // doesn't affect indicies
      indicies = indicies.slice(0, j).concat(indicies.slice(j).reverse())
      return true
    }
    if (i <= 0) {
      indicies.reverse()
      return false
    }
  }
}

function permute(list) {
  const indicies = new Array(list.length).fill(0).map((v, i) => i)
  do {
    console.log(indicies.map(i => list[i]))
  } while(nextPermutation(indicies))
}

permute([0, 1, 2, 3])
