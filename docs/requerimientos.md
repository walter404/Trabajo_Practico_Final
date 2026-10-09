# Requerimientos del Sistema

**Proyecto:** Sistema Centralizado de Punto de Venta (POS) e Inventario
**Entrega:** 2.ª Entrega — Diseño y Módulos
**Integrantes:** Ignacio Salazar, Martin Gomez, Walter Verdun

---

## 1. Objetivo y convenciones

Este documento formaliza los **requerimientos funcionales (RF)**, los **requerimientos no funcionales (RNF)**, el **catálogo de reglas de negocio (RN)** y los **criterios de aceptación (CA)** del sistema, y los vincula entre sí y con el diseño mediante una **matriz de trazabilidad**.

- **Identificadores:** `RF-xx`, `RNF-xx`, `RN-xx`, `CA-xx` y `CU-xx` (casos de uso, ver [`casos-de-uso.md`](./casos-de-uso.md)). Un identificador no se reutiliza aunque el requerimiento se elimine.
- **Prioridad y etapa:** cada RF hereda la prioridad y la etapa de su módulo (criterio en [`modulos.md`](./modulos.md)).
- **Verificabilidad:** todo RF se valida con al menos un criterio de aceptación, y todo RNF tiene una métrica o un método de verificación.

---

## 2. Requerimientos funcionales

### Módulo 1 — Autenticación y Usuarios (Alta · Etapa 1)

| ID | Requerimiento |
|---|---|
| RF-01 | El sistema debe permitir iniciar sesión con email y contraseña, y emitir un token JWT que identifique al usuario y su rol. |
| RF-02 | El sistema debe permitir cerrar sesión, descartando el token en el cliente. |
| RF-03 | El sistema debe permitir al administrador dar de alta, editar y dar de baja lógica a usuarios, asignándoles el rol `admin` o `cajero`. |
| RF-04 | El sistema debe restringir pantallas y endpoints según el rol del usuario, verificándolo en el backend. |

### Módulo 2 — Catálogo de Productos y Categorías (Alta · Etapa 1)

| ID | Requerimiento |
|---|---|
| RF-05 | El sistema debe permitir al administrador dar de alta, editar y dar de baja lógica a categorías. |
| RF-06 | El sistema debe permitir al administrador dar de alta, editar y dar de baja lógica a productos. |
| RF-07 | El sistema debe permitir buscar productos activos por código de barras exacto o por nombre parcial. |
| RF-08 | El sistema debe permitir modificar el precio de venta de un producto individual, registrando el cambio en el historial de precios. |

### Módulo 3 — Punto de Venta (Alta · Etapa 1)

| ID | Requerimiento |
|---|---|
| RF-09 | El sistema debe permitir armar un carrito: agregar productos por código de barras o por nombre, modificar cantidades y quitar ítems. |
| RF-10 | El sistema debe calcular automáticamente el subtotal, el descuento, el total y el vuelto de la venta. |
| RF-11 | El sistema debe registrar el método de pago de la venta (`efectivo`, `debito`, `credito`, `transferencia`). |
| RF-12 | El sistema debe confirmar la venta registrándola y descontando el stock de todos sus ítems en una única operación atómica. |
| RF-13 | El sistema debe asignar a cada venta un número de ticket correlativo y único. |
| RF-14 | El sistema debe emitir el comprobante (ticket) de la venta confirmada. |
| RF-15 | El sistema debe permitir al administrador anular una venta confirmada, restituyendo el stock y conservando el documento. |

### Módulo 4 — Gestión Masiva de Precios (Alta · Etapa 1)

| ID | Requerimiento |
|---|---|
| RF-16 | El sistema debe permitir seleccionar los productos a ajustar por categoría o por texto de búsqueda (el filtro por proveedor se incorpora en la Etapa 2, ver RF-31). |
| RF-17 | El sistema debe permitir definir el ajuste por porcentaje o por valor fijo, positivo (aumento) o negativo (reducción). |
| RF-18 | El sistema debe mostrar una vista previa (simulación) con el precio actual y el precio resultante de cada producto, sin modificar datos. |
| RF-19 | El sistema debe aplicar el ajuste en lote, registrando el lote en `ajustes_precio` y el precio anterior y nuevo de cada producto en `historial_precios`. |
| RF-20 | El sistema debe permitir revertir un lote aplicado, restaurando los precios anteriores. |
| RF-21 | El sistema debe permitir consultar el historial de precios de un producto. |

### Módulo 5 — Inventario y Stock (Alta · Etapa 1)

| ID | Requerimiento |
|---|---|
| RF-22 | El sistema debe permitir consultar el stock actual de los productos. |
| RF-23 | El sistema debe permitir al administrador ajustar manualmente el stock de un producto. |
| RF-24 | El sistema debe permitir definir el stock mínimo de cada producto. |
| RF-25 | El sistema debe mostrar alertas visuales de los productos con stock igual o inferior al mínimo. |

### Módulo 6 — Impresión de Etiquetas de Góndola (Media · Etapa 2)

| ID | Requerimiento |
|---|---|
| RF-26 | El sistema debe generar etiquetas imprimibles (nombre, precio y código de barras) para una selección individual, una categoría o un lote de ajuste. |

### Módulo 7 — Reportes (Media · Etapa 2)

| ID | Requerimiento |
|---|---|
| RF-27 | El sistema debe emitir un reporte de ventas por período. |
| RF-28 | El sistema debe emitir un reporte de productos más vendidos en un período. |
| RF-29 | El sistema debe emitir un reporte de rentabilidad y margen, calculado con los precios de venta y de costo del momento de cada venta (snapshot). |

### Módulo 8 — Proveedores (Media · Etapa 2)

| ID | Requerimiento |
|---|---|
| RF-30 | El sistema debe permitir al administrador dar de alta, editar y dar de baja lógica a proveedores. |
| RF-31 | El sistema debe permitir asociar productos a un proveedor y usar el proveedor como filtro del ajuste masivo de precios. |

### Módulo 9 — Ingresos de Mercadería y Movimientos de Stock (Media · Etapa 2)

| ID | Requerimiento |
|---|---|
| RF-32 | El sistema debe permitir registrar un ingreso de mercadería (proveedor, productos, cantidades y costos unitarios), incrementando el stock. |
| RF-33 | El sistema debe permitir anular un ingreso de mercadería, descontando el stock ingresado y conservando el documento. |
| RF-34 | El sistema debe registrar automáticamente un movimiento de stock por cada venta, anulación, ingreso y ajuste manual. |
| RF-35 | El sistema debe permitir consultar el historial de movimientos de stock de un producto. |

---

## 3. Requerimientos no funcionales

| ID | Categoría | Requerimiento | Métrica / verificación |
|---|---|---|---|
| RNF-01 | Rendimiento | Búsqueda de un producto por código de barras. | Respuesta de la API ≤ 500 ms en el 95 % de las peticiones, con un catálogo de 5.000 productos. Prueba de carga con datos generados. |
| RNF-02 | Rendimiento | Confirmación de una venta. | ≤ 2 s para una venta de hasta 50 ítems. |
| RNF-03 | Rendimiento | Aplicación de un ajuste masivo. | ≤ 5 s de procesamiento para 500 productos. El flujo completo del usuario (filtro, vista previa y confirmación) ≤ 30 s. |
| RNF-04 | Concurrencia | Varias cajas operando a la vez. | Con 3 cajas vendiendo el mismo producto en simultáneo, no se vende stock inexistente ni se repiten números de ticket. Prueba de ventas concurrentes. |
| RNF-05 | Seguridad | Almacenamiento de contraseñas. | bcrypt con factor de costo ≥ 10. Ningún endpoint devuelve `passwordHash`. |
| RNF-06 | Seguridad | Control de acceso. | Todos los endpoints, salvo el login, exigen un JWT válido. El token vence a las 8 h (un turno de trabajo). Sin token → `401`; rol insuficiente → `403`. |
| RNF-07 | Seguridad | Protección del login. | Tras 5 intentos fallidos en 15 minutos desde una misma IP, se rechazan nuevos intentos durante 15 minutos. |
| RNF-08 | Seguridad | Comunicación y secretos. | HTTPS en el entorno desplegado. Cadena de conexión y clave JWT solo en variables de entorno; ningún secreto en el repositorio. |
| RNF-09 | Integridad | Exactitud de importes. | Importes en `Decimal128` con 2 decimales. El total del ticket coincide siempre con la suma de sus ítems menos el descuento. |
| RNF-10 | Integridad | Atomicidad. | Venta, anulación, ajuste masivo, reversión e ingreso se ejecutan en transacciones. Verificación: forzar un error a mitad de la operación y comprobar que no quedan cambios parciales. |
| RNF-11 | Auditoría | Registro de operaciones. | El 100 % de las ventas, anulaciones, cambios de precio y reversiones registra usuario y fecha. Desde la Etapa 2, también el 100 % de los movimientos de stock. |
| RNF-12 | Usabilidad | Velocidad de operación en caja. | La venta de un producto con lector requiere como máximo 3 acciones (escanear, elegir método de pago, confirmar). El POS es operable solo con teclado y lector. |
| RNF-13 | Usabilidad | Mensajes de error. | En español, indicando la causa y el dato afectado (ej. "Stock insuficiente: Leche entera 1 L — disponible: 5"). |
| RNF-14 | Compatibilidad | Navegadores y pantallas. | Últimas 2 versiones de Chrome, Edge y Firefox. Resolución mínima 1366 × 768. |
| RNF-15 | Disponibilidad | Acceso al servicio. | Servicio accesible en horario comercial. En el entorno académico (planes gratuitos) se acepta una demora de arranque cuando el servicio estuvo inactivo; en un despliegue comercial se requiere un plan sin suspensión. |
| RNF-16 | Mantenibilidad | Organización y pruebas. | Reglas de negocio solo en la capa de servicios. Cobertura de pruebas unitarias ≥ 60 % en los servicios de ventas, precios e inventario. |
| RNF-17 | Portabilidad | Instalación del entorno. | Configuración por variables de entorno documentadas en `.env.example`. El proyecto se levanta en local con `npm install` y `npm run dev`. |

---

## 4. Catálogo de reglas de negocio

### Acceso y datos maestros

| ID | Regla |
|---|---|
| RN-01 | Solo los usuarios activos pueden iniciar sesión. |
| RN-02 | El **cajero** puede buscar productos, registrar ventas y emitir tickets. El **administrador** puede realizar todas las operaciones del sistema, incluidas las del cajero. |
| RN-03 | Son únicos: el email del usuario, el nombre de la categoría, el código de barras del producto (cuando existe) y el CUIT del proveedor (cuando existe). |
| RN-04 | Usuarios, categorías, productos y proveedores no se eliminan físicamente: se dan de baja lógica (`activo: false`). |
| RN-05 | Un producto inactivo no aparece en la búsqueda del POS, no puede venderse y no se incluye en los ajustes masivos. |

### Ventas

| ID | Regla |
|---|---|
| RN-06 | El stock nunca puede ser negativo. Si algún ítem de la venta no tiene stock suficiente, se rechaza la venta completa. |
| RN-07 | Una venta tiene al menos un ítem, y cada ítem una cantidad mayor a 0. La cantidad es entera para productos con unidad de medida `unidad`, y puede ser decimal para `kg` y `litro`. |
| RN-08 | Cada ítem conserva una copia (snapshot) del nombre, el código de barras, el precio de venta y el precio de costo vigentes al momento de la venta. |
| RN-09 | Los importes se calculan en el servidor a partir de los precios vigentes; no se aceptan precios enviados por el cliente. `total = subtotal − descuento`, con `0 ≤ descuento ≤ subtotal`. |
| RN-10 | En pagos en efectivo, `montoRecibido ≥ total` y `vuelto = montoRecibido − total`. En los demás métodos, el vuelto es 0. |
| RN-11 | El número de ticket es correlativo y único, y no se reutiliza aunque la venta se anule. |
| RN-12 | Solo el administrador puede anular una venta. Solo se anulan ventas confirmadas, una única vez. La anulación restituye el stock, conserva el documento y registra quién y cuándo la realizó. |

### Precios

| ID | Regla |
|---|---|
| RN-13 | Todo precio de venta debe ser mayor a 0 y se redondea a 2 decimales. |
| RN-14 | Todo cambio de precio, individual o masivo, se registra en `historial_precios` con el precio anterior, el nuevo, el usuario y la fecha. Los cambios masivos registran además el `ajusteId` del lote. |
| RN-15 | Un ajuste masivo solo se aplica después de una vista previa y de la confirmación explícita del administrador. |
| RN-16 | Ajuste por porcentaje: `precioNuevo = precioActual × (1 + valor / 100)`. Ajuste por valor fijo: `precioNuevo = precioActual + valor`. Un valor negativo representa una reducción. Si algún precio resultante es ≤ 0, se rechaza el lote completo. |
| RN-17 | Un ajuste masivo se aplica a todos los productos seleccionados o a ninguno (operación atómica). |
| RN-18 | Un lote se revierte una única vez. La reversión se rechaza si alguno de sus productos tuvo un cambio de precio posterior al lote, informando cuáles. Al revertir, se registra en `historial_precios` un nuevo cambio por producto (con el mismo `ajusteId`) y en el lote, el usuario y la fecha de la reversión. |

### Stock e ingresos de mercadería

| ID | Regla |
|---|---|
| RN-19 | Un producto está en alerta de stock bajo cuando `stock ≤ stockMinimo`. El stock mínimo no puede ser negativo. |
| RN-20 | Solo el administrador puede ajustar el stock manualmente, y el valor resultante no puede ser negativo. |
| RN-21 | Un ingreso de mercadería requiere un proveedor activo y al menos un ítem con cantidad > 0 y costo unitario ≥ 0. Recibe un número correlativo y único. Al confirmarse, incrementa el stock de cada producto y actualiza su `precioCosto` con el costo unitario del ingreso (criterio de último costo). No modifica el precio de venta. |
| RN-22 | Solo se anulan ingresos confirmados, una única vez, y solo si el stock actual de cada producto alcanza para descontar la cantidad ingresada. La anulación no restaura el `precioCosto` anterior. |
| RN-23 | (Etapa 2) Toda variación de stock genera un movimiento con su tipo, la cantidad con signo (venta −, anulación de venta +, ingreso +, anulación de ingreso −, ajuste ±), el stock resultante, el usuario y la referencia a la operación que lo originó (`ventaId` o `ingresoId`). |

---

## 5. Criterios de aceptación

Formato: **Dado** (contexto) · **Cuando** (acción) · **Entonces** (resultado esperado).

| ID | CU | Dado | Cuando | Entonces |
|---|---|---|---|---|
| CA-01 | CU-01 | Un usuario activo con credenciales correctas | Inicia sesión | Recibe un token JWT y accede a las pantallas de su rol. |
| CA-02 | CU-01 | Un email existente con contraseña incorrecta | Intenta iniciar sesión | Se responde `401` con un mensaje genérico que no indica cuál de los dos datos es incorrecto. |
| CA-03 | CU-01 | Un usuario dado de baja | Intenta iniciar sesión | Se rechaza el acceso. |
| CA-04 | CU-01 | Un cajero con sesión iniciada | Invoca un endpoint exclusivo del administrador | Se responde `403` y no se ejecuta la operación. |
| CA-05 | CU-02 | Un usuario existente con email `admin@pos.local` | Se intenta crear otro usuario con el mismo email | Se rechaza el alta indicando que el email ya existe. |
| CA-06 | CU-02 | Un cajero con ventas registradas | El administrador lo da de baja | El cajero no puede iniciar sesión y sus ventas se conservan. |
| CA-07 | CU-04 | Un producto con código de barras `7790000000011` | Se intenta crear otro producto con el mismo código | Se rechaza el alta. |
| CA-08 | CU-04 | Un producto con precio $1.000 | El administrador lo cambia a $1.100 | Se registra en el historial: anterior 1.000, nuevo 1.100, usuario, fecha y sin `ajusteId`. |
| CA-09 | CU-04 | Un producto con ventas registradas | Se da de baja | No aparece en la búsqueda del POS y las ventas anteriores siguen mostrándolo. |
| CA-10 | CU-05 | Un producto activo con código de barras cargado | Se escanea el código en el POS | El producto se agrega al carrito (respuesta de la API dentro de RNF-01). |
| CA-11 | CU-05 | Productos activos "Gaseosa cola 2,25 L" y "Gaseosa lima 1,5 L" | Se busca el texto "gaseosa" | Se listan ambos productos y ningún producto inactivo. |
| CA-12 | CU-06 | Stock suficiente para todos los ítems y último ticket N.º 41 | Se confirma la venta | La venta queda `confirmada` con el N.º 42 y el stock de cada producto disminuye en la cantidad vendida. |
| CA-13 | CU-06 | Un ítem del carrito sin stock suficiente | Se confirma la venta | Se rechaza la venta completa, ningún stock cambia y el número de ticket no se consume. |
| CA-14 | CU-06 | Pago en efectivo con monto recibido menor al total | Se intenta confirmar | El sistema no permite confirmar e informa el faltante. |
| CA-15 | CU-06 | Total $8.750 y pago en efectivo con $10.000 | Se confirma la venta | El vuelto registrado y mostrado es $1.250. |
| CA-16 | CU-06 | Una venta registrada con un producto a $1.000 | El producto aumenta a $1.200 | El ticket de esa venta sigue mostrando $1.000. |
| CA-17 | CU-07 | Una venta confirmada | El administrador la anula | La venta queda `anulada`, el stock se restituye y se registran el usuario y la fecha de anulación. |
| CA-18 | CU-07 | Una venta ya anulada | Se intenta anular nuevamente | Se rechaza la operación. |
| CA-19 | CU-08 | Categoría "Bebidas" con 2 productos activos | Se simula un aumento del 10 % | Se muestran ambos productos con precio actual y resultante, y ningún precio cambia en la base. |
| CA-20 | CU-08 | La simulación anterior | El administrador confirma | Se crea 1 registro en `ajustes_precio` con `cantidadProductos = 2`, 2 registros en `historial_precios` con el mismo `ajusteId`, y cada precio queda en `round(precio × 1,10; 2)`. |
| CA-21 | CU-08 | Un producto a $500 dentro del filtro | Se aplica una reducción de valor fijo de −$600 | Se rechaza el lote completo y ningún precio cambia. |
| CA-22 | CU-08 | Un producto inactivo dentro de la categoría filtrada | Se aplica el ajuste | El producto inactivo no se modifica ni se cuenta en el lote. |
| CA-23 | CU-08 | 500 productos que cumplen el filtro | Se aplica el ajuste | La operación finaliza dentro de RNF-03. |
| CA-24 | CU-09 | Un lote aplicado sin cambios posteriores | El administrador lo revierte | Los precios vuelven a sus valores anteriores, el lote queda `revertido` con usuario y fecha, y el historial registra la reversión. |
| CA-25 | CU-09 | Un lote ya revertido | Se intenta revertir de nuevo | Se rechaza la operación. |
| CA-26 | CU-09 | Un lote con un producto cuyo precio cambió después | Se intenta revertir | Se rechaza la reversión indicando el producto afectado. |
| CA-27 | CU-11 | Un producto con stock 10 | Se intenta ajustar el stock a −3 | Se rechaza el ajuste. |
| CA-28 | CU-12 | Un producto con stock 5 y mínimo 20 | Se consultan las alertas | El producto figura en alerta; al llevar su stock a 25 deja de figurar. |
| CA-29 | CU-13 | Un lote de ajuste con 30 productos | Se generan las etiquetas del lote | Se obtienen 30 etiquetas con nombre, precio nuevo y código de barras. |
| CA-30 | CU-14 | Una venta con un producto de costo $700 al momento de la venta, que luego pasa a $900 | Se emite el reporte de rentabilidad | El margen de esa venta se calcula con el costo $700. |
| CA-31 | CU-15 | Un proveedor con CUIT `30-00000000-0` | Se intenta crear otro con el mismo CUIT | Se rechaza el alta. Dos proveedores sin CUIT sí pueden coexistir. |
| CA-32 | CU-16 | Un producto con stock 10 y costo $700 | Se confirma un ingreso de 20 unidades a $750 | El stock queda en 30, el `precioCosto` en $750, el ingreso recibe un número correlativo y se genera un movimiento de tipo `ingreso`. |
| CA-33 | CU-16 | Un proveedor inactivo | Se intenta registrar un ingreso con ese proveedor | Se rechaza el ingreso. |
| CA-34 | CU-17 | Un ingreso de 20 unidades de un producto con stock actual 12 | Se intenta anular el ingreso | Se rechaza la anulación por stock insuficiente. |
| CA-35 | CU-18 | Un producto con ventas e ingresos | Se consultan sus movimientos | Se listan ordenados del más reciente al más antiguo, con tipo, cantidad, stock resultante y operación de origen. |

---

## 6. Matriz de trazabilidad

### 6.1 Problemática → requerimientos

| Necesidad identificada (README, secciones 1 y 2) | Requerimientos que la resuelven |
|---|---|
| Actualización manual de precios que insume 3–5 horas semanales | RF-16 a RF-20 |
| Pérdida de margen por rezago en la remarcación | RF-19, RF-21, RF-29 |
| Incoherencia entre el precio de góndola y el de caja | RF-19 (precio único en la base), RF-26 |
| Demoras en la atención en caja | RF-07, RF-09, RF-10, RF-12, RF-14 |
| Control de stock manual o diferido | RF-22 a RF-25, RF-32 a RF-35 |
| Responsabilidad sobre las operaciones (quién vendió, quién cambió un precio) | RF-01, RF-04, RF-15, RF-19 |

### 6.2 Requerimientos → diseño y validación

| RF | Módulo | CU | RN | CA | Colecciones | Endpoint | Etapa |
|---|:--:|---|---|---|---|---|:--:|
| RF-01 | 1 | CU-01 | RN-01 | CA-01, CA-02, CA-03 | `usuarios` | `POST /api/auth/login` | 1 |
| RF-02 | 1 | CU-01 | — | — | — | (cliente) | 1 |
| RF-03 | 1 | CU-02 | RN-03, RN-04 | CA-05, CA-06 | `usuarios` | `GET` · `POST` · `PUT /api/usuarios` | 1 |
| RF-04 | 1 | CU-01 | RN-02 | CA-04 | `usuarios` | Middleware de rol (todas las rutas) | 1 |
| RF-05 | 2 | CU-03 | RN-03, RN-04 | — | `categorias` | `GET` · `POST` · `PUT /api/categorias` | 1 |
| RF-06 | 2 | CU-04 | RN-03, RN-04, RN-05 | CA-07, CA-09 | `productos` | `GET` · `POST` · `PUT` · `DELETE /api/productos` | 1 |
| RF-07 | 2 | CU-05 | RN-05 | CA-10, CA-11 | `productos` | `GET /api/productos?codigo=` · `?q=` | 1 |
| RF-08 | 2 | CU-04 | RN-13, RN-14 | CA-08 | `productos`, `historial_precios` | `PUT /api/productos/:id` | 1 |
| RF-09 | 3 | CU-06 | RN-07 | CA-10 | `productos` | (frontend) | 1 |
| RF-10 | 3 | CU-06 | RN-09, RN-10 | CA-14, CA-15 | `ventas` | `POST /api/ventas` | 1 |
| RF-11 | 3 | CU-06 | RN-10 | CA-15 | `ventas` | `POST /api/ventas` | 1 |
| RF-12 | 3 | CU-06 | RN-05, RN-06, RN-08 | CA-12, CA-13, CA-16 | `ventas`, `productos` | `POST /api/ventas` | 1 |
| RF-13 | 3 | CU-06 | RN-11 | CA-12, CA-13 | `contadores`, `ventas` | `POST /api/ventas` | 1 |
| RF-14 | 3 | CU-06 | RN-08 | CA-16 | `ventas` | `GET /api/ventas/:id/ticket` | 1 |
| RF-15 | 3 | CU-07 | RN-12 | CA-17, CA-18 | `ventas`, `productos` | `PUT /api/ventas/:id/anular` | 1 |
| RF-16 | 4 | CU-08 | RN-05 | CA-19, CA-22 | `productos` | `POST /api/precios/simular` | 1 |
| RF-17 | 4 | CU-08 | RN-13, RN-16 | CA-20, CA-21 | `ajustes_precio` | `POST /api/precios/simular` · `PUT /api/precios/lote` | 1 |
| RF-18 | 4 | CU-08 | RN-15 | CA-19 | `productos` | `POST /api/precios/simular` | 1 |
| RF-19 | 4 | CU-08 | RN-14, RN-17 | CA-20, CA-23 | `productos`, `ajustes_precio`, `historial_precios` | `PUT /api/precios/lote` | 1 |
| RF-20 | 4 | CU-09 | RN-18 | CA-24, CA-25, CA-26 | `productos`, `ajustes_precio`, `historial_precios` | `POST /api/precios/lote/:id/revertir` | 1 |
| RF-21 | 4 | CU-10 | RN-14 | CA-08 | `historial_precios` | `GET /api/precios/historial/:productoId` | 1 |
| RF-22 | 5 | CU-12 | — | — | `productos` | `GET /api/productos` | 1 |
| RF-23 | 5 | CU-11 | RN-06, RN-20 | CA-27 | `productos` | `PUT /api/inventario/:id` | 1 |
| RF-24 | 5 | CU-11 | RN-19 | CA-28 | `productos` | `PUT /api/inventario/:id` | 1 |
| RF-25 | 5 | CU-12 | RN-19 | CA-28 | `productos` | `GET /api/inventario/alertas` | 1 |
| RF-26 | 6 | CU-13 | — | CA-29 | `productos`, `ajustes_precio` | `POST /api/etiquetas/generar` | 2 |
| RF-27 | 7 | CU-14 | — | — | `ventas` | `GET /api/reportes/ventas` | 2 |
| RF-28 | 7 | CU-14 | — | — | `ventas` | `GET /api/reportes/mas-vendidos` | 2 |
| RF-29 | 7 | CU-14 | RN-08 | CA-30 | `ventas` | `GET /api/reportes/rentabilidad` | 2 |
| RF-30 | 8 | CU-15 | RN-03, RN-04 | CA-31 | `proveedores` | `GET` · `POST` · `PUT /api/proveedores` | 2 |
| RF-31 | 8 | CU-04, CU-08 | RN-05 | — | `productos`, `proveedores` | `PUT /api/productos/:id` · `POST /api/precios/simular` | 2 |
| RF-32 | 9 | CU-16 | RN-21 | CA-32, CA-33 | `ingresos_stock`, `productos`, `contadores`, `movimientos_stock` | `POST /api/ingresos` | 2 |
| RF-33 | 9 | CU-17 | RN-22 | CA-34 | `ingresos_stock`, `productos`, `movimientos_stock` | `PUT /api/ingresos/:id/anular` | 2 |
| RF-34 | 9 | CU-06, CU-07, CU-11, CU-16, CU-17 | RN-23 | CA-32 | `movimientos_stock` | (interno, capa de servicios) | 2 |
| RF-35 | 9 | CU-18 | RN-23 | CA-35 | `movimientos_stock` | `GET /api/inventario/:productoId/movimientos` | 2 |

### 6.3 Requerimientos no funcionales → componentes

| RNF | Componente o decisión de diseño que lo soporta |
|---|---|
| RNF-01 | Índice único sobre `codigoBarras` ([`esquema-bd.md`](./esquema-bd.md), punto 6). |
| RNF-02, RNF-04, RNF-10 | Transacciones sobre MongoDB Atlas (replica set) y descuento condicionado `stock ≥ cantidad` (esquema, punto 8.2). |
| RNF-03 | `updateMany` con pipeline ejecutado en el servidor de base de datos (esquema, punto 8.3). |
| RNF-05 a RNF-08 | Middlewares de autenticación y rol, bcrypt, variables de entorno ([`arquitectura.md`](./arquitectura.md), puntos 5.6 y 6). |
| RNF-09 | Tipo `Decimal128` y `$round` a 2 decimales. |
| RNF-11 | Colecciones `historial_precios`, `ajustes_precio`, `movimientos_stock` y campos de auditoría ([`arquitectura.md`](./arquitectura.md), punto 9). |
| RNF-12, RNF-13 | SPA en React con foco automático en el campo de lectura del POS. |
| RNF-15, RNF-17 | Despliegue en Render, Vercel y Atlas ([`arquitectura.md`](./arquitectura.md), punto 8). |
| RNF-16 | Arquitectura en capas (routes → middlewares → controllers → services → models). |