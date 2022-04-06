const { sign } = require('jsonwebtoken') // npm i jsonwebtoken

const generarJWT = async (uid, name) => {

    const payload = {
      uid,
      name
    }
    return sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '5h',
      },
    )

}

module.exports = {
  generarJWT,
}
