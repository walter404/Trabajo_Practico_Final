// =============================================================================
// Script de carga de datos iniciales (seed)
// Proyecto: Sistema Centralizado de Punto de Venta (POS) e Inventario
//
// Equivalente al DML de una base relacional. Carga los datos mínimos para
// probar el sistema: un administrador, un cajero, categorías, un proveedor y
// productos de ejemplo.
//
// Requisito: haber ejecutado antes database/schemas/crear-colecciones.js
//
// Ejecución (mongosh):
//   mongosh "<cadena de conexión>/pos_inventario" database/seeds/datos-iniciales.js
//
// Usuarios de prueba (SOLO para desarrollo, cambiar en producción):
//   admin@pos.local  / Admin1234
//   cajero@pos.local / Admin1234
// =============================================================================

const ahora = new Date();
const HASH_PRUEBA = "$2b$10$Uii/6ghaPZScrw0TgVo2/efQzyS98YOEtvnPkPFxxrdRUbeYemqEa"; // bcrypt de "Admin1234"

// --- Limpieza (el script se puede ejecutar varias veces) ---------------------
["usuarios", "categorias", "proveedores", "productos", "contadores"].forEach(c => db[c].deleteMany({}));

// --- usuarios ----------------------------------------------------------------
db.usuarios.insertMany([
  { nombre: "Administrador", email: "admin@pos.local", passwordHash: HASH_PRUEBA, rol: "admin", activo: true, createdAt: ahora, updatedAt: ahora },
  { nombre: "Cajero de prueba", email: "cajero@pos.local", passwordHash: HASH_PRUEBA, rol: "cajero", activo: true, createdAt: ahora, updatedAt: ahora }
]);

// --- categorias --------------------------------------------------------------
const cat = db.categorias.insertMany([
  { nombre: "Almacén", descripcion: "Productos secos y envasados", activo: true },
  { nombre: "Bebidas", descripcion: "Gaseosas, aguas y jugos", activo: true },
  { nombre: "Limpieza", descripcion: "Artículos de limpieza del hogar", activo: true },
  { nombre: "Lácteos", descripcion: "Leches, yogures y quesos", activo: true }
]).insertedIds;

// --- proveedores -------------------------------------------------------------
const prov = db.proveedores.insertMany([
  { nombre: "Distribuidora Ejemplo S.A.", cuit: "30-00000000-0", contacto: { telefono: "341-0000000", email: "ventas@ejemplo.com" }, activo: true }
]).insertedIds;

// --- productos ---------------------------------------------------------------
const d = v => NumberDecimal(v);
db.productos.insertMany([
  { codigoBarras: "7790000000011", nombre: "Arroz largo fino 1 kg",     categoriaId: cat[0], proveedorId: prov[0], precioCosto: d("900.00"),  precioVenta: d("1250.00"), unidadMedida: "unidad", stock: 40, stockMinimo: 10, activo: true, fechaUltimoCambioPrecio: ahora },
  { codigoBarras: "7790000000028", nombre: "Fideos spaghetti 500 g",    categoriaId: cat[0], proveedorId: prov[0], precioCosto: d("650.00"),  precioVenta: d("920.00"),  unidadMedida: "unidad", stock: 55, stockMinimo: 15, activo: true, fechaUltimoCambioPrecio: ahora },
  { codigoBarras: "7790000000035", nombre: "Gaseosa cola 2,25 L",       categoriaId: cat[1], proveedorId: prov[0], precioCosto: d("1800.00"), precioVenta: d("2600.00"), unidadMedida: "unidad", stock: 24, stockMinimo: 12, activo: true, fechaUltimoCambioPrecio: ahora },
  { codigoBarras: "7790000000042", nombre: "Agua mineral 1,5 L",        categoriaId: cat[1], proveedorId: prov[0], precioCosto: d("700.00"),  precioVenta: d("1050.00"), unidadMedida: "unidad", stock: 8,  stockMinimo: 12, activo: true, fechaUltimoCambioPrecio: ahora },
  { codigoBarras: "7790000000059", nombre: "Lavandina 1 L",             categoriaId: cat[2], proveedorId: prov[0], precioCosto: d("550.00"),  precioVenta: d("800.00"),  unidadMedida: "unidad", stock: 30, stockMinimo: 10, activo: true, fechaUltimoCambioPrecio: ahora },
  { codigoBarras: "7790000000066", nombre: "Detergente 750 ml",         categoriaId: cat[2], proveedorId: prov[0], precioCosto: d("1100.00"), precioVenta: d("1590.00"), unidadMedida: "unidad", stock: 18, stockMinimo: 8,  activo: true, fechaUltimoCambioPrecio: ahora },
  { codigoBarras: "7790000000073", nombre: "Leche entera 1 L",          categoriaId: cat[3], proveedorId: prov[0], precioCosto: d("950.00"),  precioVenta: d("1300.00"), unidadMedida: "unidad", stock: 5,  stockMinimo: 20, activo: true, fechaUltimoCambioPrecio: ahora },
  {                               nombre: "Queso cremoso (por kg)",     categoriaId: cat[3],                       precioCosto: d("7500.00"), precioVenta: d("10500.00"), unidadMedida: "kg",   stock: 6.5, stockMinimo: 2, activo: true, fechaUltimoCambioPrecio: ahora }
]);
// Nota: "Agua mineral" y "Leche entera" quedan por debajo del stock mínimo a propósito,
// para probar el módulo de alertas. El queso no tiene código de barras (índice sparse).

// --- contadores --------------------------------------------------------------
db.contadores.insertOne({ _id: "numeroTicket", valor: 0 });

print("Datos iniciales cargados correctamente.");
