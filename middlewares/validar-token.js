const jwt = require('jsonwebtoken')
const { response } = require('express')

const validarJWT = (req, res = response, next) => {
  const token = req.header('x-token') || '' // header es una funcion de express que permite leer el header de la peticion en la url

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token',
    })
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET)

    // extrae el uid del payload
    req.uid = uid
    req.name = name

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    })
  }

  next()
}

module.exports = {
  validarJWT,
}
