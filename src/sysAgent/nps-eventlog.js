const Shell = require('node-powershell')
const ps = new Shell({
  executionPolicy: 'Bypass',
  noProfile: true
})

ps.addCommand('Get-EventLog -LogName System -Source "Microsoft-Windows-Kernel-Boot" -After 18/12/05')
ps.invoke().then(output => {
  console.log(output)
  console.log(output.substr(0, 100))
  ps.dispose()
}).catch(err => {
  console.log(err)
  console.log(err.substr(0, 100))
  ps.dispose()
})
