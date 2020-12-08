const { join } = require('path')

const ipAddrs = [
  '14.23.96.42', // Zhanghe Intelligence
  '149.129.87.21', // Alicloud HK
  '166.111.4.100' // Tsinghua University
]

const mmdb = async (ip, lang = 'zh-CN') => {
  const maxmind = require('maxmind')
  const smallerDivisionFirst = ['de', 'en', 'es', 'fr', 'pt-BR']

  return maxmind.open(join(__dirname, 'GeoLite2-City.mmdb'))
    .then(lookup => {
      const location = lookup.get(ip)
      const { continent, country, subdivisions = [], city } = location
      const divs = [continent, country, ...subdivisions, city]
        .filter(div => div != null) // filter nully divisions
        .map(div => div.names[lang])
        .filter(div => div) // filter lacking name for specific language
      return smallerDivisionFirst.includes(lang)
        ? divs.reverse().join(', ')
        : divs.join(' ')
    })
}

const awdb = async ip => {
  const reader = require('awdb_nodejs')
  return reader.open(join(__dirname, 'IP_trial_single_WGS84.awdb'))
    .then((reader) => {
      const result = reader.get(ip)
      // console.table(Object.fromEntries(Object.entries(result)
      //   .map(([key, val]) => [key, val.toString()])))
      const { continent, country, province, city, district } = result
      const divs = [continent, country, province, city, district]
        .filter(div => div != null) // filter nully divisions
        .map(div => div.toString())
        .filter(div => div) // filter lacking name for specific language
      return divs.join(' ')
    })
}

const dumap = async ip => {
  const axios = require('axios')
  const { createHash } = require('crypto')
  const { URL } = require('url')

  const dumapAccessKey = '437ac15ed635abf2f8a53af8e8aa4277'
  const dumapSecretKey = '408672ab331207a509dcd457ba3846c5'

  const reqUrl = new URL('/location/ip', 'https://api.map.baidu.com')
  const queryPath = [reqUrl.pathname, reqUrl.search].join('?')

  const hasher = createHash('md5')
  hasher.update(encodeURIComponent(queryPath) + dumapSecretKey)
  const sn = hasher.digest('hex')

  const options = {
    method: 'GET',
    params: {
      ip,
      ak: dumapAccessKey,
      sn,
      coor: 'bd09ll'
    },
    url: reqUrl.toString()
  }

  try {
    const resp = await axios(options)
    if (resp.status === 200) {
      const { content, status } = resp.data
      if (status !== 0) {
        console.log(resp.data)
        return
      }
      const { province, city } = content.address_detail
      return [province, city].join(' ')
    }
  } catch (err) {
  // do nothing
  }
}

(async function() {
  const databases = { mmdb, awdb, dumap }
  console.table(await Promise.all(ipAddrs.map(async ip => {
    const dbResults = await Promise.all(Object.entries(databases)
      .map(async ([name, fn]) => [name, await fn(ip)]))
    return {
      ip,
      ...Object.fromEntries(dbResults)
    }
  })))
})()
