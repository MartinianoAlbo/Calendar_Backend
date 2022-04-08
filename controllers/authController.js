const { response } = require('express')
const User = require('../model/User')
const { generarJWT } = require('../helpers/generarJwt');
const bcrypt = require('bcryptjs')

const crearUsuario = async (req, res = response) => {
  const {email} = req.body

  //Comprobar si existe el usuario con el email
  const userExist = await User.findOne({ email })

  if (userExist) {
    return res.status(400).json({
      ok: false,
      msg: '❌ El usuario ya existe',
    })
  } 

  try {
     //Crear nuevo usuario
      const newUser = new User(req.body)
    
      console.log('sin id :',newUser);

      const userSaved = await newUser.save()

      console.log(userSaved);
    
      //Generar el json web token
      const token = await generarJWT(userSaved.id, userSaved.name)
    

      res.status(201).json({
        ok: true,
        uid: userSaved.id,
        name: userSaved.name,
        email: userSaved.email,
        token
      })
    
  } catch (error) {
    console.log(error)

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
    const token = await generarJWT(user.id, user.name)

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error',
    })
  }
}

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req

  //generar un nuevo jwt y retornarlo
  const token = await generarJWT(uid, name)

  res.json({
    ok: true,
    token,
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
}
