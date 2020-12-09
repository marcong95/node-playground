/* References:
 * https://2ality.com/2012/01/objects-as-maps.html
 */

class Clazz {
  static staticProp = 'staticProp'

  prop = 'prop'

  static staticMethod() {
    console.log('static method')
  }

  method() {
    console.log('method')
  }

  async asyncMethod() {
    console.log('async method')
  }
}

const ins = new Clazz()
// console.log(Reflect.ownKeys(Clazz.prototype))
// console.log(Reflect.ownKeys(ins.constructor.prototype))
// console.log(Reflect.ownKeys(ins.__proto__))
// console.log(Reflect.ownKeys(Reflect.getPrototypeOf(ins)))
// console.log(Object.keys(Object.getPrototypeOf(ins)))
// console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(ins)))

console.log(Object.keys(ins))
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(ins)))

console.log(Object.keys(Clazz))
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(Clazz)))

module.exports = Clazz;
