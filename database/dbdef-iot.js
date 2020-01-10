const Sequelize = require('sequelize')
const { Model, DataTypes } = Sequelize

const sequelize = new Sequelize({
  host: '192.168.0.190',
  port: 3306,
  username: 'root',
  password: 'jumho2013a',
  database: 'iotserverdb',
  dialect: 'mysql',

  logging: false,

  define: {
    freezeTableName: true,
    underscored: false
  }
})

class Plan extends Model {}
Plan.init({
  guid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  }, // 方案编号前10个guid + 时间戳
  medicalType: { type: DataTypes.STRING, allowNull: false }, // 治疗类型-训练还是评估还是量表

  deviceId: { type: DataTypes.STRING, allowNull: false }, // 设备的guid
  productModel: { type: DataTypes.STRING, allowNull: false }, // 设备型号
  serialNumber: { type: DataTypes.STRING, allowNull: false }, // 设备编号

  name: DataTypes.STRING, // 方案名字
  extId: DataTypes.STRING, // 暂时预留
  patientId: DataTypes.STRING, // 患者id
  isDefault: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }, // 是否默认方案0 or 1

  paramSetting: DataTypes.JSON, // 训练参数设置------物联报告通用字段
  joint: DataTypes.STRING, // 训练关节
  leftOrRight: DataTypes.STRING, // 左还是右
  posture: DataTypes.STRING, // 姿态

  price: DataTypes.FLOAT, // 价格
  summary: DataTypes.TEXT, // 方案摘要
  schedule: DataTypes.JSON, // 进度

  data1: DataTypes.JSON, // 扩展数据

  tag: DataTypes.STRING, // 标签
  remark: DataTypes.TEXT, // 备注

  commitTime: DataTypes.DATE, // 提交时间

  recordState: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Plan',
  timestamps: false
})

class Report extends Model { }
Report.init({
  guid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  patientId: { type: DataTypes.STRING, allowNull: false }, // 患者id
  mrNumber: { type: DataTypes.STRING, allowNull: false }, // 病历号 ------物联报告通用字段
  extId: DataTypes.STRING, // 扩展id

  deviceId: { type: DataTypes.STRING, allowNull: false }, // 设备的guid ------物联报告通用字段
  productModel: { type: DataTypes.STRING, allowNull: false }, // 设备型号 ------物联报告通用字段
  serialNumber: { type: DataTypes.STRING, allowNull: false }, // 设备编号 ------物联报告通用字段

  medicalType: DataTypes.STRING, // 报告类型-评估还是训练还是量表 ------物联报告通用字段

  parentGuid: DataTypes.STRING, // 父报告的id
  appId: { type: DataTypes.STRING }, // appid
  appSetting: DataTypes.JSON, // 对应的app设置

  paramSetting: DataTypes.JSON, // 训练参数设置------物联报告通用字段
  joint: DataTypes.STRING, // 训练关节
  leftOrRight: DataTypes.STRING, // 左还是右
  posture: DataTypes.STRING, // 姿态

  diagnosis: DataTypes.TEXT, // 诊断
  title: DataTypes.STRING, // 报告标题
  score: DataTypes.FLOAT, // 分数

  doctor: DataTypes.STRING, // 关联的医生

  simpleReport: DataTypes.JSON, // 报告数据 ------物联报告通用字段
  data1: DataTypes.JSON, // 扩展数据
  data2: DataTypes.JSON, // 扩展数据
  data3: DataTypes.JSON, // 扩展数据

  tag: DataTypes.STRING, // 标签 ------物联报告通用字段--这个字段可以放软件名称
  remark: DataTypes.TEXT, // 备注 ------物联报告通用字段

  commitTime: DataTypes.DATE, // 提交时间

  recordState: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Report',
  timestamps: false
})

module.exports = {
  sequelize,
  Plan,
  Report
}
