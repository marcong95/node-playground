const isValidPassword = lines => {
  const [password] = lines

  const len = password.length
  if (len < 6) {
    console.log('Invalid - length')
    return
  }

  let lastChar
  let sameChar = 0
  let alpha = false
  let number = false

  for (let i = 0; i < len; i++) {
    const currChar = password.charAt(i).toLowerCase()
    if (currChar === lastChar) {
      console.log(sameChar)
      if (++sameChar >= 2) {
        console.log('Invalid - same char seq')
        return
      }
    } else {
      lastChar = currChar
      sameChar = 0
    }

    if (!number && /[0-9]/.test(currChar)) {
      number = true
    }
    if (!alpha && /[a-z]/.test(currChar)) {
      alpha = true
    }
  }

  if (alpha && number) {
    console.log('Valid')
  } else {
    console.log('Invalid - alpha/number')
  }
  console.log(len, sameChar, alpha, number)
}

isValidPassword([process.argv[2]])
