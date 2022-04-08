const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
  name:  {
    type: String,
    require: true,
    trim: true
  }, // String is shorthand for {type: String}
  email:{
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  password:  {
    type: String,
    require: true
  }
});

UserSchema.pre('save', async function(next) {

  if(!this.isModified("password")) next(); // para no volver a hashear un password que ya esta haseado

  const salt = await bcrypt.genSalt(10) // rondas de hasheo
  this.password = await bcrypt.hash(this.password, salt) // modifica antes qie se almacene el password 
})

module.exports = mongoose.model('User', UserSchema);