const { BinaryHeap } = require('./DSImpl/Heap')

function heapSort(list) {
  const heap = BinaryHeap.fromArray(list)
  console.log(heap.top)
}

module.exports = {
  heapSort
}

if (require && require.main === module) {
  console.log(heapSort([9, 5, 8, 4]))
}
