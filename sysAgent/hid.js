const HID = require('node-hid')
const devices = HID.devices()

console.log(devices.map(device => device.product).join('\n'))
