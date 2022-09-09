const { exec } = require('child_process')
const { promises: fsp } = require('fs')
const { promisify } = require('util')

const execPromise = promisify(exec)

;(async function() {
  const pid = await fsp.readFile(
    String.raw`C:\Program Files\mosquitto\pid_file`)
  const cmd = `[System.Threading.EventWaitHandle]::OpenExisting("mosq${pid}_reload").Set()`
  try {
    const [stdout, stderr] = await execPromise(cmd, {
      shell: 'powershell.exe',
      encoding: 'gb2312'
    })
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
  } catch (error) {
    console.error('exec error:', error.message)
  }
})()
