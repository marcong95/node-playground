const axios = require('axios')

const data = {
  reported: {
    onoff: 0,
    gps: {
      latitude: 23.12908,
      longitude: 113.26436
    },
    param: {
      frequency: 233
    }
  }
}
const body = JSON.stringify(data)

axios.post(
  'https://api.mqtt.iot.gz.baidubce.com/v1/proxy', body, {
    param: {
      qos: 0,
      topic: '$baidu/iot/shadow/DeviceWithLocation/update',
      retain: 'false'
    },
    headers: {
      'auth.username': 'b2xf8wk/DeviceWithLocation',
      'auth.password': 'Gncvsi3SBzJDgt2o',
      'content-type': 'application/octet-stream'
    }
  })
  .then(console.log)
  .catch(console.error)
