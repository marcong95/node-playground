const { zip } = require('lodash')

function hex2vec(hexColor) {
  if (hexColor.length === 4 || hexColor.length === 7) {
    const match = /#([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})/.exec(hexColor)
    if (match != null) {
      let components = match.slice(1)
      if (components[0].length === 1) {
        // #abc -> #aabbcc
        components = components.map(ch => ch + ch)
      }
      // const [red, green, blue] = components
      //   .map(comp => parseInt(comp, 16))
      // return { red, green, blue }
      return components
        .map(comp => parseInt(comp, 16))
    }
  }

  throw new Error('Invaild hex color string: ' + hexColor)
}

function alphaMix(foreground, alpha, background = '#fff') {
  if (typeof foreground === 'string') {
    foreground = hex2vec(foreground)
  }
  if (typeof background === 'string') {
    background = hex2vec(background)
  }
  const vec = zip(foreground, background)
    .map(([fg, bg]) => alpha * fg + (1 - alpha) * bg)
  return '#' + vec.map(comp => Math.ceil(comp).toString(16))
    .join('')
}

function inverseAlphaMix(color1, color2, background = '#fff') {
  if (typeof color1 === 'string') {
    color1 = hex2vec(color1)
  }
  if (typeof color2 === 'string') {
    color2 = hex2vec(color2)
  }
  if (typeof background === 'string') {
    background = hex2vec(background)
  }
  return zip(color1, background, color2)
    .map(([a, b, c]) => (c - b) / (a - b))
}

console.log(alphaMix('#3095f6', 0.6))
console.log(inverseAlphaMix('#3095f6', '#7fbffc'))
