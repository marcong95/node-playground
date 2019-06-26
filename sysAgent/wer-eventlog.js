const eventlog = require('windows-eventlog-reader')
const reader = eventlog.createReader('Security')

function feedCb (event) {
  console.dir(event)
}

function doneCb (error) {
  console.error(error.toString())
}

reader.readAll(1, feedCb, doneCb)
