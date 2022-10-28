const dayjs = require('dayjs')
const randomstring = require('randomstring')
// const uuid = require('uuid')
const { sequelize, Patient, Report } =
  require('./dbdef-iot').initWithSequelizeOptions()

;(async function() {
  const patient = await Patient.findOne({
    where: {
      mrNumber: 'WELH1234'
    }
  })
  if (patient == null) {
    console.error('Patient not found')
    return
  }
  await patient.update({
    remark: randomstring.generate(4) + dayjs().format('HHmmss'),
    commitTime: Date.now()
  })
  console.log(`patient.remark => ${patient.get('remark')}`)

  const report = await Report.findOne({
    where: {
      guid: '91fbbf10-a6ce-11ea-ad50-e7e4e9920efa'
      // patientId: patient.get('guid')
    },
    attributes: { exclude: ['data1', 'data2', 'data3'] }
  })
  await report.update({
    remark: randomstring.generate(4) + dayjs().format('HHmmss'),
    commitTime: Date.now()
  })
  console.log(`report.remark => ${report.get('remark')}`)
})().catch(err => {
  console.error(err)
}).finally(() => {
  sequelize.close()
})
