const { Client } = require('zerorpc')
const client = new Client()
client.connect('tcp://127.0.0.1:4242')
client.invoke('add', 1, 2, (err, resp, extra) => {
  console.log(err, resp, extra)
})
