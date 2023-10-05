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

const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [check("id", "No es un ID  deMongo").isMongoId(), validarCampos],
  obtenerProductoPorId
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoriaId", "La categoria es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearProducto
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoriaId", "La categoria es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID  deMongo").isMongoId(),
    validarCampos,
  ],
  eliminarProducto
);

module.exports = router;
