const fsp = require('fs').promises
const { random } = require('lodash')
const { resolve } = require('path')
const { Op } = require('sequelize')
const { v4: uuid } = require('uuid')

const { cartesianProduct } = require('../algo/setTheory')
const { initWithSequelizeOptions } = require('./dbdef-iot')
const { randomName } = require('./chineseNames')

const DB_PATH = String.raw`D:\projects\medthings-data\data`

async function initDB() {
  const dbBase = initWithSequelizeOptions({
    dialect: 'sqlite',
    storage: resolve(DB_PATH, 'nodedb_base'),
    logging: false,

    define: {
      freezeTableName: true,
      underscored: false
    }
  })

  // await fsp.copyFile(
  //   resolve(DB_PATH, 'nodedb_7d9c'),
  //   resolve(DB_PATH, 'nodedb')
  // )
  const dbMock = initWithSequelizeOptions({
    dialect: 'sqlite',
    storage: resolve(DB_PATH, 'nodedb'),
    logging: false,

    define: {
      freezeTableName: true,
      underscored: false
    }
  })

  return { dbBase, dbMock }
}

;(async function main() {
  const { dbBase, dbMock } = await initDB()

  const baseDevices = await dbMock.Device.findAll({
    where: {
      productModel: {
        [Op.not]: ['EvalManager']
      }
    }
  })

  // generate mock patients
  // const NUMBER_OF_PATIENTS = 20
  // const tagPreset = cartesianProduct(
  //   ['轻度', '中度', '重度'],
  //   ['脑卒中', '脑梗塞', '脑外伤', '脊髓损伤', '脑瘫']
  // ).map(tags => tags.join('')).concat(['其他'])
  // const basePatient =
  //   await dbBase.Patient.findByPk('21c6267b-e701-4541-926f-852129b68175')

  // for (const dev of baseDevices) {
  //   await dbMock.Patient.bulkCreate(
  //     new Array(NUMBER_OF_PATIENTS).fill(null).map(() => {
  //       // createdAt will be within 1d to 2y before basePatient created
  //       const createdAt = random(
  //         basePatient.createdAt.valueOf() - 730 * 86400000,
  //         basePatient.createdAt.valueOf() - 86400000)

  //       return {
  //         guid: uuid(),
  //         name: randomName(),
  //         mrNumber: random(0, 99999999).toString().padStart(8, '0'),

  //         deviceId: dev.guid,
  //         productModel: dev.productModel,
  //         serialNumber: dev.serialNumber,

  //         age: random(1, 99),
  //         sex: random(0, 1),

  //         hospital: basePatient.hospital,
  //         tag: tagPreset[random(0, tagPreset.length)],

  //         commitTime: createdAt,
  //         createdAt,
  //         updatedAt: createdAt
  //       }
  //     }))
  // }

  // generate mock reports
  const NUMBER_OF_REPORTS = 10

  for (const dev of baseDevices) {
    const baseReports = await dbBase.Report.findAll({
      where: {
        productModel: dev.productModel,
        medicalType: ['eval', 'evaluation', 'Evaluation', 'scale']
      }
    })
    console.log(`${baseReports.length} base reports for ${dev.productModel}`)
    if (baseReports.length <= 0) {
      continue
    }

    const patients = await dbMock.Patient.findAll({
      where: {
        deviceId: dev.guid
      }
    })

    const mockReports = patients.flatMap(patient => {
      // createdAt will be within 1d to 2m before today
      const createdAt = random(
        Date.now() - 60 * 86400000,
        Date.now() - 86400000)

      return new Array(random(0, NUMBER_OF_REPORTS)).fill(null).map(() => {
        return {
          ...baseReports[random(0, baseReports.length - 1)].get(),

          guid: uuid(),
          patientId: patient.guid,
          mrNumber: patient.mrNumber,

          deviceId: dev.guid,
          productModel: dev.productModel,
          serialNumber: dev.serialNumber,

          commitTime: createdAt,
          createdAt,
          updatedAt: createdAt
        }
      })
    })

    console.log(`${mockReports.length} reports generated for ${dev.productModel}`)
    // console.log(mockReports[0])
    dbMock.Report.bulkCreate(mockReports)
  }
})()
