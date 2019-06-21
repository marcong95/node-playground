import { Sequelize } from 'sequelize';

//所有的设备列表，都以scanResult表为主(增删改查)。其他表只是在单一设备上附加信息。
//设备guid，也即是其他表的devGuid--同一台设备可能多个guid(比如多张网卡，ip是否存在冲突情况？)
//暂时不考虑ip冲突的情况。ip冲突说明本身网络就有问题。
const ScanResult = sequelize.define('scanResult', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  projectGuid: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'devkey'
  },
  ip: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'devkey'
  },
  mac: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'devkey'
  },
  online: Sequelize.INTEGER,
  name: Sequelize.STRING,
  manufacturer: Sequelize.STRING,
  devType: Sequelize.STRING,
  system: Sequelize.STRING,
  guessSystem: Sequelize.STRING,
  openPort: Sequelize.STRING,
  region: Sequelize.STRING,

  //设备登录相关-为了方便查询，登录成功的才查询子表
  loginAccount: Sequelize.STRING,
  loginPassword: Sequelize.STRING,
  loginMethod: Sequelize.STRING,
  loginState: Sequelize.STRING,
  loginEnablePassword: Sequelize.STRING,

  tag: Sequelize.STRING,  //标记该设备是否是自己添加的
  remark: Sequelize.TEXT,

  data1: Sequelize.TEXT, // 扩展数据
  data2: Sequelize.TEXT,
  data3: Sequelize.TEXT,
  data4: Sequelize.TEXT,
  data5: Sequelize.TEXT,

  recordState: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  version: Sequelize.FLOAT
}, {
  freezeTableName: true
});
