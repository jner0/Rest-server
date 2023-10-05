const { response } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({ total, productos });
};

const obtenerProductoPorId = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json(producto);
};

const crearProducto = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const productoDB = await Producto.findOne({ nombre });
  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre}, ya existe`,
    });
  }
  const data = {
    nombre,
    usuario: req.usuario._id,
    categoria: req.body.categoriaId,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    disponible: req.body.disponible,
  };

  const producto = new Producto(data);
  await producto.save();
  res.status(201).json(producto);
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;

  const { estado, ...data } = req.body;

  const updatedData = {
    nombre: data.nombre.toUpperCase(),
    usuario: req.usuario._id,
    categoria: data.categoriaId,
    precio: data.precio,
    descripcion: data.descripcion,
    estado: data.estado,
    disponible: data.disponible,
  };

  const producto = await Producto.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  res.json(producto);
};

const eliminarProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json(producto);
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
};
