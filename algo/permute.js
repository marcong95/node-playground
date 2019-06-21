/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteUnique = function(nums) {
  const result = []
  _permuteUnique(nums, 0, nums.length - 1, result)
  return result
}

const shouldSwap = function(nums, from, to) {
  for (let i = from; i < to; i++) {
    if (nums[i] === nums[to]) {
      return false
    }
  }
  return true
}

const _permuteUnique = function(nums, from, to, acc) {
  if (from === to) {
    acc.push([...nums])
  } else {
    for (let i = from; i <= to; i++) {
      if (shouldSwap(nums, from, i)) {
        ;[nums[i], nums[from]] = [nums[from], nums[i]]
        _permuteUnique(nums, from + 1, to, acc)
        ;[nums[i], nums[from]] = [nums[from], nums[i]]
      }
    }
  }
}

// permuteUnique([1, 2, 3])
console.dir(permuteUnique([1, 2, 3, 4]))
// console.dir(permute([1, 2, 3]))
