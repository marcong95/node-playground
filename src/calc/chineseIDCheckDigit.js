const WEIGHT = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]

function calculateCheckDigit(idNumber) {
  if (idNumber.length < WEIGHT.length) {
    throw new Error('Input argument should be 17 or 18 characters length')
  }
  const digits = String(idNumber).substring(0, 17).split('')
  const sum = digits.reduce((acc, digit, index) => acc + digit * WEIGHT[index], 0)
  const checkDigit = (12 - (sum % 11)) % 11
  return checkDigit === 10 ? 'X' : checkDigit.toString()
}

for (let suffix = 0; suffix <= 0b111; suffix++) {
  const id17 = '22022220220222' + suffix.toString(2).padStart(3, '0').replace(/1/g, '2')
  const checkDigit = calculateCheckDigit(id17)
  console.log(id17 + checkDigit)
}
