const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

const xmlPath = path.resolve(__dirname, '../input/bm_rom_test_joint', '0', 'Data.xml')
const file = fs.readFileSync(xmlPath)

const $ = cheerio.load(file.toString(), {
  normalizeWhitespace: true,
  xmlMode: true
})
const $data = $('Content_CN')
const nameTag = $data.find('actionName')
console.log(nameTag.text())
