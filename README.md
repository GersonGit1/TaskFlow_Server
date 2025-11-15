# 🧩 Task Flow Backend

Backend de **Task Flow**, una plataforma moderna para la **gestión de proyectos, tareas y colaboradores**, construida con **Node.js**, **Express** y **MongoDB** siguiendo buenas prácticas de arquitectura, seguridad y mantenibilidad.

---

## 🚀 Características principales

- 🔐 **Autenticación y autorización con JWT**
- 👥 **Gestión completa de usuarios**
- 📁 **CRUD de proyectos, tareas y gestión de colaboradores**
- 📬 **Confirmación de cuenta vía correo electrónico**
- 🚧 **Middlewares personalizados**
- 🛡️ **Seguridad mejorada con Helmet, CORS configurado y rate limit**
- 📊 **Endpoints organizados y con control de acceso**
- 🪝 **Integración estable con el frontend vía REST API**

---

## 🛠️ Tecnologías utilizadas

| Categoría | Tecnologías |
|-----------|-------------|
| **Servidor** | Node.js + Express |
| **Base de datos** | MongoDB + Mongoose |
| **Autenticación** | JSON Web Tokens (JWT) |
| **Validación** | express-validator |
| **Email** | nodemailer |
| **Seguridad** | Helmet, Rate Limit, CORS |
| **Arquitectura** | Controladores + Middlewares |
| **Variables de entorno** | dotenv |

---

## ⚙️ Instalación y configuración

1. **Clona el repositorio**
   git clone https://github.com/GersonGit1/TaskFlow_Server.git
2. **Instala dependencias**
   npm install
3. **Configura las variables de entorno**
   Crea un archivo .env en la raíz del proyecto con el contenido:
    DATABASE_URL=mongodb://localhost:27017/task_flow o la url de tu base de datos MongoDB
    FRONTEND_URL=http://localhost:5173 o la url que le hayas asignado al frontend
    SMTP_HOST=Tu_Host
    SMTP_PORT=Tu_port
    SMTP_USER=Tu_usuario
    SMTP_PASS=Tu_password
    JWT_SECRET=Tu_secret

4. **Ejecuta la app en entorno de desarrollo**
   npm run dev
5. **Abre la app en el navegador**
   abre tu navegador en http://localhost:5173

src/
│
├── config/            # Configuración de DB, CORS y nodemailer.
├── controllers/       # Lógica de cada endpoint
├── emails/            # Funciones de envío de emails
├── middleware/        # Middlewares de seguridad y validación
├── models/            # Modelos de Mongoose
├── routes/            # Rutas organizadas por entidad
├── utils/             # funciones relacionadas con la autenticación
└── index.js           # Entry point

## Flujo de autenticación

1. Registro

2. Envío de email con token

3. Confirmación de cuenta

4. Login para obtener JWT

5. Acceso a rutas protegidas

🧑‍💻 Autor

Gerson Amaya
Desarrollador Full Stack — apasionado por crear herramientas útiles, escalables y seguras.

📧 Contacto: amayagerson235@gmail.com