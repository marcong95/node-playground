class Clazz {
  prop = 'prop'

  method() {
    console.log('method')
  }

  async asyncMethod() {
    console.log('async method')
  }
}

const ins = new Clazz()
console.log(Reflect.ownKeys(Clazz.prototype))
console.log(Reflect.ownKeys(ins.constructor.prototype))
console.log(Reflect.ownKeys(ins.__proto__))
console.log(Reflect.ownKeys(Reflect.getPrototypeOf(ins)))
console.log(Object.keys(Object.getPrototypeOf(ins)))
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(ins)))

module.exports = Clazz;
