# Listado de Módulos del Sistema

**Proyecto:** Sistema Centralizado de Punto de Venta (POS) e Inventario
**Entrega:** 2.ª Entrega — Diseño y Módulos
**Integrantes:** Ignacio Salazar, Martin Gomez, Walter Verdun

---

## 1. Criterio de priorización

Cada módulo tiene asignada una prioridad según su aporte a la solución de la problemática planteada en la 1.ª entrega (remarcación manual de precios y lentitud en la atención de caja):

| Prioridad | Criterio | Etapa |
|---|---|:--:|
| **Alta** | Imprescindible para que el sistema funcione o para resolver la problemática central. Sin él, el producto no tiene valor para el comercio. | 1 |
| **Media** | Aporta valor directo al usuario, pero el sistema puede operar sin él en una primera versión. | 2 |
| **Baja** | Mejora o complemento. Se implementa si el tiempo lo permite, o queda como proyección. | 3 |

Las colecciones mencionadas en cada módulo están definidas en [`esquema-bd.md`](./esquema-bd.md).

---

## 2. Resumen

| # | Módulo | Prioridad | Etapa | Roles |
|:--:|---|:--:|:--:|---|
| 1 | Autenticación y Usuarios | Alta | 1 | Admin, Cajero |
| 2 | Catálogo de Productos y Categorías | Alta | 1 | Admin (ABM), Cajero (consulta) |
| 3 | Punto de Venta (POS) | Alta | 1 | Cajero, Admin |
| 4 | Gestión Masiva de Precios | Alta | 1 | Admin |
| 5 | Inventario y Stock | Alta | 1 | Admin |
| 6 | Impresión de Etiquetas de Góndola | Media | 2 | Admin |
| 7 | Reportes | Media | 2 | Admin |
| 8 | Proveedores | Media | 2 | Admin |
| 9 | Movimientos de Stock | Baja | 2 | Admin |

---

## 3. Detalle de cada módulo

### 3.1 Autenticación y Usuarios — Prioridad Alta

Controla el acceso al sistema y los permisos según el rol. Es la base de todos los demás módulos: cada venta y cada cambio de precio queda asociado al usuario que lo realizó.

- **Funcionalidades:** inicio y cierre de sesión con JWT; alta, edición y baja lógica de usuarios; asignación de rol (`admin` o `cajero`); restricción de pantallas y endpoints según el rol.
- **Colecciones:** `usuarios`.
- **Endpoints:** `POST /api/auth/login`, `GET /api/usuarios`, `POST /api/usuarios`, `PUT /api/usuarios/:id`.

### 3.2 Catálogo de Productos y Categorías — Prioridad Alta

ABM de los productos que vende el comercio, organizados por categoría. Las categorías son el principal filtro para los aumentos masivos.

- **Funcionalidades:** alta, edición y baja lógica de productos; búsqueda por código de barras o por nombre; ABM de categorías; edición individual del precio (queda registrada en el historial).
- **Colecciones:** `productos`, `categorias`, `historial_precios`.
- **Endpoints:** `GET /api/productos`, `POST /api/productos`, `PUT /api/productos/:id`, `DELETE /api/productos/:id` (baja lógica), `GET /api/categorias`, `POST /api/categorias`.

### 3.3 Punto de Venta (POS) — Prioridad Alta

Pantalla de caja. Es el módulo de uso más frecuente, por lo que se prioriza la velocidad: la búsqueda por código de barras resuelve el producto en una sola lectura.

- **Funcionalidades:** carga de productos al carrito por código de barras o por nombre; modificación de cantidades; selección del método de pago; cálculo automático del vuelto; confirmación de la venta con descuento de stock en una transacción; numeración correlativa de tickets; emisión del comprobante; anulación de ventas.
- **Colecciones:** `ventas` (con `items` embebidos), `productos`, `contadores`.
- **Endpoints:** `POST /api/ventas`, `GET /api/ventas/:id/ticket`, `PUT /api/ventas/:id/anular`.

### 3.4 Gestión Masiva de Precios — Prioridad Alta

**Innovación central del proyecto.** Permite actualizar cientos de precios en una sola operación, reemplazando horas de remarcado manual.

- **Funcionalidades:** selección de productos por categoría, proveedor o búsqueda; aumento por porcentaje o por valor fijo; vista previa (simulación) antes de aplicar; aplicación en lote; registro del lote y del precio anterior de cada producto; reversión de un lote aplicado por error.
- **Colecciones:** `ajustes_precio`, `historial_precios`, `productos`.
- **Endpoints:** `POST /api/precios/simular`, `PUT /api/precios/lote`, `POST /api/precios/lote/:id/revertir`, `GET /api/precios/historial/:productoId`.

### 3.5 Inventario y Stock — Prioridad Alta

Control de existencias. El descuento por venta es automático (módulo POS); este módulo agrega el control y los ajustes manuales.

- **Funcionalidades:** consulta de stock; ajuste manual de existencias; definición de stock mínimo por producto; alertas visuales de stock bajo.
- **Colecciones:** `productos`.
- **Endpoints:** `GET /api/inventario/alertas`, `PUT /api/inventario/:id`.

### 3.6 Impresión de Etiquetas de Góndola — Prioridad Media

Complemento directo de la gestión masiva de precios: después de un aumento, genera las etiquetas de todos los productos afectados, para que el precio de góndola coincida con el de caja.

- **Funcionalidades:** selección de productos (individual, por categoría o por lote de ajuste); generación de etiquetas con nombre, precio y código de barras; vista de impresión.
- **Colecciones:** `productos`, `ajustes_precio`.
- **Endpoints:** `POST /api/etiquetas/generar`.

### 3.7 Reportes — Prioridad Media

Información para la toma de decisiones del dueño del comercio.

- **Funcionalidades:** ventas por período; productos más vendidos; rentabilidad y margen, calculados con los precios del momento de cada venta (snapshot).
- **Colecciones:** `ventas`, `productos`.
- **Endpoints:** `GET /api/reportes/ventas`, `GET /api/reportes/mas-vendidos`, `GET /api/reportes/rentabilidad`.

### 3.8 Proveedores — Prioridad Media

ABM de proveedores. Habilita el aumento masivo filtrado por proveedor, que es como suelen llegar las listas de precios al comercio.

- **Funcionalidades:** alta, edición y baja lógica de proveedores; asociación de productos a un proveedor.
- **Colecciones:** `proveedores`, `productos`.
- **Endpoints:** `GET /api/proveedores`, `POST /api/proveedores`, `PUT /api/proveedores/:id`.

### 3.9 Movimientos de Stock — Prioridad Baja

Trazabilidad completa de cada variación de existencias. En la Etapa 1 el stock se descuenta directamente sobre el producto; este módulo agrega el registro histórico.

- **Funcionalidades:** registro automático de cada venta, ingreso, ajuste y anulación; consulta del historial de movimientos por producto.
- **Colecciones:** `movimientos_stock`.
- **Endpoints:** `GET /api/inventario/:productoId/movimientos`.

---

## 4. Proyección (fuera del alcance actual)

Funcionalidades identificadas que no forman parte del desarrollo de este trabajo:

- Registro de compras o ingresos de mercadería.
- Importación de listas de precios de proveedores (CSV / Excel).
- Gestión multi-sucursal con stock independiente.
- Integración con Mercado Pago y facturación electrónica (ARCA, ex AFIP).
- Notificaciones por email.
- Versión móvil (PWA).
