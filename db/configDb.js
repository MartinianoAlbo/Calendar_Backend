const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_Connection_String, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // autoIndex: true
    })



    const url = `${db.connection.host}:${db.connection.port}/${db.connection.name}`
    console.log(`Mongo DB conectado en ${url}`)

  } catch (error) {
    console.log(error)

    process.exit(1)

  }
}

module.exports = {dbConnection}