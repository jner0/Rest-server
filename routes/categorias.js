const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarJWT,
  validarCampos,
  tieneRole,
  esAdminRole,
} = require("../middlewares");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validators");

const router = Router();

// {{url}}/api/categorias

//Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

//Obtener una categoria en particular por Id - publico
router.get(
  "/:id",
  [
    check("id", "No es un ID  deMongo").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  obtenerCategoriaPorId
);

//Crear una nueva categoria - cualquier persona con un token valido - privado
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar por Id - privado
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar una categoria - admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID  deMongo").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  eliminarCategoria
);

module.exports = router;
