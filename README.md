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

