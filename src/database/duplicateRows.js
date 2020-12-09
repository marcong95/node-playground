const uuid = require('uuid')
const { sequelize, Patient } = require('./dbdef-iot')

const whereToDuplicate = {
  mrNumber: 'BILI2333'
}
const duplicateAmount = 50

// const { Op } = require('sequelize')
// Patient.destroy({
//   where: {
//     mrNumber: { [Op.like]: 'BILI2333_%' }
//   }
// })
// return /* eslint-disable no-unreachable, no-useless-return */

Patient.findAll({
  where: whereToDuplicate
}).then(data => {
  if (data.length <= 0) {
    console.error('no record found with specified condition')
  }
  return Patient.bulkCreate(new Array(duplicateAmount)
    .fill(null)
    .map((_null, idx) => Object.assign({}, data[idx % data.length].get(), {
      guid: uuid().replace(/\w{8}/, '2333abcd'),
      mrNumber: data[idx % data.length].get('mrNumber') + `_${idx}`,
      createdAt: new Date(2019, 6, 4, 23, idx + Math.floor(idx / 60), idx % 60)
    })))
}).catch(err => {
  console.error(err.message)
  console.error(err.errors)
}).finally(() => {
  sequelize.close()
})
