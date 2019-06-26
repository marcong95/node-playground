const unparsable = 'The quick brown fox jumps over the lazy dog.'

;(function tryParse (str) {
  try {
    const parsed = JSON.parse(str)
    console.log('JSON parsed:', parsed)
    return parsed
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.log('Not a parsable JSON string:', str)
      return str
    } else {
      throw err
    }
  }
})('c31c0b70-5451-11e9-b17c-bf54ee0bfa98')
