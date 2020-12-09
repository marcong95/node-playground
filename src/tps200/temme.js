// const { compact, uniq } = require('lodash')
const fs = require('fs')
const path = require('path')
const temme = require('temme').default

const MAX_OSCLASS_COUNT = 4
const selector = `
  address[addrtype=ipv4][addr=$ip];
  address[addrtype=mac][addr=$mac];
  port@openPort {
    &[portid=$];
  }
  osmatch@guess||distribute|emptyableFlatten|slice(0, ${MAX_OSCLASS_COUNT}) {
    &[name=$name];
    osclass@children {
      &[type=$type];
      &[vendor=$vendor];
      &[osfamily=$osfamily];
      &[osgen=$osgen];
    }
  }
  hosts[up=$up][down=$down];
`
const extraFilters = {
  distribute(to = 'children') {
    const distributees = this[to]
    delete this[to]
    return distributees.map(obj => Object.assign({}, this, obj))
  },

  emptyableFlatten() {
    return this.reduce((r, a) => r.concat(a), [])
  }
}
const parse = xml => temme(xml, selector, extraFilters)

if (require.main === module) {
  fs.readFile(path.resolve(__dirname, './h3c.xml'), (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const result = parse(data)
    console.dir(result, { depth: 5 })
  })
}
module.exports = parse
