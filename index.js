const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./db/configDb')
const cors = require('cors')

const app = express()



//Base de datos
dbConnection()

//CORS
const dominiosPermitidos = ['http://localhost:4000/api/auth/new']
const corsOption = {
    origin: (origin, callback) => {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            //El origen del request esta permitido
            callback(null, true)
        }else {
            callback(new Error("No permitido por CORS"))
        }
        
    }
}
app.use(cors())

//Parseo del body
app.use(express.json()); // siempre antes que se cargue el body parser

app.use(express.static('public'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventsRoutes'));


app.listen(process.env.PORT, () => console.log(`Servidor corriendo en puerto ${process.env.PORT}!`))

