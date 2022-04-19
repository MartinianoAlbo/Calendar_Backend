const mongoose = require('mongoose')
const { Schema } = mongoose

const EventSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    }, // String is shorthand for {type: String}
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId, // esto es una referencia
      ref: 'User', // referencia a la coleccion de usuarios
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

EventSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

module.exports = mongoose.model('Event', EventSchema)
