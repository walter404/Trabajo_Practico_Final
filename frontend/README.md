# Frontend — Interfaz de usuario (React)

> **Estado:** estructura inicial. Todavía no contiene código: la implementación comienza una vez aprobada la 2.ª entrega (Diseño y Módulos).

## Organización

La interfaz se organiza por **responsabilidades**: las páginas componen vistas completas a partir de componentes reutilizables, y toda la comunicación con la API se concentra en la capa de servicios. De esta forma ningún componente llama directamente al backend.

```
pages → components → hooks / context → services → API REST
```

## Estructura de carpetas

| Carpeta | Responsabilidad |
|---|---|
| `public/` | Archivos estáticos servidos tal cual (favicon, `index.html`). |
| `src/assets/` | Imágenes, íconos y estilos globales. |
| `src/components/` | Componentes reutilizables de la interfaz (buscador de productos, carrito, tabla de productos, etiqueta de góndola). |
| `src/pages/` | Vistas completas asociadas a una ruta: Login, Punto de Venta, Catálogo, Gestión Masiva de Precios, Reportes. |
| `src/services/` | Comunicación con la API REST del backend. Único punto de contacto entre el frontend y el servidor. |
| `src/context/` | Estado global compartido entre pantallas: usuario autenticado y su rol, carrito de la venta en curso. |
| `src/hooks/` | Hooks personalizados que encapsulan lógica reutilizable (por ejemplo, la búsqueda por código de barras). |
| `src/utils/` | Funciones auxiliares (formateo de moneda y fechas, cálculo de vuelto). |
