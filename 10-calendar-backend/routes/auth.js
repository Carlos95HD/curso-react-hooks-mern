/*
  Rutas de Usuarios / auth
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
  '/new',
  [//middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  loginUser
);

router.get('/renew', validarJWT ,revalidateToken)

module.exports = router