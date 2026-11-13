# Negromate · Frontend

Web de Negromate hecha con **React** y **Vite**. La presentación del proyecto está en el [README principal](../README.md).

## Tecnologías

- React 19 y React Router 7
- Vite 7
- CSS: un archivo por componente y por página, y variables para el modo claro y oscuro
- react-hot-toast para las notificaciones
- ESLint

## Instalación

Necesita la API en marcha (ver el [README del backend](../backend/README.md)).

```bash
npm install
cp .env.example .env    # en Windows: copy .env.example .env
npm run dev
```

La web se abre en <http://localhost:5173>.

### Variables de entorno

| Variable | Para qué sirve | Ejemplo |
| --- | --- | --- |
| `VITE_API_URL` | URL de la API | `http://localhost:3000` |

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Arranca la web en modo desarrollo |
| `npm run build` | Crea la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción en local |
| `npm run lint` | Revisa el código con ESLint |

## Páginas

| Ruta | Página | Acceso |
| --- | --- | --- |
| `/` | Portada | Todos |
| `/graphic-design`, `/custom-clothing`, `/murals` | Galería y paquetes de cada servicio | Todos |
| `/about` | Sobre nosotros | Todos |
| `/contact` | Formulario de contacto | Todos |
| `/profile` | Iniciar sesión y registrarse | Sin sesión |
| `/cart` | Carrito | Con sesión |
| `/orders` | Mis pedidos | Con sesión |
| `/admin` | Panel de administración | Solo admin |

## Estructura

```text
src/
├── components/   Header, Footer, galería, tarjetas, rutas protegidas...
├── context/      Sesión (useAuth), carrito (useCart) y tema (useTheme)
├── css/          Estilos generales, media queries y un CSS por componente y página
├── pages/        Una página por ruta
├── services/     api.js: las peticiones a la API
└── utils/        helpers.js: servicios, estados de los pedidos y formato de fechas y precios
public/           Imágenes e iconos
```

## Despliegue

`vercel.json` hace que todas las rutas carguen la app. Así, al recargar una página que no es la portada, no sale un error 404.
