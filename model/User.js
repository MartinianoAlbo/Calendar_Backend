const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  name:  {
    type: String,
    require: true
  }, // String is shorthand for {type: String}
  email:{
    type: String,
    require: true,
    unique:true
  },
  password:  {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('User', userSchema);