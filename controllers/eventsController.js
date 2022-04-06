const { response } = require('express')
const Event = require('../model/Evento')


const getEventos = async (req, res = response) => {
  const event = await Event.find().populate('user') //rellena una referencia

  res.json({
    ok: true,
    event,
  })
}

const crearEvento = async (req, res = response) => {
  const event = new Event(req.body)

  try {
    event.user = req.uid

    const eventoGuardaro = await event.save()

    res.json({
      ok: true,
      eventoGuardaro,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'error',
    })
  }
}

const actualizarEvento = async (req, res = response) => {
  const eventId = req.params.id
  const uid = req.uid
  try {
    const evento = await Event.findById(eventId)

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no encontrado',
      })
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No autorizado',
      })
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    }

    const eventoActualizado = await Event.findByIdAndUpdate(
      eventId,
      nuevoEvento,
      { new: true },
    ) //{new:ture} para que devuelva el objeto actualizado

    res.json({
      ok: true,
      eventoActualizado,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'error',
    })
  }
}

const borrarEvento = async (req, res = response) => {
  const eventId = req.params.id
  const uid = req.uid

  try {
    const evento = await Event.findById(eventId)

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no encontrado',
      })
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No autorizado',
      })
    }

    await Event.findByIdAndRemove(eventId)

    res.json({
      ok: true,
      msg: 'Evento borrado',
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'error',
    })
  }
}


module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  borrarEvento,
}
