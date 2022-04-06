const { response } = require('express')
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/generarJwt')

const crearUsuario = async (req, res = response) => {
  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: '❌ El usuario ya existe',
      })
    } else {
      user = new User(req.body)

      //Encriptar pass
      const salt = bcrypt.genSaltSync(10)
      user.password = bcrypt.hashSync(password, salt)

      await user.save()
      
      //Generar el json web token
      const token = await generarJWT(user.id, user.name)

      res.status(201).json({
        ok: true,
        uid: user.id,
        name: user.name,
        token
      })
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'error',
    })
  }
}

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: '❌ El usuario no existe',
      })
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: '❌ Contraseña incorrecta',
      })
    }

    //Generar json web token
    // const token = await generarJWT(user.id, user.name)

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'error',
    })
  }
}

const revalidarToken = async(req, res = response) => {

  const {uid, name} = req;


  //generar un nuevo jwt y retornarlo
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
}
