const uuid = require('uuid')
// const { Op } = require('sequelize')
const { sequelize, Report } = require('./dbdef-iot')

const whereToDuplicate = {
  mrNumber: 'BILI2333'
}
const duplicateAmount = 100

// Report.destroy({
//   where: {
//     guid: { [Op.like]: '2333abcd%' }
//   }
// })
// return /* eslint-disable no-unreachable, no-useless-return */
Report.findAll({
  where: whereToDuplicate
}).then(data => {
  if (data.length <= 0) {
    console.error('no record found with specified condition')
  }
  return Report.bulkCreate(new Array(duplicateAmount)
    .fill(null)
    .map((_v, idx) => Object.assign({}, data[idx % data.length].get(), {
      guid: uuid().replace(/\w{8}/, '2333abcd')
    })))
}).catch(err => {
  console.error(err.message)
  console.error(err.errors)
}).finally(() => {
  sequelize.close()
})
