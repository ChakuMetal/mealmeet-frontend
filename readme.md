# MealMeet - Frontend

Frontend React para MealMeet — App de recetas con swipe  
Repositorio: ChakuMetal/mealmeet-frontend

---

## Resumen / Objetivo

MealMeet es una aplicación para descubrir y guardar recetas mediante una interfaz de "swipe" (similar a apps de descubrimiento). Este repositorio contiene la parte frontend desarrollada con React. El objetivo del proyecto final de máster fue diseñar, implementar y evaluar una interfaz usable y performant para exploración rápida de recetas, y demostrar integración con backend, autenticación y persistencia de datos.

## Demo

- Live demo: (enlace a desplegado)
- Video demo: (enlace a video/GDrive/YouTube)
- Capturas:
  - /docs/screenshots/home.png
  - /docs/screenshots/swipe.png

## Tecnologías

- React (vXX)
- Vite / Create React App (indicar cuál usaste)
- CSS / SASS (estructura de estilos)
- Librerías: react-router, axios/fetch, redux/zustand (si corresponde), librería de swipe (p. ej. react-swipeable)
- Testing: Jest, React Testing Library
- Build & Deploy: Netlify / Vercel / GitHub Pages (indicar)

## Estado del proyecto

- Versión: 1.0.0
- Estado: Final / En desarrollo / Prototipo (elige)
- Última actualización: YYYY-MM-DD

## Estructura del repositorio (resumen)

- src/ — código fuente
  - components/ — componentes reutilizables
  - pages/ — vistas principales
  - hooks/ — hooks personalizados
  - services/ — llamadas a API
  - styles/ — hojas CSS / SASS
- public/ — activos estáticos
- docs/ — documentación, capturas, diagramas
- tests/ — pruebas unitarias / integración

## Requisitos previos

- Node.js >= 16
- npm >= 8 o yarn
- (Si hace falta) Cuenta en el backend o credenciales de API

## Instalación y ejecución local

1. Clona el repositorio
   git clone https://github.com/ChakuMetal/mealmeet-frontend.git
2. Instala dependencias
   npm install
3. Crea archivo de variables de entorno
   cp .env.example .env
   (revisar y ajustar las variables)
4. Ejecuta en modo desarrollo
   npm run dev
   o
   npm start
5. Build para producción
   npm run build

## Variables de entorno (.env.example)

Crea `.env` basado en este ejemplo:

```
VITE_API_URL=https://api.tudominio.com
REACT_APP_API_URL=https://api.tudominio.com
VITE_SOME_KEY=valor_ejemplo
```

(Adapta según tu configuración y el prefijo que use tu bundler: VITE* o REACT_APP*)

## Scripts útiles

- npm run dev / start — ejecutar en desarrollo
- npm run build — construir para producción
- npm test — ejecutar tests
- npm run lint — ejecutar linter
- npm run format — formatear código

## Cómo evaluar (para tribunal / profesor)

Incluye en el README instrucciones claras sobre qué revisar:

- Pasos para levantar la app localmente (arriba).
- Pruebas automatizadas: cómo ejecutarlas y qué cobertura hay.
- Criterios de evaluación recomendados: usabilidad (pruebas con usuarios), rendimiento (Lighthouse), accesibilidad (axe/Lighthouse), integridad del API, documentación.
- Carpeta docs/ con: informe técnico, diagramas (arquitectura, componentes), plan de pruebas y resultados.

## Arquitectura y decisiones de diseño

Explica brevemente:

- Por qué React y librerías escogidas.
- Patrón de estado (ej. Redux vs Context vs hooks).
- Organización de componentes (atomic design, feature-sliced, etc.).
- Consideraciones de accesibilidad y responsive.

## Pruebas y métricas

- Cobertura de tests: X% (indicar)
- Tests disponibles: unitarios, integración, E2E (cypress/playwright)
- Comandos para ejecutar: `npm test`, `npx cypress open`

## Accesibilidad y rendimiento

- Herramientas usadas: Lighthouse, axe, Chrome DevTools
- Principales optimizaciones: lazy-loading, code-splitting, imágenes optimizadas, minificación CSS/JS

## Despliegue / CI

- Configuración CI: GitHub Actions (archivo: .github/workflows/ci.yml)
- Deploy: Vercel / Netlify (link + instrucciones de variables)
- Badges (añadir en la parte superior si ya tienes): build, tests, coverage, etc.

## Limitaciones conocidas

- Lista breve de issues o features no implementadas.
- Bugs conocidos y cómo reproducirlos.

## Roadmap / Trabajo futuro

- Mejoras UX
- Soporte offline / PWA
- Personalización de recomendaciones
- Tests E2E adicionales

## Agradecimientos y referencias

- Bibliografía? papers o recursos usados para la parte académica.
- Créditos: supervisor, compañeros, fuentes de datos (APIs).

## Licencia

Indica la licencia (ej. MIT). Añade archivo LICENSE en el repo.

## Autor / Contacto

- Nombre: Tu Nombre
- Email: tu.email@dominio.com
- GitHub: https://github.com/ChakuMetal
- Tutor académico: Nombre del tutor (opcional)

---

### Checklist para entrega de proyecto de máster (recomendado)

- [ ] README completo + video demo
- [ ] Informe técnico / memoria en docs/ o repo separado
- [ ] Instrucciones reproducibles para ejecutar todo
- [ ] Script de seed (si hay base de datos o datos de ejemplo)
- [ ] Tests automatizados y resultados
- [ ] Licencia y créditos
- [ ] PRs y commits con mensajes claros (historial)
