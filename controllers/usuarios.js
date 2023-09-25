const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req, res = response) => {
  // const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const usuarios = await Usuario.find().skip(desde).limit(Number(limite));
  res.json({ usuarios });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contrasena
  const salt = bcryptjs.genSaltSync(); //que tan complicado queremos la encriptacion(numero de vueltas por defecto 10)
  usuario.password = bcryptjs.hashSync(password, salt); //para encriptarlo en una sola via

  //Guardar la base datos
  await usuario.save();

  res.status(201).json({
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //Validar contra base de datos

  if (password) {
    //Encriptar la contrasena
    const salt = bcryptjs.genSaltSync(); //que tan complicado queremos la encriptacion(numero de vueltas por defecto 10)
    resto.password = bcryptjs.hashSync(password, salt); //para encriptarlo en una sola via
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "put API - controlador",
    usuario,
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
};
