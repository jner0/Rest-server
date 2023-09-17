const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors); //Aqui recibe los errores de las validaciones en las rutas
  }

  next();
};

module.exports = {
  validarCampos,
};
