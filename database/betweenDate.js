const { Op } = require('sequelize')
const { Patient } = require('./dbdef-ot')

Patient.count({
  where: {
    createdAt: { [Op.between]: [new Date('2020-02-02'), Date.now()] }
  },
  logging: console.log
}).then(console.log)
