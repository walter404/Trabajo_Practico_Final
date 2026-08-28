# Trabajo_Practico_Final

Sistema de gestión de ventas y control de stock de productos para pequeños comercios, desarrollado como Trabajo Práctico Final de la Tecnicatura Universitaria en Programaciona Distancia.

## Grupo

Grupo 100

## Integrantes

- Walter Verdún
- Ignacio Salazar 
- Martin Gomez

## Problematica identificada

Los comercios minoristas que revenden productos terceros (almacenes, kiosco, ferreteria, etc.) suelen actualizar precios y stock de forma manual, tipeando producto por producto cada vez que cambia una lista de precios de un proveedor. Esto genera:

- Perdida de tiempo administrativo en cada actualizacion de precios.
- Errores de carga (precios mal tipeados, productos duplicados).
- Ventas realizadas con precios desactualizados mientras dura la carga manual.

## Solución propuesta

Una aplicacion web que centraliza la gestion del comercio en dos módulos principales:

- **Ventas**: registro rápido de ventas mediante búsqueda de productos por código, cálculo automatico del total y resumen de la operación.
- **Edición**: catálogo de productos (código, nombre, categoría, proveedor, precio, stock) con alta, baja y modificacion centralizada, evitando la dispersión de la información en planillas o agendas.

El sistema cuenta con autenticación de usuarios para proteger el acceso, y está diseñado con una arquitectura (por ejemplo, control de caja ocarga automatica de precios) sin reestructurar el proyecto.

## Stack tecnológico

Proyecto desarrollado con el stack **MERN**:

- **MongoDB** — base de datos de productos, ventas y usuarios.
- **Express** — API REST (rutas, controladores y middleware de autenticación).
- **React** — interfaz de usuario (pantallas de Ventas y Edición).
- **Node.js** — entorno de ejecución del servidor.

Autenticación mediante **JWT** (JSON Web Tokens) y contraseñas encriptadas con **bcrypt**.

## Estructura del proyecto

```
proyecto-tpf/
├── client/     # Frontend en React
└── server/     # Backend en Node + Express
```

## Materia

Trabajo Práctico Final — Tecnicatura Universitaria en Programación a Distancia.