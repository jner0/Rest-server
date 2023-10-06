const { Router } = require("express");
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const { check } = require("express-validator");
const { existeProducto, existeCategoria } = require("../helpers/db-validators");

const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "No es un ID  deMongo").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  obtenerProductoPorId
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID de mongo").isMongoId(),
    check("categoria").custom(existeCategoria),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearProducto
);

router.put(
  "/:id",
  [validarJWT, check("id").custom(existeProducto), validarCampos],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID  deMongo").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  eliminarProducto
);

module.exports = router;
