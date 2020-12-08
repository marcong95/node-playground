const dayjs = require('dayjs')
const randomstring = require('randomstring')
// const uuid = require('uuid')
const { sequelize, Patient, Report } = require('./dbdef-gw')

;(async function() {
  const patient = await Patient.findOne({
    where: {
      mrNumber: 'IOT0TEST'
    }
  })
  if (patient == null) {
    console.error('Patient not found')
    return
  }
  await patient.update({
    remark: randomstring.generate(4) + dayjs().format('HHmmss'),
    needCommit: 1
  })
  console.log(`patient.remark => ${patient.get('remark')}`)

  const report = await Report.findOne({
    where: {
      patientId: patient.get('guid')
    },
    attributes: { exclude: ['data1', 'data2', 'data3'] }
  })
  await report.update({
    remark: randomstring.generate(4) + dayjs().format('HHmmss'),
    needCommit: 1
  })
  console.log(`report.remark => ${report.get('remark')}`)
})().catch(err => {
  console.error(err)
}).finally(() => {
  sequelize.close()
})
