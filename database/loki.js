const Loki = require('lokijs')
const EventEmitter = require('events')

class LokiPlayer extends EventEmitter {
  _ready = false
  ready = new Promise(resolve => {
    if (this._ready) {
      resolve(this)
    } else {
      this.once('ready', () => resolve(this))
    }
  })

  constructor() {
    super()
    this.db = new Loki('loki_playground.db', {
      autoload: true,
      autoloadCallback: this.initializeDatabase,
      autosave: true,
      autosaveInterval: 4000
    })
  }

  initializeDatabase = () => {
    let users = this.db.getCollection('users')
    if (users == null) {
      users = this.db.addCollection('users')

      // insert mock data
      users.insert([
        { name: 'odin', email: 'odin.soap@lokijs.org', age: 38 },
        { name: 'thor', email: 'thor.soap@lokijs.org', age: 25 },
        { name: 'stan', email: 'stan.soap@lokijs.org', age: 29 },
        { name: 'oliver', email: 'oliver.soap@lokijs.org', age: 31 },
        { name: 'hector', email: 'hector.soap@lokijs.org', age: 15 },
        { name: 'achilles', email: 'achilles.soap@lokijs.org', age: 31 }
      ])
    }

    this._ready = true
    this.emit('ready')
  }

  runProgramLogic = async () => {
    const users = this.db.getCollection('users')
    if (users == null) {
      console.error('Database collection `users` not exists.')
      this.db.close()
      return
    }
    console.log(`We have had ${users.count()} users already.`)

    const marco = users.findOne({
      name: 'marco'
    })
    if (marco == null) {
      console.log('What a sad story that Marco is not our user yet.')
      users.insert({ name: 'marco', email: 'me@marcong.io', age: 24 })
    }
  }
}

new LokiPlayer().ready
  .then(player => {
    player.runProgramLogic()
    player.db.close()
  })
