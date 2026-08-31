# Sistema Centralizado de Punto de Venta (POS) e Inventario  
**Optimización de Operaciones de Caja y Remarcación Agilizada de Precios en Arquitectura MERN**

---

## 📌 Información General
- **Grupo:** 100
- **Estudiantes:** Ignacio Salazar, Martín Gomez, Walter Verdun  
- **Carrera:** Tecnicatura en Programación  
- **Unidad:** Unidad 1 - Actividad 1 (U1-A1)  
- **Stack Tecnológico:** MERN (MongoDB, Express, React, Node.js)  

---

## 1. Identificación de la Problemática Real y Contexto Económico Nacional
En el sector minorista argentino (almacenes, minimarkets, ferreterías, autoservicios), la inflación acelerada obliga a los comerciantes a actualizar precios constantemente.  
Esto genera tareas tediosas y pérdidas de rentabilidad por desactualización de precios.

**Impactos principales:**
- ⏳ Actualización manual de 200–500 productos insume 3–5 horas semanales.  
- 📉 Pérdida de margen del 5% al 12% por rezago en la remarcación.  
- ⚠️ Incoherencia entre góndola y caja → reclamos de clientes.  
- 🐌 Demoras en la atención por falta de automatización.  

---

## 2. Identificación de Actores y Necesidades
- **Vendedor / Cajero:**  
  - Interfaz ágil de POS con actualización en tiempo real.  
  - Búsqueda por código de barras o nombre.  
  - Carrito dinámico, cálculo automático de vuelto y emisión de ticket.  

- **Administrador / Dueño:**  
  - Gestión masiva de precios (por % o valor fijo).  
  - Impresión masiva de etiquetas de góndola.  

---

## 3. Análisis del Flujo de Trabajo

| Etapa del Proceso | Manual Actual | Automatizado Propuesto (OmniPOS) |
|-------------------|---------------|----------------------------------|
| Remarcación de Precios | Cálculo individual y manual | Ajuste en lote por % o valor fijo |
| Etiquetado de Góndola | Etiquetas una por una | Impresión masiva instantánea |
| Atención en Caja | Consulta manual de listas | Precios reflejados en tiempo real, lectura por código |
| Control de Stock | Descuento manual o diferido | Descuento automático y alertas visuales |

---

## 4. Innovación Clave
Módulo de **Gestión Masiva de Precios e Impresión**:
1. Selección múltiple en lote.  
2. Modificación por porcentaje (%).  
3. Modificación por número final ($).  
4. Impresión masiva de etiquetas de góndola.  

---

## 5. Arquitectura y Stack Tecnológico (MERN)

| Tecnología | Capa | Función |
|------------|------|---------|
| **MongoDB** | Base de Datos | Catálogo de productos, ventas, historial de precios |
| **Express.js** | Backend API REST | Endpoints `/api/productos`, `/api/ventas`, middlewares |
| **React.js** | Frontend | POS, edición masiva, renderizado dinámico |
| **Node.js** | Backend Runtime | Servidor asíncrono, E/S no bloqueante |

---

## 6. Módulos del Sistema

| Módulo | Descripción | Operaciones |
|--------|-------------|-------------|
| Autenticación y Usuarios | Roles Admin y Cajero | login(), logout(), crearUsuario() |
| Catálogo de Productos | ABM completo | listarProductos(), crearProducto(), editarProducto() |
| Inventario y Stock | Control de existencias y alertas | descontarStock(), consultarStock() |
| Punto de Venta (POS) | Carrito dinámico y tickets | agregarAlCarrito(), confirmarVenta(), emitirTicket() |
| Gestión Masiva de Precios | Ajustes en lote | aplicarPorcentaje(), aplicarValorFijo() |
| Impresión de Etiquetas | Generación masiva | generarEtiquetas(), imprimirLote() |
| Reportes | Ventas y rentabilidad | reporteVentas(), productosMasVendidos() |

---

## 7. Endpoints API REST

Ejemplos principales:
- **Autenticación:**  
  - `POST /api/auth/login` → Validar credenciales  
  - `GET /api/usuarios` → Listar usuarios  

- **Productos:**  
  - `GET /api/productos` → Listar productos  
  - `POST /api/productos` → Alta de producto  
  - `PUT /api/productos/:id` → Editar producto  
  - `DELETE /api/productos/:id` → Baja de producto  

- **Inventario:**  
  - `GET /api/inventario/alertas` → Stock bajo  
  - `PUT /api/inventario/:id` → Ajustar stock  

- **Ventas (POS):**  
  - `POST /api/ventas` → Registrar venta y descontar stock  
  - `GET /api/ventas/:id/ticket` → Generar comprobante  

- **Precios:**  
  - `POST /api/precios/simular` → Previsualizar aumento  
  - `PUT /api/precios/lote` → Aplicar aumento en lote  

- **Etiquetas:**  
  - `POST /api/etiquetas/generar` → Generar lote de etiquetas  

- **Reportes:**  
  - `GET /api/reportes/ventas` → Ventas por período  
  - `GET /api/reportes/rentabilidad` → Margen de ganancia  

---

## 8. Modelo de Datos (MongoDB)

- **usuarios** → _id, nombre, email, rol, activo  
- **productos** → _id, nombre, código, categoría, precioCosto, precioVenta, stock  
- **ventas** → _id, fecha, usuarioId, items[], total, pago, vuelto  
- **historial_precios** → _id, productoId, precioAnterior, precioNuevo, tipoAjuste, fecha  

---

## 9. Alcance de la Primera Etapa
- Autenticación y Usuarios  
- Catálogo de Productos  
- Inventario y Stock  
- Punto de Venta (POS)  
- Gestión Masiva de Precios  

---

## 10. Proyección de Escalabilidad
- 📂 Carga de listas de precios por proveedores (CSV/Excel).  
- 🏬 Multi-sucursal con stock independiente.  
- 💳 Integración con Mercado Pago y AFIP.  
- 📩 Notificaciones automáticas por email.  
- 📱 Versión móvil (PWA).  

---

## ✅ Valor Agregado
El sistema convierte horas de remarcado manual en **menos de 30 segundos**, con integración end-to-end en JavaScript y máxima estabilidad para el negocio.
