# Frontend Application Documentation

Esta sección detalla la interfaz de usuario (Frontend) construida con **Angular 17+**. Proporciona una interfaz moderna y reactiva para la gestión de usuarios, conectándose a la API RESTful del Backend.

El proyecto utiliza **SCSS** para estilos avanzados (Glassmorphism), componentes **Standalone** y manejo de estados asíncronos.

## Tabla de Contenidos
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Arquitectura y Tecnologías](#arquitectura-y-tecnologías)
- [Vistas y Ejecución](#vistas-y-ejecución)

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* **Node.js** (v18 o superior).
* **NPM** (Gestor de paquetes incluido con Node).
* **Angular CLI** (Instalado globalmente: `npm install -g @angular/cli`).
* Un IDE recomendado como **VS Code** (con extensiones de Angular).

## Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Prueba-Tecnica-JorgeGonzales/Test-Login
    cd <nombre-de-la-carpeta>
    ```

2.  **Instalar Dependencias:**
    Ejecuta el siguiente comando en la raíz del proyecto para descargar las librerías necesarias (`node_modules`):
    ```bash
    npm install
    ```

3.  **Configurar Conexión API (Opcional):**
    Verifica que la URL del backend esté correcta en tus servicios (por defecto suele ser `http://localhost:8080/api`).
    * Archivo: `src/app/core/services/user.service.ts`

4.  **Ejecutar la aplicación:**
    Levanta el servidor de desarrollo:
    ```bash
    ng serve
    ```
    O si quieres que se abra automáticamente en el navegador:
    ```bash
    ng serve -o
    ```

5.  **Acceso:**
    Abre tu navegador y visita: **[http://localhost:4200](http://localhost:4200)**

## Arquitectura y Tecnologías

El frontend está estructurado siguiendo las mejores prácticas de Angular:

| Característica | Descripción |
| :--- | :--- |
| **Standalone Components** | Arquitectura moderna sin `ngModules`. |
| **Services & DI** | Inyección de dependencias para `AuthService` y `UserService`. |
| **Guards** | Protección de rutas (`AuthGuard`) para evitar acceso no autorizado. |
| **Interceptors** | Manejo de tokens JWT en las peticiones HTTP. |
| **Reactive Forms** | Validaciones robustas en Login, Registro y Modales. |
| **SCSS & Glassmorphism** | Diseño visual moderno con efectos de desenfoque y degradados. |

---

## Vistas y Ejecución

A continuación se detallan las pantallas principales del sistema.

### 1. Pantalla de Bienvenida
Primera pantalla donde el usuario decide si inicia sesión o se registra

<img width="1424" height="802" alt="image" src="https://github.com/user-attachments/assets/f71b2c0c-007d-41c3-b7e6-e2c317fb2c33" />

### 2. Registro de Usuario (Sign Up)
Pantalla pública para registrar nuevos usuarios en el sistema.

<img width="1345" height="920" alt="image" src="https://github.com/user-attachments/assets/1b870c1f-ecdf-4d88-a850-881c23bd59c7" />

> **Detalles:** Validación en tiempo real (longitud de contraseña > 6 caracteres, formato de email). Alerta nativa al completar el registro.

### 3. Inicio de sesión de usuario (Sign In)

<img width="1361" height="883" alt="image" src="https://github.com/user-attachments/assets/ebb77aa0-503d-4ed2-ab97-f95b5a84992b" />

> **Detalles:** Validación en tiempo real de credenciales, si las credenciales son correctas se dirige al dashboard de usuarios.

### 3. Gestión de Usuarios (Dashboard)
Panel principal donde se listan todos los usuarios registrados. Incluye diseño estilo tarjeta flotante y tabla responsive.

<img width="1359" height="703" alt="image" src="https://github.com/user-attachments/assets/401e27f7-7525-4bb6-b9aa-f44dc9aadb67" />


# Backend API Documentation

En esta sección detalla la API RESTful del sistema de gestión de usaurios (Backend). Proporciona servicios para la autenticación y mantenimiento de usuarios

## Tabla de Contenidos
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Documentación de la API](#documentación-de-la-api)
- [Swagger UI](#swagger-ui)

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* **Java JDK 17** o superior.
* **Maven** (o usar el wrapper `mvnw` incluido).
* **MySQL Database** (Asegúrate de que el servicio esté corriendo).
* Un IDE como **IntelliJ IDEA** o **VS Code**.

## Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Prueba-Tecnica-JorgeGonzales/backend
    cd <nombre-de-la-carpeta>
    ```

2.  **Configurar la Base de Datos:**
    Abre el archivo `src/main/resources/application.properties` y configura tus credenciales de MySQL:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:(puerto)/tu_base_de_datos
    spring.datasource.username=tu_usuario
    spring.datasource.password=tu_contraseña
    spring.jpa.hibernate.ddl-auto=update
    ```

3.  **Ejecutar la aplicación:**
    Puedes ejecutar el proyecto usando Maven:
    ```bash
    ./mvnw spring-boot:run
    ```
    O desde tu IDE ejecutando la clase principal `...Application.java`.

## Documentación de la API

A continuación se detallan los endpoints disponibles.

| Método | Endpoint | Descripción | Swagger | Datos de Muestra / Params |
| :--- | :--- | :--- | :---: | :--- |
| **POST** | `/api/auth/login` | Iniciar sesión y obtener token. | http://localhost:8080/swagger-ui/index.html#/auth-controller/login | `username`: "Juan"<br>`password`: "contrasenia" |
| **POST** | `/api/auth/sign-up` | Registrar un nuevo usuario. | http://localhost:8080/swagger-ui/index.html#/auth-controller/signUp | `username`: "Juan"<br>`email`: "Juan@gmail.com"<br>`password`: "contrasenia" |
| **GET** | `/api/users` | Obtener lista de todos los usuarios. | http://localhost:8080/swagger-ui/index.html#/users-controller/getAllUsers | - |
| **POST** | `/api/users` | Crear un usuario (Admin/Internal). | http://localhost:8080/swagger-ui/index.html#/users-controller/createUser | `username`: "Admin"<br>`email`: "admin@mail.com"<br>`password`: "123456" |
| **GET** | `/api/users/{id}` | Obtener un usuario específico por ID. | http://localhost:8080/swagger-ui/index.html#/users-controller/getUserById | `id`: 1 |
| **PUT** | `/api/users/{id}` | Actualizar datos de un usuario. | http://localhost:8080/swagger-ui/index.html#/users-controller/updateUser | `id`: 1<br>`username`: "JuanUpdate"<br>`email`: "juan@mail.com" |
| **DELETE**| `/api/users/{id}` | Eliminar un usuario del sistema. | http://localhost:8080/swagger-ui/index.html#/users-controller/deleteUser | `id`: 1 |

## Swagger UI

Para probar los endpoints de manera interactiva, asegúrate de que la aplicación esté en ejecución y visita:

**[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)**

