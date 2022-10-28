// const uuid = require('uuid')
// const { generate } = require('randomstring')

const Sequelize = require('sequelize')
const { initWithSequelizeInstance } = require('./dbdef-ot')

const sequelize = new Sequelize('dbzhanghe', null, null, {
  dialect: 'sqlite',
  storage: 'D:\\projects\\ot\\data\\nodedb',
  logging: false
})
const { Patient } = initWithSequelizeInstance(sequelize)

// const testdata = {
//   guid: uuid(),
//   name: 'Hoorah',
//   mrNumber: 'HRAH' + generate(4),
//   tag: '__dbtest__',
//   createdAt: null,
//   updatedAt: undefined
// }

const testdata = {
  _online: true,
  address: '',
  age: 0,
  birthday: null,
  commitTime: '2020-03-26T04:16:23.000Z',
  createdAt: '2019-02-21T03:15:57.000Z',
  data1: null,
  deviceId: '3065d47e-84b4-4668-89c2-3476a2a970fc',
  diagnosis: '',
  guid: '3ea35050-6f18-11ea-b267-4f9ed409a938',
  hospital: null,
  married: 2,
  mrNumber: '124',
  name: '小月',
  phone: '',
  productModel: 'LGT-4610',
  productName: '认知康复训练与评估软件',
  profileCreator: 'some000111',
  profileVersion: 0,
  recordState: 0,
  remark: '',
  serialNumber: 'some000111',
  sex: 0,
  summary: null,
  tag: '9',
  tall: 165,
  updatedAt: null,
  weight: 45,
  needCommit: 0
}

function removeNully(obj) {
  for (const attr in obj) {
    if (obj[attr] == null) {
      delete obj[attr]
    }
  }
}

function printNullyStatus(obj, attrName) {
  const { hasOwnProperty } = Object.prototype

  console.log({
    hasOwnProperty: hasOwnProperty.call(obj, attrName),
    undefined: obj[attrName] === undefined,
    null: obj[attrName] === null
  })
}

;(async function() {
  const where = {
    guid: '3ea35050-6f18-11ea-b267-4f9ed409a938'
  }

  const existed = await Patient.count({
    where
  })
  if (existed) {
    console.log(`${existed} record(s) existed, destroy`)
    Patient.destroy({
      where
    })
  }

  printNullyStatus(testdata, 'updatedAt')
  removeNully(testdata)
  printNullyStatus(testdata, 'updatedAt')
  console.log(testdata)

  const patient = await Patient.create(testdata)
  console.log(patient.get())
})().catch(err => {
  console.error({ ...err })
})
