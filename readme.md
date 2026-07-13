<div align="center">

# 🍽️ MealMeet — Frontend

**Aplicación de recetas con experiencia swipe para descubrimiento rápido y guardado de favoritas**

[![Vercel](https://img.shields.io/badge/frontend-vercel-black?logo=vercel)](https://mealmeet-frontend.vercel.app)
[![Render](https://img.shields.io/badge/backend-render-46e3b7?logo=render)](https://mealmeet-backend.onrender.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](#stack-técnico)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](#stack-técnico)
[![License](https://img.shields.io/badge/license-portfolio-lightgrey)](#licencia)

[Demo en producción](https://mealmeet-frontend.vercel.app) · [API backend](https://mealmeet-backend.onrender.com) · [Repositorio](https://github.com/ChakuMetal/mealmeet-frontend)

</div>

---

## 📖 Resumen

MealMeet combina una experiencia clásica de exploración de recetas con una **experiencia swipe** para decidir de forma ágil entre ❤️ _Me gusta_ o ⏭️ _Saltar_.

El frontend incluye:

- 🔐 Autenticación completa (login, sesión expirada, forgot password, reset password)
- 🛡️ Rutas públicas y privadas con protección
- 📋 Listado y detalle de recetas
- 👤 Gestión de recetas del usuario
- 👆 Swipe privado con animaciones y gestos
- 🎬 Demo swipe pública en Home para usuarios no registrados

---

## 🛠️ Stack técnico

| Tecnología         | Uso                             |
| ------------------ | ------------------------------- |
| React 19           | Librería principal de UI        |
| Vite 8             | Bundler y entorno de desarrollo |
| React Router Dom 7 | Enrutado público/privado        |
| Axios              | Cliente HTTP                    |
| CSS custom         | Estilos                         |
| ESLint             | Linting                         |

---

## ✨ Funcionalidades principales

<details>
<summary><strong>🎬 Home con demo swipe para visitante</strong></summary>

- Guía visual de uso: derecha → Me gusta, izquierda → Saltar
- Flujo de conversión a registro

</details>

<details>
<summary><strong>🔐 Autenticación</strong></summary>

- Login
- Registro
- Forgot password
- Reset password por token
- Manejo de sesión expirada

</details>

<details>
<summary><strong>📋 Recetas</strong></summary>

- Listado protegido
- Detalle público por id
- CRUD de recetas del usuario

</details>

<details>
<summary><strong>👆 Swipe privado</strong></summary>

- Botones y teclado
- Arrastre con ratón/dedo
- Feedback visual por dirección
- Persistencia de "Me gusta" en backend

</details>

---

## 📁 Estructura del proyecto

```
src/
├── assets/
├── components/
├── context/
├── hooks/
├── pages/
├── router/
├── services/
├── utils/
├── App.css
└── main.jsx
```

---

## ⚙️ Variables de entorno

Crea un archivo `.env.local` en la raíz del frontend:

```env
VITE_API_URL=https://mealmeet-backend.onrender.com
```

Para desarrollo local:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/ChakuMetal/mealmeet-frontend.git

# 2. Instalar dependencias
npm install

# 3. Crear .env.local con VITE_API_URL (ver sección anterior)

# 4. Levantar entorno de desarrollo
npm run dev
```

Abre 👉 [http://localhost:5173](http://localhost:5173)

---

## 📜 Scripts disponibles

| Comando           | Descripción                |
| ----------------- | -------------------------- |
| `npm run dev`     | Entorno de desarrollo      |
| `npm run build`   | Build de producción        |
| `npm run preview` | Previsualización del build |
| `npm run lint`    | Linting del proyecto       |

---

## 🗺️ Rutas clave

**Públicas**

```
/
/login
/register
/forgot-password
/reset-password/:token
/recipes/:id
/demo-swipe
```

**Privadas**

```
/recipes
/my-recipes
/create-recipe
/edit-recipe/:id
/swipe-recipes
```

---

## ☁️ Deploy

**Frontend**

- Plataforma: Vercel
- Configuración SPA: `vercel.json` con rewrite a `index.html`

**Backend**

- Plataforma: Render

---

## 📌 Estado del proyecto

**Versión actual**

> MVP funcional + demo swipe pública + swipe privado avanzado

**Pendiente**

- [ ] Motivos de descarte con chips rápidos
- [ ] Animación de reacción en botón "Me gusta"
- [ ] Mejora de analítica de conversión desde demo a registro

---

## 👤 Autor

**GitHub:** [@ChakuMetal](https://github.com/ChakuMetal)

## 📄 Licencia

Uso académico y portfolio personal.
