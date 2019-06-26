const fs = require('fs')
const path = require('path')
// const assert = require('assert')
const { isEqual } = require('lodash')

const result = new Map()
;['cheerio', 'temme', 'xml2js'].forEach((fnName, idx, fnNames) => {
  const fn = require(path.resolve(__dirname, fnName))
  fs.readFile(path.resolve(__dirname, './h3c.xml'), async (err, data) => {
    console.time(fnName)
    if (err) {
      console.error(err)
      return
    }

    for (let i = 0; i < 100; i++) {
      let parsed = fn(data)
      if (parsed instanceof Promise) {
        parsed = await parsed
      }
      if (i === 0) {
        result.set(fnName, parsed)
      }
    }
    console.timeEnd(fnName)

    // console.log(fnName + ':')
    // console.dir(result.get(fnName), { depth: 5 })

    if (idx > 0) {
      const lastFn = fnNames[idx - 1]
      if (!isEqual(result.get(fnName), result.get(lastFn))) {
        console.error(
          `result by ${fnName} is not deep equal to that by ${lastFn}.`)
      }
    }
  })
})
