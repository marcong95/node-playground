const usb = require('usb');

console.log(usb.getDeviceList())
usb.on('attach', device => {
  console.log('attached: ', device);
})
usb.on('detach', device => {
  console.log('detached: ', device);
})
