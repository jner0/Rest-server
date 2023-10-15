const Role = require("../models/role");
const { Categoria, Usuario, Producto } = require("../models");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos`);
  }
};

const emailEsxiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo} ya está registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El ID no existe ${id}`);
  }
};

const existeCategoria = async (id) => {
  const categoria = await Categoria.findById(id);
  if (!categoria) {
    throw new Error(`La categoria ${id} no existe`);
  }
};

const existeProducto = async (id) => {
  const producto = await Producto.findById(id);
  if (!producto) {
    throw new Error(`El producto ${id} no existe`);
  }
};

// Validar colecciones permitidas

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(
      `La coleccion ${coleccion} no es permitida, ${colecciones}`
    );
  }
  return true;
};

module.exports = {
  esRoleValido,
  emailEsxiste,
  existeUsuarioPorId,
  existeCategoria,
  existeProducto,
  coleccionesPermitidas,
};
