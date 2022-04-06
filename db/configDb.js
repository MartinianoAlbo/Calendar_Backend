const mongoose = require('mongoose')

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.DB_Connection_String, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Db Online')

  } catch (error) {
    console.log(error)
        
  }
}

module.exports = {dbConnection}