# Sistema Centralizado de Punto de Venta (POS) e Inventario  
**Optimización de Operaciones de Caja y Remarcación Agilizada de Precios en Arquitectura MERN**

---

## 📌 Información General
- **Grupo:** 100
- **Estudiantes:** Ignacio Salazar, Martín Gomez, Walter Verdun  
- **Carrera:** Tecnicatura en Programación  
- **Entrega actual:** 2.ª Entrega — Diseño y Módulos  
- **Stack Tecnológico:** MERN (MongoDB, Express, React, Node.js)  

## 📚 Documentación del proyecto

| Documento | Contenido |
|-----------|-----------|
| [`docs/esquema-bd.md`](./docs/esquema-bd.md) | Esquema de la base de datos: colecciones, campos, tipos, relaciones, índices y diagramas. |
| [`docs/modulos.md`](./docs/modulos.md) | Listado de módulos con descripción, funcionalidades, endpoints y prioridad. |
| [`docs/arquitectura.md`](./docs/arquitectura.md) | Arquitectura elegida, tecnologías definitivas y justificación de las decisiones técnicas. |
| [`database/`](./database/) | Scripts de creación de colecciones e índices, y datos iniciales de prueba. |

## 📁 Estructura del repositorio

```
Trabajo_Practico_Final/
├── backend/     API REST en Node.js + Express (arquitectura en capas)
├── frontend/    Aplicación React (SPA)
├── database/    Scripts de base de datos (schemas y seeds)
├── docs/        Documentación, diagramas, módulos y arquitectura
└── README.md
```

> En esta etapa las carpetas `backend/` y `frontend/` contienen solo la estructura inicial, sin código. La implementación comienza una vez aprobada la 2.ª entrega.

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

Aplicación web cliente-servidor: un frontend **React** (SPA) consume una **API REST** en **Node.js + Express**, organizada en capas (routes → middlewares → controllers → services → models), que persiste los datos en **MongoDB Atlas**.

| Tecnología | Capa | Función |
|------------|------|---------|
| **MongoDB** | Base de Datos | Catálogo de productos, ventas, historial de precios |
| **Express.js** | Backend API REST | Endpoints, middlewares de autenticación y validación |
| **React.js** | Frontend | POS, edición masiva, renderizado dinámico |
| **Node.js** | Backend Runtime | Servidor asíncrono, E/S no bloqueante |

Detalle y justificación de cada decisión en [`docs/arquitectura.md`](./docs/arquitectura.md).

---

## 6. Módulos del Sistema

| Módulo | Prioridad | Etapa |
|--------|:---------:|:-----:|
| Autenticación y Usuarios | Alta | 1 |
| Catálogo de Productos y Categorías | Alta | 1 |
| Punto de Venta (POS) | Alta | 1 |
| Gestión Masiva de Precios | Alta | 1 |
| Inventario y Stock | Alta | 1 |
| Impresión de Etiquetas de Góndola | Media | 2 |
| Reportes | Media | 2 |
| Proveedores | Media | 2 |
| Movimientos de Stock | Baja | 2 |

Descripción, funcionalidades y endpoints de cada módulo en [`docs/modulos.md`](./docs/modulos.md).

---

## 7. Modelo de Datos (MongoDB)

Colecciones: `usuarios`, `categorias`, `proveedores`, `productos`, `ventas` (con ítems embebidos), `ajustes_precio`, `historial_precios`, `movimientos_stock` y `contadores`.

El diseño completo (campos, tipos, relaciones, índices y diagramas) está en [`docs/esquema-bd.md`](./docs/esquema-bd.md), y los scripts que lo crean, en [`database/`](./database/).

---

## 8. Alcance de la Primera Etapa
- Autenticación y Usuarios  
- Catálogo de Productos  
- Inventario y Stock  
- Punto de Venta (POS)  
- Gestión Masiva de Precios  

---

## 9. Proyección de Escalabilidad
- 📂 Carga de listas de precios por proveedores (CSV/Excel).  
- 🏬 Multi-sucursal con stock independiente.  
- 💳 Integración con Mercado Pago y facturación electrónica (ARCA, ex AFIP).  
- 📩 Notificaciones automáticas por email.  
- 📱 Versión móvil (PWA).  

---

## ✅ Valor Agregado
El sistema convierte horas de remarcado manual en **menos de 30 segundos**, con integración end-to-end en JavaScript y máxima estabilidad para el negocio.
