/*
  Events Routes
  /api/events
*/
const { Router } = require("express");
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  createEvent,
  updateEvent,
  getEvents,
  deleteEvent,
} = require("../controllers/events");
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

//validación del JWT
router.use(validarJWT);

router.get("/", getEvents);

router.post(
  "/",
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de start es obligatoria').custom( isDate ),
    check('end', 'Fecha end es obligatoria').custom( isDate ),
    validarCampos
  ],
  createEvent
);

router.put(
  "/:id",
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de start es obligatoria').custom( isDate ),
    check('end', 'Fecha end es obligatoria').custom( isDate ),
    validarCampos
  ],
  updateEvent
);

router.delete("/:id", deleteEvent);

module.exports = router;
