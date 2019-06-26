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
      heap.heapify()
    }

    return heap
  }

  toArray() {
    return this.tree.slice()
  }

  get top() {
    return this.tree[0]
  }

  set top(value) {
    this.tree[0] = value
  }

  get size() {
    return this.tree.length
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

  siftDown(index, length) {
    if (length == null) {
      length = this.size
    }
    // console.log('sifting down, heap size = ' + length)

    let left, right
    do {
      left = this._getLeftChildIndex(index)
      right = this._getRightChildIndex(index)
      let largest = index

      if (left < length && this.compare(this.tree[largest], this.tree[left]) < 0) {
        largest = left
      }
      if (right < length && this.compare(this.tree[largest], this.tree[right]) < 0) {
        largest = right
      }

      if (largest !== index) {
        // console.log(`swapping #${index}(${this.tree[index]}) &` +
        //   ` #${largest}(${this.tree[largest]})`)
        this._swap(index, largest)
      } else {
        return
      }
      index = largest
    } while (true)
  }

  heapify(length) {
    if (length == null) {
      length = this.size
    }

    // heapify from the first non-leaf node
    const firstNonLeaf = Math.floor(length / 2 - 1)
    // console.log('heapify ' + this.toArray() + ' from #' + firstNonLeaf)

    for (let i = firstNonLeaf; i >= 0; i--) {
      // console.log(`heapify #${i}(${this.tree[i]})`)
      this.siftDown(i, length)
      // console.log('    got ' + this.toArray())
    }
  }

  sort() {
    for (let i = this.size; i > 0; i--) {
      this._swap(0, i - 1)
      // console.log(this.toArray().slice(0, i), this.toArray().slice(i + 1))
      this.heapify(i - 1)
      // console.log(this.toArray().slice(0, i), this.toArray().slice(i + 1))
    }
    return this.toArray()
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
  // test for push or pop
  const heap1 = BinaryHeap.fromArray([9, 5, 8, 4], MAX_HEAP, false)
  heap1.push(10)
  console.log(heap1.toArray())
  heap1.pop()
  console.log(heap1.toArray())

  // test for heapify
  const heap2 = BinaryHeap.fromArray([7, 5, 19, 8, 4, 1, 20, 13, 16])
  console.log(heap2.toArray())
  console.log(heap2.sort())
}
