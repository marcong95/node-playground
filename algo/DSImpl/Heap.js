const MAX_HEAP = (a, b) => a - b
const MIN_HEAP = (a, b) => b - a

class BinaryHeap {
  constructor(compare = MAX_HEAP) {
    this.compare = compare
    this.tree = []
  }

  static fromArray(arr, compare, heapify = true) {
    const heap = new BinaryHeap(compare)
    heap.tree = arr

    if (heapify) {
      throw new Error('heapify not implemented')
    }

    return heap
  }

  toArray() {
    return this.tree.slice()
  }

  push(item) {
    this.tree.push(item)
    this.siftUp(this.size - 1)
  }

  pop() {
    const top = this.top
    this.top = this.tree[this.size - 1]
    this.tree.pop()
    this.siftDown(0)
    return top
  }

  get top() {
    return this.tree[0]
  }

  set top(value) {
    this.tree[0] = value
  }

  // delete(index) {}

  siftUp(index) {
    let parent
    while ((parent = this._getParentIndex(index)) >= 0) {
      if (this.compare(this.tree[parent], this.tree[index]) < 0) {
        this._swap(parent, index)
      } else {
        return
      }
      index = parent
    }
  }

  siftDown(index) {
    let left, right
    do {
      left = this._getLeftChildIndex(index)
      right = this._getRightChildIndex(index)
      let largest = index

      if (left <= this.size && this.compare(this.tree[index], this.tree[left]) < 0) {
        largest = left
      }
      if (right <= this.size && this.compare(this.tree[index], this.tree[right]) < 0) {
        largest = right
      }

      if (largest !== index) {
        this._swap(index, largest)
      } else {
        return
      }
      index = largest
    } while (true)
  }

  get size() {
    return this.tree.length
  }

  _swap(index1, index2) {
    const tmp = this.tree[index1]
    this.tree[index1] = this.tree[index2]
    this.tree[index2] = tmp
  }

  _getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  _getLeftChildIndex(index) {
    return index * 2 + 1
  }

  _getRightChildIndex(index) {
    return index * 2 + 2
  }
}

module.exports = {
  MAX_HEAP,
  MIN_HEAP,
  BinaryHeap
}

if (require && require.main === module) {
  const heap = BinaryHeap.fromArray([9, 5, 8, 4], MAX_HEAP, false)
  heap.push(10)
  console.log(heap.toArray())
  heap.pop()
  console.log(heap.toArray())
}
