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
    const resp = await client.invokeAsync('init_robot', '192.168.227.128', 30004)
    console.log(resp)
  } catch (err) {
    console.error(err)
  } finally {
    client.close()
  }
})()
