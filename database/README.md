# Base de datos — MongoDB

El diseño completo de la base de datos (colecciones, campos, tipos, relaciones e índices) está documentado en [`/docs/esquema-bd.md`](../docs/esquema-bd.md). Esta carpeta contiene los **scripts** que materializan ese diseño.

Como MongoDB es una base documental, no existen scripts DDL en el sentido de SQL (`CREATE TABLE`). Su equivalente son los scripts que crean las colecciones con sus reglas de validación y sus índices.

## Contenido

| Archivo | Equivalente SQL | Descripción |
|---|---|---|
| [`schemas/crear-colecciones.js`](./schemas/crear-colecciones.js) | DDL | Crea las 9 colecciones con sus reglas de validación `$jsonSchema` (tipos, campos obligatorios, valores admitidos, stock no negativo) y todos los índices definidos en el esquema. |
| [`seeds/datos-iniciales.js`](./seeds/datos-iniciales.js) | DML | Carga datos de prueba: un administrador, un cajero, 4 categorías, un proveedor y 8 productos (dos de ellos con stock bajo, para probar las alertas). |

## Ejecución

Requiere [mongosh](https://www.mongodb.com/docs/mongodb-shell/) y una base MongoDB en modo *replica set* (por ejemplo, MongoDB Atlas), necesaria para las transacciones.

```bash
mongosh "<cadena de conexión>/pos_inventario" database/schemas/crear-colecciones.js
mongosh "<cadena de conexión>/pos_inventario" database/seeds/datos-iniciales.js
```

Ambos scripts pueden ejecutarse más de una vez: el de colecciones actualiza las validaciones existentes y el de datos limpia las colecciones antes de cargar.

> Los usuarios de prueba (`admin@pos.local` y `cajero@pos.local`, contraseña `Admin1234`) son solo para desarrollo.
