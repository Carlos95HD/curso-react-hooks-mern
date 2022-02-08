const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {

    let user = await User.findOne({ email });
  
    if ( user ) {
      return res.status(400).json({
        ok:false,
        msg:'Email ya esta registrado por otro usuario'
      })
    }

    user = new User( req.body );
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    await user.save(); //Guarda en DB

    //Generar Json web token
    const token = generateJWT( user.id, user.name );

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al crear, contacte al administrador'
    })
  }
}

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    
    if ( !user ) {
      return res.status(400).json({
        ok:false,
        msg:'No existe usuario con ese email'
      })
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync( password, user.password )

    if ( !validPassword ) {
      return res.status(400).json({
        ok:false,
        msg: 'Password incorrecto'
      })
    }

    // Generar Json web token
    const token = generateJWT( user.id, user.name );

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error de datos, contacte al administrador'
    })
  }
}

const revalidateToken = ( req, res = response ) => {
  const { uid, name } = req;
  // Generar un nuevo JWT y retornarlo en esta petición
  const token = generateJWT( uid, name );

  res.json({
    ok: true,
	uid,
	name,
    token
  })
}

module.exports = {
  createUser,
  loginUser,
  revalidateToken
}