# Backend — API REST (Node.js + Express)

> **Estado:** estructura inicial. Todavía no contiene código: la implementación comienza una vez aprobada la 2.ª entrega (Diseño y Módulos).

## Arquitectura

El backend sigue una **arquitectura en capas basada en MVC**. Cada petición HTTP recorre las capas en un único sentido:

```
Petición → routes → middlewares → controllers → services → models → MongoDB
```

Cada capa tiene una sola responsabilidad y solo conoce a la capa inmediatamente inferior. Así, la lógica de negocio (por ejemplo, el aumento masivo de precios) no depende de Express y puede probarse de forma aislada.

## Estructura de carpetas

| Carpeta | Responsabilidad |
|---|---|
| `src/config/` | Configuración de la aplicación: conexión a MongoDB y lectura de variables de entorno. |
| `src/models/` | Esquemas y modelos de Mongoose. Implementan el diseño definido en [`/docs/esquema-bd.md`](../docs/esquema-bd.md), incluidas las validaciones de campos. |
| `src/routes/` | Definición de los endpoints de la API (`/api/productos`, `/api/ventas`, etc.) y asignación de cada uno a su controlador. |
| `src/middlewares/` | Funciones que se ejecutan antes del controlador: autenticación (JWT), autorización por rol, validación de datos de entrada y manejo centralizado de errores. |
| `src/controllers/` | Reciben la petición, invocan al servicio correspondiente y arman la respuesta HTTP. No contienen lógica de negocio. |
| `src/services/` | Lógica de negocio: confirmación de ventas con descuento de stock, ajustes masivos de precios, reversión de lotes, reportes. |
| `src/utils/` | Funciones auxiliares reutilizables (formateo de importes, manejo de `Decimal128`, generación de números correlativos). |
| `tests/` | Pruebas automatizadas de servicios y endpoints. |
