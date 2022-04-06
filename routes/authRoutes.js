// Rutas de usuarios /Auth
// host + /api/auth
const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-token')

const {
  crearUsuario,
  revalidarToken,
  loginUsuario,
} = require('../controllers/authController')

     
router
  .post(
    '/',
    [
      check('email', 'Email no valido').isEmail(),
      check('password', 'Contraseña debe tener minimo 4 caracteres').isLength({
        min: 4,
      }),
      validarCampos
    ],
    loginUsuario,
  )
  .post(
    '/new',
    [
      //middlewares
      check('name', 'Nombre Obligatorio').not().isEmpty(),
      check('email', 'Email no valido').isEmail(),
      check('password', 'Contraseña debe tener minimo 4 caracteres').isLength({
        min: 4,
      }),
      validarCampos
    ],
    crearUsuario,
  )
  .get('/renew',validarJWT, revalidarToken)

module.exports = router
