// const bs58 = require('bs58')
const { createHmac } = require('crypto')

function generateKey(device) {
  const { productModel, serialNumber } = device
  const hmac = createHmac('sha256', 'jcXhADwzuaG7l3dW')
  hmac.update(JSON.stringify({
    productModel,
    serialNumber
  }))
  const httpKey = hmac.digest('hex')
  // const httpKey = bs58.encode(hmac.digest())

  return httpKey
}

console.log(generateKey({
  productModel: 'LGT_1300',
  serialNumber: 'sAjC3EllRc'
}))
