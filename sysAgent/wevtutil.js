const wevtutil = require('./node-wevtutil');

function processEvent(event) {
  console.log(event.pid);
}

const logger = wevtutil({
  channels: [
    'Microsoft-Windows-AppHost/Admin',
    'Microsoft-Windows-AppHost/ApplicationTracing'
  ],
  processor: processEvent
});
