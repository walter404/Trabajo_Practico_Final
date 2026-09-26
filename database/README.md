# Base de datos — MongoDB

El diseño completo de la base de datos (colecciones, campos, tipos, relaciones e índices) está documentado en [`/docs/esquema-bd.md`](../docs/esquema-bd.md). Esta carpeta contiene los **scripts** que materializan ese diseño.

Como MongoDB es una base documental, no existen scripts DDL en el sentido de SQL (`CREATE TABLE`). Su equivalente son los scripts que crean las colecciones con sus reglas de validación y sus índices.

## Estructura de carpetas

| Carpeta | Contenido |
|---|---|
| `schemas/` | Scripts de creación de colecciones con validación `$jsonSchema` y definición de índices (equivalente al DDL). |
| `seeds/` | Datos iniciales de prueba: usuario administrador, categorías y productos de ejemplo (equivalente al DML). |
