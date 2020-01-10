const Sequelize = require('sequelize')
const { Model } = Sequelize

const sequelize = new Sequelize('dbzhanghe', null, null, {
  dialect: 'sqlite',
  storage: 'D:\\projects\\ot\\data\\nodedb',
  logging: false
})

class Patient extends Sequelize.Model {}
Patient.init({
  guid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: { type: Sequelize.STRING, allowNull: false, unique: 'patientkey' }, // 姓名
  mrNumber: { type: Sequelize.STRING, allowNull: false, unique: 'patientkey' }, // 病历号

  age: { type: Sequelize.INTEGER, validate: { isInt: true } }, // 年龄
  sex: { type: Sequelize.INTEGER, validate: { isInt: true } }, // 性别
  phone: Sequelize.STRING, // 电话
  weight: Sequelize.FLOAT, // 体重
  tall: Sequelize.FLOAT, // 身高
  birthday: Sequelize.DATE, // 生日
  married: Sequelize.INTEGER, // 是否结婚
  address: Sequelize.TEXT, // 联系地址

  hospital: Sequelize.STRING, // 医院名称
  diagnosis: Sequelize.TEXT, // 诊断--可能是多家医院的诊断
  summary: Sequelize.TEXT,

  data1: Sequelize.JSON, // 扩展数据

  tag: Sequelize.STRING, // 标签
  remark: Sequelize.TEXT, // 备注

  commitTime: Sequelize.DATE, // 提交时间

  recordState: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Patient',
  freezeTableName: true
  // hooks: iotHooks
})

class Plan extends Model {}
Plan.init({
  guid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }, // 方案编号前10个guid + 时间戳
  medicalType: { type: Sequelize.STRING, allowNull: false }, // 方案类型-训练还是评估还是量表

  name: Sequelize.STRING, // 方案名字
  extId: Sequelize.STRING, // 暂时预留
  patientId: Sequelize.STRING, // 患者id
  isDefault: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }, // 是否默认方案0 or 1

  paramSetting: Sequelize.JSON, // 训练参数设置
  joint: Sequelize.STRING, // 训练关节
  leftOrRight: Sequelize.STRING, // 左还是右
  posture: Sequelize.STRING, // 姿态

  price: Sequelize.FLOAT, // 价格
  summary: Sequelize.TEXT, // 方案摘要
  schedule: Sequelize.JSON, // 进度

  data1: Sequelize.JSON, // 扩展数据

  tag: Sequelize.STRING, // 标签
  remark: Sequelize.TEXT, // 备注

  commitTime: Sequelize.DATE, // 提交时间

  recordState: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Plan',
  freezeTableName: true
})

class Report extends Sequelize.Model {}
Report.init({
  guid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  patientId: { type: Sequelize.STRING, allowNull: false }, // 患者id
  mrNumber: Sequelize.STRING, // 病历号 ------物联报告通用字段
  extId: Sequelize.STRING, // 扩展id

  medicalType: Sequelize.STRING, // 报告类型-评估还是训练还是量表 ------物联报告通用字段

  parentGuid: Sequelize.STRING, // 父报告的id
  appId: { type: Sequelize.STRING }, // appid
  appSetting: Sequelize.JSON, // 对应的app设置

  paramSetting: Sequelize.JSON, // 训练参数设置 ------物联报告通用字段
  joint: Sequelize.STRING, // 训练关节
  leftOrRight: Sequelize.STRING, // 左还是右
  posture: Sequelize.STRING, // 姿态

  diagnosis: Sequelize.TEXT, // 诊断
  title: Sequelize.STRING, // 报告标题
  score: Sequelize.FLOAT, // 分数

  doctor: Sequelize.STRING, // 关联的医生

  simpleReport: Sequelize.JSON, // 报告数据 ------物联报告通用字段
  data1: Sequelize.JSON, // 扩展数据
  data2: Sequelize.JSON, // 扩展数据
  data3: Sequelize.JSON, // 扩展数据

  tag: Sequelize.STRING, // 标签 ------物联报告通用字段
  remark: Sequelize.TEXT, // 备注 ------物联报告通用字段

  commitTime: Sequelize.DATE, // 提交时间

  recordState: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Report',
  freezeTableName: true
})

module.exports = {
  sequelize,
  Patient,
  Plan,
  Report
}
