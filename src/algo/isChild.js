function isChild(ageStr) {
  // age '20岁/13月'
  const isMonth = ageStr.slice(-1) === '月'
  const age = ageStr.split(/[岁|月]/)[0]
  const lessThan = 6 * (1 + 11 * isMonth)
  const result = parseInt(age) <= lessThan
  return { input: ageStr, isMonth, age, lessThan, result }
}

function isChild2(age) {
  const { yr, mo } = (/(?<yr>\d+岁)?(?<mo>\d+月)?/.exec(age) || {}).groups || {}
  const totalMonths = parseInt(yr || 0) * 12 + parseInt(mo || 0)
  return {
    reMatch: /(?<yr>\d+岁)?(?<mo>\d+月)?/.exec(age),
    yr,
    mo,
    totalMonths,
    result: totalMonths <= 72
  }
}

console.table([undefined, null, '', '13月', '2岁3月', '20岁', '23岁6月'].map(isChild2))
