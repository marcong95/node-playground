const { LinkedListNode, LinkedList } = require('./DSImpl/LinkedList')
// const { deepStrictEqual } = require('assert')

class SortableLinkedList extends LinkedList {
  // in-place insertion sort
  insertionSort () {
    if (this.head == null) {
      return
    }

    let insertee = this.head
    while (insertee != null) {
      console.log('insertee', insertee.value)
      let curr = this.head
      while (curr != null && curr !== insertee) {
        console.log('comparing', curr.next.value, insertee.value)
        if (curr.next && curr.next.value <= insertee.value) {
          curr = curr.next
        } else {
          // -> curr -> insertee -> curr.next
          insertee.next = curr.next
          curr.next = insertee
          break
        }
      }
      insertee = insertee.next
    }
  }

  // not-in-place insertion sort, do not manipulate `this`
  insertionSorted () {
    const sorted = new LinkedList()

    let insertee = this.head
    while (insertee != null) {
      let curr = sorted.head

      while (curr != null) {
        if (curr.next && curr.next.value > insertee.value) {
          const newNode = new LinkedListNode(insertee.value)
          console.log(curr.value, newNode.value, curr.next.value)
          newNode.next = curr.next
          curr.next = newNode
          break
        }
        curr = curr.next
      }

      if (curr == null) {
        sorted.push(insertee.value)
        console.log(`${insertee.value} pushed ${sorted.toArray()}`)
      }

      insertee = insertee.next
    }

    return sorted
  }
}

// test cases
console.log(SortableLinkedList.fromArray([4, 2, 1, 3])
  .insertionSorted()
  .toArray())

// function sortTest(arr) {
//   const list = LinkedList.fromArray(arr)
//   list.insertionSort()
//   deepStrictEqual(list.toArray(), arr.sort())
// }

// sortTest([4, 2, 1, 3])
// sortTest([1, 5, 3, 4, 0])
