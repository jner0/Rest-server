const { response } = require("express");

const cargarArchivo = (req, res = response) => {
  res.json({
    msg: "Hola Mundirijillo",
  });
};

module.exports = {
  cargarArchivo,
};
