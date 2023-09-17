const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, emailEsxiste } = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom((correo) => emailEsxiste(correo)),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe contener mínimo 6 caracteres").isLength(
      { min: 6 }
    ),
    //check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido), //(rol) => esRoleValido(rol)
    validarCampos,
  ],
  usuariosPost
); //El segundo argumento serian los middlewars, en este caso con express validator
router.put("/:id", usuariosPut);
router.patch("/", usuariosPatch);
router.delete("/", usuariosDelete);

module.exports = router;
