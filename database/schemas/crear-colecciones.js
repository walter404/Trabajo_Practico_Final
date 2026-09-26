// =============================================================================
// Script de creación de colecciones, validaciones e índices
// Proyecto: Sistema Centralizado de Punto de Venta (POS) e Inventario
//
// Equivalente al DDL de una base relacional. Materializa el diseño documentado
// en /docs/esquema-bd.md (secciones 5 y 6).
//
// Ejecución (mongosh):
//   mongosh "<cadena de conexión>/pos_inventario" database/schemas/crear-colecciones.js
//
// Las reglas $jsonSchema son la segunda barrera de validación (ver punto 9 del
// esquema): actúan sobre cualquier escritura, incluso las que no pasan por los
// modelos de Mongoose.
// =============================================================================

const decimal = { bsonType: "decimal", description: "Importe exacto (Decimal128)" };

function crearColeccion(nombre, schema) {
  if (db.getCollectionNames().includes(nombre)) {
    db.runCommand({ collMod: nombre, validator: { $jsonSchema: schema }, validationLevel: "strict" });
    print(`Colección '${nombre}' ya existía: validación actualizada.`);
  } else {
    db.createCollection(nombre, { validator: { $jsonSchema: schema }, validationLevel: "strict" });
    print(`Colección '${nombre}' creada.`);
  }
}

// --- usuarios ----------------------------------------------------------------
crearColeccion("usuarios", {
  bsonType: "object",
  required: ["nombre", "email", "passwordHash", "rol", "activo"],
  properties: {
    nombre: { bsonType: "string", minLength: 1 },
    email: { bsonType: "string", pattern: "^[^@\\s]+@[^@\\s]+$" },
    passwordHash: { bsonType: "string" },
    rol: { enum: ["admin", "cajero"] },
    activo: { bsonType: "bool" },
    createdAt: { bsonType: "date" },
    updatedAt: { bsonType: "date" }
  }
});
db.usuarios.createIndex({ email: 1 }, { unique: true });

// --- categorias --------------------------------------------------------------
crearColeccion("categorias", {
  bsonType: "object",
  required: ["nombre", "activo"],
  properties: {
    nombre: { bsonType: "string", minLength: 1 },
    descripcion: { bsonType: "string" },
    activo: { bsonType: "bool" }
  }
});
db.categorias.createIndex({ nombre: 1 }, { unique: true });

// --- proveedores -------------------------------------------------------------
crearColeccion("proveedores", {
  bsonType: "object",
  required: ["nombre", "activo"],
  properties: {
    nombre: { bsonType: "string", minLength: 1 },
    cuit: { bsonType: "string" },
    contacto: {
      bsonType: "object",
      properties: {
        telefono: { bsonType: "string" },
        email: { bsonType: "string" }
      }
    },
    activo: { bsonType: "bool" }
  }
});
db.proveedores.createIndex(
  { cuit: 1 },
  { unique: true, partialFilterExpression: { cuit: { $type: "string" } } }
);

// --- productos ---------------------------------------------------------------
crearColeccion("productos", {
  bsonType: "object",
  required: ["nombre", "categoriaId", "precioCosto", "precioVenta", "unidadMedida", "stock", "stockMinimo", "activo"],
  properties: {
    codigoBarras: { bsonType: "string" },
    nombre: { bsonType: "string", minLength: 1 },
    descripcion: { bsonType: "string" },
    categoriaId: { bsonType: "objectId" },
    proveedorId: { bsonType: "objectId" },
    precioCosto: decimal,
    precioVenta: decimal,
    unidadMedida: { enum: ["unidad", "kg", "litro"] },
    stock: { bsonType: ["int", "long", "double", "decimal"], minimum: 0, description: "No puede ser negativo" },
    stockMinimo: { bsonType: ["int", "long", "double", "decimal"], minimum: 0 },
    activo: { bsonType: "bool" },
    fechaUltimoCambioPrecio: { bsonType: "date" }
  }
});
db.productos.createIndex({ codigoBarras: 1 }, { unique: true, sparse: true });
db.productos.createIndex({ nombre: "text" });
db.productos.createIndex({ categoriaId: 1, activo: 1 });
db.productos.createIndex({ activo: 1, stock: 1 });

// --- ventas (con items embebidos) --------------------------------------------
crearColeccion("ventas", {
  bsonType: "object",
  required: ["numeroTicket", "fecha", "usuarioId", "items", "subtotal", "total", "metodoPago", "estado"],
  properties: {
    numeroTicket: { bsonType: ["int", "long"] },
    fecha: { bsonType: "date" },
    usuarioId: { bsonType: "objectId" },
    items: {
      bsonType: "array",
      minItems: 1,
      items: {
        bsonType: "object",
        required: ["productoId", "nombre", "cantidad", "precioUnitario", "subtotal"],
        properties: {
          productoId: { bsonType: "objectId" },
          nombre: { bsonType: "string" },
          codigoBarras: { bsonType: "string" },
          cantidad: { bsonType: ["int", "long", "double", "decimal"], exclusiveMinimum: 0 },
          precioUnitario: decimal,
          subtotal: decimal
        }
      }
    },
    subtotal: decimal,
    descuento: decimal,
    total: decimal,
    metodoPago: { enum: ["efectivo", "debito", "credito", "transferencia"] },
    montoRecibido: decimal,
    vuelto: decimal,
    estado: { enum: ["confirmada", "anulada"] }
  }
});
db.ventas.createIndex({ numeroTicket: 1 }, { unique: true });
db.ventas.createIndex({ fecha: -1 });

// --- ajustes_precio ----------------------------------------------------------
crearColeccion("ajustes_precio", {
  bsonType: "object",
  required: ["fecha", "usuarioId", "tipoAjuste", "valor", "cantidadProductos", "revertido"],
  properties: {
    fecha: { bsonType: "date" },
    usuarioId: { bsonType: "objectId" },
    tipoAjuste: { enum: ["porcentaje", "valorFijo"] },
    valor: { bsonType: ["int", "long", "double", "decimal"] },
    filtroAplicado: { bsonType: "object" },
    cantidadProductos: { bsonType: ["int", "long"], minimum: 0 },
    revertido: { bsonType: "bool" }
  }
});

// --- historial_precios -------------------------------------------------------
crearColeccion("historial_precios", {
  bsonType: "object",
  required: ["productoId", "precioAnterior", "precioNuevo", "usuarioId", "fecha"],
  properties: {
    productoId: { bsonType: "objectId" },
    ajusteId: { bsonType: "objectId" },
    precioAnterior: decimal,
    precioNuevo: decimal,
    usuarioId: { bsonType: "objectId" },
    fecha: { bsonType: "date" }
  }
});
db.historial_precios.createIndex({ productoId: 1, fecha: -1 });
db.historial_precios.createIndex({ ajusteId: 1 });

// --- movimientos_stock (Etapa 2) ---------------------------------------------
crearColeccion("movimientos_stock", {
  bsonType: "object",
  required: ["productoId", "tipo", "cantidad", "stockResultante", "fecha"],
  properties: {
    productoId: { bsonType: "objectId" },
    tipo: { enum: ["venta", "ingreso", "ajuste", "anulacion"] },
    cantidad: { bsonType: ["int", "long", "double", "decimal"] },
    stockResultante: { bsonType: ["int", "long", "double", "decimal"], minimum: 0 },
    ventaId: { bsonType: "objectId" },
    fecha: { bsonType: "date" }
  }
});
db.movimientos_stock.createIndex({ productoId: 1, fecha: -1 });

// --- contadores --------------------------------------------------------------
crearColeccion("contadores", {
  bsonType: "object",
  required: ["_id", "valor"],
  properties: {
    _id: { bsonType: "string" },
    valor: { bsonType: ["int", "long"], minimum: 0 }
  }
});

print("\nEsquema creado correctamente.");
