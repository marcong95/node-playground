const si = require('systeminformation');

// full async / await example (node >= 7.6)
(async function cpu() {
  try {
    const data = await si.cpu();
    console.log(data)
  } catch (e) {
    console.log(e)
  }
})();
