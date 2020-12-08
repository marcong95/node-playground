const _ = require('lodash')
const romConfig = require('./romConfig')

const widths = romConfig.map(cfg => {
  if (cfg == null) {
    return -Infinity
  }

  const groups = /width:\s?(\d+)px;/.exec(cfg.protractorStyle)
  if (groups != null && groups.length > 1) {
    return parseInt(groups[1])
  } else {
    console.log(cfg.index, cfg.protractorStyle)
    return -Infinity
  }
})
// console.log(widths)
console.log(Math.max(...widths))

const pointerOrigins = romConfig.map(cfg => {
  if (cfg == null) {
    return ''
  }

  const groups = /-webkit-transform-origin:([\w %]+);/.exec(cfg.pointerStyle)
  if (groups != null && groups.length > 1) {
    return groups[1]
  } else {
    console.log(cfg.index, cfg.pointerStyle)
    return ''
  }
})
console.log(_.chain(pointerOrigins)
  .groupBy()
  .mapValues(grp => grp.length)
  .value())
