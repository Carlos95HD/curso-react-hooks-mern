const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");
  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid; //Guarda el id user en model Event
    const savedEvent = await event.save();

    res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hubo un error",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    //Verificación de longitud de id
    if (eventId.length < 24 || eventId.length > 24) {
      return res.status(400).json({
        ok: false,
        msg: "La id debe contener 24 caracteres",
      });
    }

    //Verificar que el usuario tenga permisos
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });
    res.json({
      ok: true,
      eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hubo un error contactar al admin",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    //verificación de longitud de id
    if (eventId.length < 24 || eventId.length > 24) {
      return res.status(400).json({
        ok: false,
        msg: "La id debe contener 24 caracteres",
      });
    }

    //Verificar que el usuario tenga permisos
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para eliminar el evento",
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      msg: "Evento eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hubo un error contactar al admin",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
