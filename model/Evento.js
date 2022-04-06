const mongoose = require('mongoose')
const { Schema } = mongoose;


const eventSchema = new Schema({
    title:  {
      type: String,
      require: true
    }, // String is shorthand for {type: String}
    start:{
      type: Date,
      require: true,
    },
    end:  {
      type: Date,
      require: true
    },
    notes:  {
        type: String,
    },
    user: {
        type:Schema.Types.ObjectId, // esto es una referencia
        ref: 'User', // referencia a la coleccion de usuarios
        require: true
    }
});

  eventSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
  });
  
  module.exports = mongoose.model('Event', eventSchema);