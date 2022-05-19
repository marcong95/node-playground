function nameAbbr(name) {
  const chineseChars = name
    .split('')
    .filter(ch => /[\u4e00-\u9fa5]/.test(ch))
    .join('')
  const spaceSplits = name.split(' ')
  console.log(name, chineseChars.length, spaceSplits.length)
  if (chineseChars.length > 0) {
    return chineseChars.slice(-2)
  } else if (spaceSplits.length > 1) {
    return spaceSplits.map(split => split[0]).join('')
  } else {
    return name.slice(0, 2)
  }
}

console.log(['张三', 'Cheung Saam', 'Marco', '浜崎あゆみ'].map(nameAbbr))
