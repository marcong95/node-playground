function Foo() {
  getName = function() {
    console.log(1)
  }
  return this
}

Foo.getName = function() {
  console.log(2)
}

Foo.prototype.getName = function() {
  console.log(3)
}

var getName = function() {
  console.log(4)
}

function getName() {
  console.log(5)
}

;(function() {
  console.log((this === global ? 'not ' : '') + 'at strict mode')
})()
console.log(Foo() === global)
console.log(Foo().getName())
