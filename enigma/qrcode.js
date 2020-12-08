var QRCode = require('qrcode')

QRCode.toDataURL('WIFI:T:WPA2;S:Just WiFi 5G;P:IAmJustAWiFiPassword;;', {
  margin: 4,
  scale: 2
})
  .then(console.log)
  .catch(console.error)
