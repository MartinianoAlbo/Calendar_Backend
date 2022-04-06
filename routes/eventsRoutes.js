const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-token')
const { isDate } = require('../helpers/isDate')
const { 
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento 
} = require('../controllers/eventsController')

//Rutas
router
.use(validarJWT) // Todas las rutas que esten despues de esta linea, requieren el token
.get('/', getEventos)//Obtener eventos
.post('/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','La fecha de inicio es obligatoria').custom(isDate),
    check('end','La fecha de fin es obligatoria').custom(isDate),
    validarCampos
], crearEvento)//Crear evento
.put('/:id', validarCampos, actualizarEvento)//Actualizar evento
.delete('/:id', borrarEvento)//Borrar evento

module.exports = router