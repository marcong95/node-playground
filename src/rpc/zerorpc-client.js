const { setTimeout } = require('timers/promises')
const { Client } = require('zerorpc')

class PromisifiedClient extends Client {
  invokeAsync(method, ...args) {
    return new Promise((resolve, reject) => {
      this.invoke(method, ...args, (error, response/* , more */) => {
        console.log('invoking', method, args);
        if (error != null) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
}

const client = new PromisifiedClient()
client.connect('tcp://127.0.0.1:4242')

// client.invoke('init_robot', '192.168.227.128', 30004, (err, resp, extra) => {
//   console.log(err, resp, extra)
// })

;(async function() {
  try {
    console.log(await client.invokeAsync('add', 1, 2))
    await setTimeout(1000)
    console.log(await client.invokeAsync('init_robot', '192.168.227.128', 30004))
  } catch (err) {
    console.error(err)
  } finally {
    client.close()
  }
})()
