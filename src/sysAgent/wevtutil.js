const wevtutil = require('wevtutil')

function processEvent(event) {
  console.log(event.pid)
}

// eslint-disable-next-line no-unused-vars
const logger = wevtutil({
  channels: [
    'Microsoft-Windows-AppHost/Admin',
    'Microsoft-Windows-AppHost/ApplicationTracing'
  ],
  processor: processEvent
})
