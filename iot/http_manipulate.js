const axios = require('axios')

const data = {
  requestId: '2cf2fc0b-16d5-4d31-ad57-63aea0e6253c',
  desired: { treatmentTime: '40' }
}
const body = JSON.stringify(data)

axios.post(
  'https://api.mqtt.iot.gz.baidubce.com/v1/proxy', body, {
    params: {
      qos: 0,
      topic: '$baidu/iot/shadow/LGT_1300_q2M1nwRx9t_X2xr/update',
      retain: 'false'
    },
    headers: {
      'auth.username': '3h9za31/LGT_1300_q2M1nwRx9t_X2xr',
      'auth.password': '1nzqwxmqy4eb0jf4',
      'content-type': 'application/octet-stream'
    // },
    // proxy: {
    //   host: '127.0.0.1',
    //   port: 8888
    }
  })
  .then(resp => {
    console.log(resp.status + ' ' + resp.statusText)
    console.log('---------------- HEADER ----------------')
    console.log(resp.headers)
    console.log('----------------  BODY  ----------------')
    console.log('typeof: ' + typeof resp.data)
    console.log(resp.data)
  })
  .catch(console.error)
