const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// {{url}}/api/categorias

//Obtener todas las categorias - publico
router.get("/", (req, res) => {
  res.json("get");
});

//Obtener una categoria en particular por Id - publico
router.get("/:id", (req, res) => {
  res.json("get");
});

//Crear una nueva categoria - cualquier persona con un token valido - privado
router.post("/", (req, res) => {
  res.json("post");
});

//Actualizar por Id - privado
router.put("/:id", (req, res) => {
  res.json("put");
});

//Borrar una categoria - admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
