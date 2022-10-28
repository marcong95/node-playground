const dayjs = require('dayjs')
const randomstring = require('randomstring')
// const uuid = require('uuid')
const { sequelize, Patient } =
  require('./dbdef-iot').initWithSequelizeOptions()

;(async function() {
  // const [rowsAffected] = await Patient.update({
  //   'data1.something': randomstring.generate(4) + dayjs().format('HHmmss')
  // }, {
  //   where: {
  //     guid: 'a340b590-e748-11ea-a765-a3db57e736f0'
  //   }
  // })
  // console.log('data1.something manipulated for ' + rowsAffected + ' patients')

  const patient = await Patient.findByPk('a340b590-e748-11ea-a765-a3db57e736f0')

  // ONLY set-save can manipulate nested json field, rather than static/instance method `update`
  await patient.set('data1.something', randomstring.generate(4) + dayjs().format('HHmmss'))
  await patient.save()

  // await patient.update('data1.something', randomstring.generate(4) + dayjs().format('HHmmss'))
  console.log('patient.data1 => ' + JSON.stringify(patient.get('data1')))
})().catch(err => {
  console.error(err)
}).finally(() => {
  sequelize.close()
})
