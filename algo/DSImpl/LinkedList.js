const { deepStrictEqual } = require('assert')

class LinkedListNode {
  constructor (value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor () {
    this.head = null
    this.tail = null
  }

  static fromArray (arr) {
    const list = new LinkedList()
    arr.forEach(elmt => list.push(elmt))
    return list
  }

  toArray () {
    const arr = []
    let curr = this.head

    while (curr != null) {
      arr.push(curr.value)
      curr = curr.next
    }
    return arr
  }

  push (value) {
    const node = new LinkedListNode(value)
    if (this.head == null) {
      this.head = node
    }
    if (this.tail != null) {
      this.tail.next = node
    }
    this.tail = node
  }
}

module.exports = {
  LinkedListNode,
  LinkedList
}

// test cases
if (require && require.main === module) {
  deepStrictEqual(LinkedList.fromArray([1, 2, 3, 4]).toArray(), [1, 2, 3, 4])
  console.log('test passed')
}
