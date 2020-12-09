const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sqlite_playground.db'
})

const iotHooks = {
  // beforeFind: (data, options) => {
  //   console.log('beforeFind', data)
  // },

  afterFind: (data, options) => {
    console.log('afterFind', data, options)
    return {
      name: 'wwww',
      email: '2333@wwww.io',
      age: 23
    }
    // Object.assign(data, {
    //   name: 'wwww',
    //   email: '2333@wwww.io',
    //   age: 23
    // })
  }

  // afterSave: (data, options) => {
  //   console.log('afterSave:', options.model.name, {
  //     [options.model.name]: data.get()
  //   })
  // },

  // Model.update fires afterBulkUpdate rather than afterUpdate
  // unless set option.individualHooks to true,
  // which will cause an extra after INDIVIDUAL UPDATEs
  // afterBulkUpdate: options => {
  //   console.log('afterBulkUpdate:', options.model.name)
  // }
}

class User extends Sequelize.Model {}
User.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  }
}, {
  sequelize,
  modelName: 'User',
  hooks: iotHooks
})

User.sync()
  // .then(() => User.bulkCreate([
  //   { name: 'odin', email: 'odin.soap@lokijs.org', age: 38 },
  //   { name: 'thor', email: 'thor.soap@lokijs.org', age: 25 },
  //   { name: 'stan', email: 'stan.soap@lokijs.org', age: 29 },
  //   { name: 'oliver', email: 'oliver.soap@lokijs.org', age: 31 },
  //   { name: 'hector', email: 'hector.soap@lokijs.org', age: 15 },
  //   { name: 'achilles', email: 'achilles.soap@lokijs.org', age: 31 }
  // ]))
  // .then(() => User.findOne({
  //   where: { name: 'marco' }
  // }))
  // .then(marco => {
  //   if (marco == null) {
  //     console.log('What a sad story that Marco is not our user yet.')
  //     return User.bulkCreate(new Array(1).fill(null).map(() =>
  //       ({ name: 'marco', email: 'me@marcong.io', age: 24 })))
  //   }
  // })
  // .then(() => User.findByPk(1))
  // .then(user => {
  //   console.log('findByPk 1', user)
  // })
  .then(() => User.findByPk(233))
  .then(user => {
    console.log('findByPk 233', user)
  })
  // .then(() => User.update({
  //   email: 'one@marcong.io'
  // }, {
  //   where: { name: 'marco' },
  //   individualHooks: true
  // }))
  // .then(() => User.destroy({
  //   where: { name: 'marco' }
  // }))
