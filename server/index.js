require('dotenv').config();
const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
// changed to bin // back to script
// const seed = require('../script/seed.js');
const seed = require('../script/seed')


const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      await seed();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}

init()
