var usbDetect = require('usb-detection')
// var iconv = require('iconv-lite')
// var jschardet = require('jschardet')

usbDetect.startMonitoring()

// Detect add/insert
usbDetect.on('add', getUsbDetectHandler('add'))

// Detect remove
usbDetect.on('remove', getUsbDetectHandler('remove'))

// Detect add or remove (change)
usbDetect.on('change', getUsbDetectHandler('change'))

function getUsbDetectHandler(type) {
  return function(device) {
    Object.entries(device)
      .forEach(([key, val]) => {
        if (typeof val === 'string') {
          console.log(val, Array.from(val).map(ch => ch.charCodeAt(0).toString(16)).join(' '))
        }
      })
    console.log(type, device)
  }
}
