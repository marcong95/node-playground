import fs from 'fs'
import toml from 'toml'
import readline from 'readline'
import * as Hangul from 'hangul-js'

const SCHEMA_FILE = './heda.toml'

const schema = toml.parse(fs.readFileSync(SCHEMA_FILE))

// 늬틔욤밍 쯜므쫑느
// const EONMON_CHAR_RE = /[\uac00-\ud7a3]/

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', handleLine)

function handleLine(line) {
  const byteLen = Buffer.from(line, 'utf-8').length
  const byteCharRatio = byteLen / line.length
  if (byteCharRatio >= 2) {
    // eonmon -> jyutping
    console.log('JYP>' + eonmonToJyutping(line))
  } else {
    // jyutping -> eonmon
    console.log('ENM>' + jyutpingToEonmon(line))
  }
}

function eonmonToJyutping(eonmon) {
  Hangul.disassemble(eonmon, true)
    .map()
}

function jyutpingToEonmon(jyutping) {}
