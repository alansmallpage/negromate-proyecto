# Negromate · Backend

API REST de la web de Negromate, hecha con **Node.js**, **Express** y **MongoDB**. La presentación del proyecto está en el [README principal](../README.md).

## Tecnologías

- Node.js y Express 5
- MongoDB Atlas con Mongoose 8
- JWT (`jsonwebtoken`) y bcrypt para el inicio de sesión
- cors y dotenv
- nodemon y ESLint para el desarrollo

## Instalación

```bash
npm install
cp .env.example .env    # en Windows: copy .env.example .env
# Rellena el .env (ver la tabla de abajo)
npm run create-admin    # crea el usuario admin@negromate.com
npm run dev
```

La API queda en <http://localhost:3000>. La primera vez que arranca con la base de datos vacía, carga los paquetes y las galerías de ejemplo de `db/data.mock.js`.

### Variables de entorno

| Variable | Para qué sirve |
| --- | --- |
| `PORT` | Puerto del servidor (por defecto `3000`) |
| `DB_USER`, `DB_PASS` | Usuario y contraseña de MongoDB Atlas |
| `CLUSTER` | Dirección del clúster, por ejemplo `cluster0.xxxxx.mongodb.net` |
| `DATABASE` | Nombre de la base de datos |
| `JWT_SECRET` | Clave para firmar los tokens (larga y aleatoria) |
| `ADMIN_PASSWORD` | Contraseña del administrador que crea `npm run create-admin` |

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Arranca la API y la reinicia al guardar cambios |
| `npm start` | Arranca la API |
| `npm run lint` | Revisa el código con ESLint |
| `npm run create-admin` | Crea el usuario administrador |

## Base de datos

| Colección | Qué guarda |
| --- | --- |
| `users` | Usuarios, con la contraseña cifrada y su rol (`user` o `admin`) |
| `products` | Paquetes de cada servicio con su precio |
| `galleryitems` | Trabajos de las galerías |
| `orders` | Pedidos: packs, total y estado |
| `messages` | Mensajes del formulario de contacto |

## Rutas de la API

Todas empiezan por `/api` y responden con el mismo formato:

```json
{ "msg": "Mensaje para el usuario", "data": {}, "status": "ok" }
```

En las rutas con sesión hay que enviar el token en la cabecera `Authorization: Bearer <token>`.

### Autenticación

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| POST | `/auth/register` | Público | Crea una cuenta y devuelve el token |
| POST | `/auth/login` | Público | Inicia sesión y devuelve el token |
| GET | `/auth/profile` | Usuario | Datos del usuario |

### Paquetes y galerías

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| GET | `/products` | Público | Todos los paquetes (admite `?category=Murals`) |
| GET | `/products/category/:category` | Público | Paquetes y galería de un servicio (`GraphicDesign`, `CustomClothing` o `Murals`) |
| GET | `/products/:id` | Público | Un paquete |
| POST, PUT, DELETE | `/products`, `/products/:id` | Admin | Crear, editar y eliminar paquetes |

### Pedidos

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| POST | `/orders` | Usuario | Crea un pedido (el total se calcula en el servidor) |
| GET | `/orders/myorders` | Usuario | Pedidos del usuario |
| GET | `/orders/:id` | Usuario | Un pedido (solo el suyo; el admin, cualquiera) |
| GET | `/orders` | Admin | Todos los pedidos |
| PUT | `/orders/:id` | Admin | Cambia el estado: `pending`, `completed` o `cancelled` |
| DELETE | `/orders/:id` | Admin | Elimina un pedido |

### Mensajes y usuarios

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| POST | `/messages` | Público | Envía un mensaje de contacto |
| GET | `/messages` | Admin | Mensajes recibidos |
| DELETE | `/messages/:id` | Admin | Elimina un mensaje |
| GET | `/users`, `/users/:id` | Admin | Usuarios |
| PUT | `/users/:id` | Usuario | Edita sus datos (el admin, los de cualquiera) |
| DELETE | `/users/:id` | Admin | Elimina un usuario |

## Seguridad

- Las contraseñas se guardan cifradas con bcrypt.
- Inicio de sesión con tokens JWT y dos roles: usuario y admin.
- El precio de los pedidos se calcula en el servidor.
- Las claves van en el `.env`, que no se sube a git.

## Estructura

```text
config/        Variables de entorno
controllers/   Lógica de cada parte: autenticación, usuarios, paquetes, pedidos y mensajes
db/            Conexión a MongoDB, modelos de Mongoose y datos de ejemplo
middlewares/   Autenticación, roles y errores
routes/        Rutas de la API
scripts/       Crear el administrador y cifrar una contraseña con bcrypt
index.js       Arranque del servidor
TESTS.REST     Peticiones de prueba
```

## Probar la API

`TESTS.REST` tiene peticiones de ejemplo para todas las rutas. Se usan con la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) de VS Code: cada petición tiene un enlace "Send Request" encima. Primero inicia sesión y copia el token en las variables de arriba (`@jwt_token` para el admin y `@user_token` para un usuario).
