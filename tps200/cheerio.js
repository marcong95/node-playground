const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const { pick } = require('lodash')

const MAX_OSCLASS_COUNT = 4
function distribute () {
  const distributees = this.children
  delete this.children
  return distributees.map(obj => Object.assign({}, this, obj))
}

function parse (xml) {
  const $ = cheerio.load(xml, {
    xmlMode: true
  })

  const hosts = $('hosts')
  const osMatches = $('osmatch').map((_idx, el) => ({
    name: el.attribs.name,
    children: $('osclass', el).map((_idx, el) =>
      pick(el.attribs, ['type', 'vendor', 'osfamily', 'osgen'])).get()
  }))
    .map(distribute)
    .get()
    .slice(0, MAX_OSCLASS_COUNT)

  return {
    ip: $('[addrtype=ipv4]').attr('addr'),
    mac: $('[addrtype=mac]').attr('addr'),
    openPort: $('port').map((_idx, el) => el.attribs.portid).get(),
    guess: osMatches,
    up: hosts.attr('up'),
    down: hosts.attr('down')
  }
}

if (require.main === module) {
  fs.readFile(path.resolve(__dirname, './h3c.xml'), (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    console.dir(parse(data), { depth: 5 })
  })
}
module.exports = parse
