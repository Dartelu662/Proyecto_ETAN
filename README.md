# Proyecto Portal ETAN

Portal de gestión educativa para la Escuela Técnica de Aviación Nacional (ETAN). Sistema integral de administración de estudiantes, maestros, cursos, vuelos y calificaciones.

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características Principales](#características-principales)
- [Requisitos del Sistema](#requisitos-del-sistema)
- [Instalación](#instalación)
- [Configuración Inicial](#configuración-inicial)
- [Uso del Sistema](#uso-del-sistema)
- [Roles y Permisos](#roles-y-permisos)
- [Guía de Usuario Detallada](#guía-de-usuario-detallada)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnología Utilizada](#tecnología-utilizada)
- [Deployment](#deployment)
- [Solución de Problemas](#solución-de-problemas)

---

## 📖 Descripción del Proyecto

**Proyecto Portal ETAN** es una aplicación web de administración educativa diseñada específicamente para la Escuela Técnica de Aviación Nacional. El sistema proporciona una plataforma centralizada para:

- Gestión de estudiantes y su información académica
- Administración de maestros y asignación de cursos
- Control de horas de vuelo y experiencia práctica
- Calificaciones y evaluaciones académicas
- Información de pagos y estados de cuenta
- Gestión de datos administrativos y escolares
- Control de aeronaves (aviones)

La aplicación está construida con **Angular 19** como frontend y **Firebase** como backend, proporcionando una solución moderna, escalable y segura.

---

## ✨ Características Principales

### Para Estudiantes (Alumnos)
- ✅ Acceso a datos generales y académicos personales
- ✅ Consulta de vuelos realizados y horas acumuladas
- ✅ Visualización de calificaciones obtenidas
- ✅ Gestión de información de pagos
- ✅ Perfil personalizado de usuario

### Para Administradores Académicos (Admin-1)
- ✅ Captura y gestión de información de estudiantes
- ✅ Registros de maestros y profesores
- ✅ Administración de datos administrativos y personal
- ✅ Gestión del inventario de aeronaves
- ✅ Administración de cursos y planes de estudio
- ✅ Información escolar y calendarios
- ✅ Ingreso y gestión de calificaciones

### Para Administradores Operacionales (Admin-2)
- ✅ Registro y control de horas de vuelo
- ✅ Generación de informes escolares
- ✅ Gestión de pagos y estados de cuenta
- ✅ Información general del sistema

### Características Generales
- 🔐 Autenticación segura con JWT
- 🔒 Sistema de roles y permisos
- 📱 Interfaz responsiva y moderna
- 🚀 Rendimiento optimizado con lazy loading
- 📊 Exportación de datos a Excel
- 🔄 Sincronización en tiempo real con Firebase
- 📱 Diseño mobile-friendly

---

## 🖥️ Requisitos del Sistema

### Software Necesario
- **Node.js**: v18.0 o superior
- **npm**: v9.0 o superior (o yarn)
- **Angular CLI**: v19.0 o superior
- **Git**: Para clonar el repositorio

### Requisitos de Navegador
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Cuentas Necesarias
- **Cuenta Firebase** con credenciales de proyecto configuradas
- **Acceso a Firestore Database**
- **Autenticación habilitada en Firebase**

---

## 📦 Instalación

### Paso 1: Clonar el Repositorio

```bash
git clone <URL-del-repositorio>
cd Proyecto_ETAN
```

### Paso 2: Instalar Dependencias

```bash
cd ProyectoPortalEtan
npm install
```

Esto descargará e instalará todas las dependencias necesarias incluyendo:
- Angular y módulos relacionados
- Angular Material para UI
- Firebase SDK
- RxJS para programación reactiva
- Y más...

> **Nota:** La primera instalación puede tardar varios minutos dependiendo de su conexión.

### Paso 3: Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. En la raíz de `ProyectoPortalEtan`, crea un archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

3. Crea también `src/environments/environment.prod.ts` con los mismos datos para producción.

---

## ⚙️ Configuración Inicial

### 1. Estructura de Firestore

Crea las siguientes colecciones en Firestore:

```
usuarios/
├── alumno/
├── maestro/
├── admin/
└── administrativo/

cursos/
├── id_curso
├── nombre
├── descripcion
└── maestro_asignado

vuelos/
├── id_vuelo
├── alumno
├── fecha
├── horas
└── instructor

calificaciones/
├── id_calificacion
├── alumno
├── curso
├── nota
└── fecha

aviones/
├── id_avion
├── modelo
├── matricula
└── estado

pagos/
├── id_pago
├── alumno
├── monto
├── fecha
└── estado
```

### 2. Crear Usuarios de Prueba

En Firebase Authentication, crea usuarios con estos roles:

**Admin-1 (Académico)**
- Email: admin1@etan.com
- Password: (tu contraseña)
- Rol: admin-1

**Admin-2 (Operacional)**
- Email: admin2@etan.com
- Password: (tu contraseña)
- Rol: admin-2

**Alumno (Estudiante)**
- Email: alumno@etan.com
- Password: (tu contraseña)
- Rol: alumno

---

## 🚀 Uso del Sistema

### Desarrollo Local

```bash
# Inicia el servidor de desarrollo
npm start
```

Accede a `http://localhost:4200` en tu navegador.

### Compilar para Producción

```bash
# Build optimizado para producción
npm run build
```

Los archivos compilados se guardarán en `dist/proyecto-portal-etan`

### Servir SSR (Server-Side Rendering)

```bash
npm run serve:ssr:proyecto-portal-etan
```

---

## 👥 Roles y Permisos

### 1. **Alumno (Estudiante)**
| Funcionalidad | Permiso |
|---|---|
| Ver datos generales propios | ✅ |
| Ver vuelos realizados | ✅ |
| Ver calificaciones | ✅ |
| Editar datos personales | ✅ |
| Crear nuevo vuelo | ❌ |
| Modificar calificaciones | ❌ |
| Acceder a admin-1 | ❌ |

### 2. **Admin-1 (Administrador Académico)**
| Funcionalidad | Permiso |
|---|---|
| Capturar estudiantes | ✅ |
| Capturar maestros | ✅ |
| Capturar administrativos | ✅ |
| Gestionar aviones | ✅ |
| Gestionar cursos | ✅ |
| Ingresar calificaciones | ✅ |
| Crear pagos | ❌ |
| Acceso admin-2 | ❌ |

### 3. **Admin-2 (Administrador Operacional)**
| Funcionalidad | Permiso |
|---|---|
| Registrar horas de vuelo | ✅ |
| Ver informes escolares | ✅ |
| Gestionar pagos | ✅ |
| Ver estado de cuentas | ✅ |
| Capturar estudiantes | ❌ |
| Ingresar calificaciones | ❌ |
| Acceso admin-1 | ❌ |

---

## 📚 Guía de Usuario Detallada

### Login y Autenticación

#### Acceso al Sistema

1. **Abre tu navegador** y ve a `http://localhost:4200` (en desarrollo) o la URL de tu sitio en producción
2. **Verás la página de Login** con los campos:
   - Email
   - Contraseña
   - Botones: "Iniciar Sesión" y "¿No tienes cuenta?"

#### Registro de Nuevo Usuario

1. Haz clic en **"¿No tienes cuenta?"** en la página de login
2. Completa el formulario de registro:
   - Nombre completo
   - Email (único)
   - Contraseña (mínimo 6 caracteres)
   - Confirmar contraseña
3. Haz clic en **"Registrarse"**
4. **Verifica tu email** (si es requerido)
5. Serás redirigido a login para iniciar sesión

#### Recuperar Contraseña

> Funcionalidad disponible en futuras versiones

---

### Portal de Estudiante (Alumno)

Después de iniciar sesión como estudiante, accederás al portal con las siguientes secciones:

#### 1. **Datos Generales**

**Ubicación:** Alumno → Datos Generales

**Funciones:**
- Ver información personal actualizada
- Ver matrícula y datos de inscripción
- Editar información de contacto
- Ver historial académico

**Campos visibles:**
- Nombre completo
- Número de cédula
- Email
- Teléfono
- Dirección
- Fecha de nacimiento
- Programa académico
- Semestre actual

#### 2. **Vuelos**

**Ubicación:** Alumno → Vuelos

**Funciones:**
- Ver registro de todos los vuelos realizados
- Detalles de cada vuelo
- Horas acumuladas totales
- Progreso en el programa de vuelo

**Información por vuelo:**
- Fecha del vuelo
- Aeronave utilizada
- Instructor asignado
- Horas de vuelo
- Tipo de vuelo (práctica, evaluación, etc.)
- Observaciones del instructor

#### 3. **Calificaciones**

**Ubicación:** Alumno → Calificaciones

**Funciones:**
- Ver todas las calificaciones por curso
- Visualizar promedios
- Historial de evaluaciones
- Ver comentarios de maestros

**Información:**
- Curso
- Calificación numérica
- Porcentaje
- Estado (Aprobado/No Aprobado)
- Período académico

---

### Portal Admin-1 (Administrador Académico)

#### 1. **Datos Generales**

**Ubicación:** Admin-1 → Datos Generales

Ver información general del sistema y estadísticas:
- Total de estudiantes
- Total de maestros
- Cursos activos
- Información institucional

#### 2. **Captura de Alumnos**

**Ubicación:** Admin-1 → Captura Alumnos

**Funciones:**
- Agregar nuevo estudiante
- Editar información de estudiantes
- Eliminar registros
- Buscar y filtrar estudiantes

**Campos a capturar:**
- Nombre completo
- Cédula de identidad (única)
- Email
- Teléfono
- Dirección
- Fecha de nacimiento
- Programa académico
- Semestre

**Pasos para agregar alumno:**
1. Haz clic en **"Nuevo Alumno"** o **"Agregar +"**
2. Completa todos los campos obligatorios
3. Haz clic en **"Guardar"**
4. Confirma los datos
5. El alumno será creado con una contraseña temporal

#### 3. **Captura de Maestros**

**Ubicación:** Admin-1 → Captura Maestros

**Funciones:**
- Registrar nuevos maestros/instructores
- Editar información de maestros
- Asignar especialidades
- Eliminar registros

**Campos a capturar:**
- Nombre completo
- Cédula de identidad
- Email profesional
- Teléfono
- Especialidad/Materia
- Licencia de instructor (si aplica)
- Estado laboral

#### 4. **Captura de Administrativos**

**Ubicación:** Admin-1 → Captura Administrativos

**Funciones:**
- Registrar personal administrativo
- Asignar departamentos
- Editar roles administrativos

**Campos:**
- Nombre
- Cédula
- Email
- Departamento
- Puesto
- Teléfono

#### 5. **Captura de Aviones**

**Ubicación:** Admin-1 → Captura Aviones

**Funciones:**
- Registrar aeronaves en el sistema
- Editar especificaciones
- Seguimiento de estado de aeronaves
- Mantener lista de inventario

**Campos:**
- Modelo de aeronave
- Matrícula (única)
- Fabricante
- Año de fabricación
- Tipo de motor
- Capacidad de pasajeros
- Estado actual (Operativo, Mantenimiento, Fuera de Servicio)
- Horas totales de vuelo

#### 6. **Captura de Cursos**

**Ubicación:** Admin-1 → Captura Cursos

**Funciones:**
- Crear nuevos cursos
- Editar información del curso
- Asignar maestros a cursos
- Definir horarios

**Campos:**
- Nombre del curso
- Código del curso
- Descripción
- Maestro asignado
- Semestre
- Horario
- Capacidad máxima
- Requisitos previos

#### 7. **Captura Escolar**

**Ubicación:** Admin-1 → Captura Escolar

**Funciones:**
- Gestionar períodos académicos
- Configurar calendario escolar
- Definir fechas importantes

**Información:**
- Período académico (ej: 2024-1)
- Fecha de inicio
- Fecha de fin
- Semanas de clases
- Fechas de evaluación

#### 8. **Calificaciones**

**Ubicación:** Admin-1 → Calificaciones

**Funciones:**
- Ingresar calificaciones de estudiantes
- Editar evaluaciones existentes
- Generar reportes de notas
- Calcular promedios

**Pasos para ingresar calificaciones:**
1. Selecciona el curso
2. Selecciona el período académico
3. Haz clic en el estudiante
4. Ingresa la calificación
5. Agrega observaciones (opcional)
6. Guarda

---

### Portal Admin-2 (Administrador Operacional)

#### 1. **Horas de Vuelo**

**Ubicación:** Admin-2 → Horas de Vuelo

**Funciones:**
- Registrar nuevas horas de vuelo
- Editar registros existentes
- Generar reportes de vuelo
- Controlar horas acumuladas

**Pasos para registrar vuelo:**
1. Haz clic en **"Nuevo Vuelo"**
2. Selecciona el alumno
3. Selecciona la aeronave
4. Ingresa la fecha del vuelo
5. Ingresa las horas de vuelo
6. Selecciona el instructor
7. Agrega observaciones (opcional)
8. Guarda el registro

#### 2. **Informes Escolares**

**Ubicación:** Admin-2 → Informes Escolares

**Funciones:**
- Ver informes académicos consolidados
- Reportes de estudiantes por curso
- Estadísticas de desempeño
- Exportar informes

#### 3. **Pagos**

**Ubicación:** Admin-2 → Pagos

**Funciones:**
- Registrar pagos de estudiantes
- Generar recibos
- Ver estado de cuentas
- Crear reportes de cobranza

**Pasos para registrar pago:**
1. Busca o selecciona el alumno
2. Ingresa el monto pagado
3. Selecciona el concepto (matrícula, vuelo, otro)
4. Ingresa la fecha del pago
5. Selecciona el método de pago
6. Guarda el registro

#### 4. **Datos Generales**

**Ubicación:** Admin-2 → Datos Generales

Ver estadísticas generales del sistema:
- Total de estudiantes activos
- Horas de vuelo totales
- Ingresos totales
- Información de período académico

---

## 📁 Estructura del Proyecto

```
ProyectoPortalEtan/
├── src/
│   ├── app/
│   │   ├── alumno/                    # Portal de estudiantes
│   │   │   ├── datos-generales-alumno/
│   │   │   ├── vuelos-alumno/
│   │   │   ├── calificaciones-alumno/
│   │   │   ├── pagos-alumno/
│   │   │   └── alumno.component.ts
│   │   │
│   │   ├── admin-1/                   # Portal académico
│   │   │   ├── datos-generales-admin-1/
│   │   │   ├── capturas-alumnos-admin-1/
│   │   │   ├── capturas-maestros-admin-1/
│   │   │   ├── capturas-administrativos-admin-1/
│   │   │   ├── capturas-aviones-admin-1/
│   │   │   ├── capturas-cursos-admin-1/
│   │   │   ├── capturas-escolar-admin-1/
│   │   │   ├── calificaciones-maestro/
│   │   │   └── admin-1.component.ts
│   │   │
│   │   ├── admin-2/                   # Portal operacional
│   │   │   ├── datos-generales-admin-2/
│   │   │   ├── horas-vuelo-admin-2/
│   │   │   ├── informes-escolar-admin-2/
│   │   │   ├── pagos-admin-2/
│   │   │   └── admin-2.component.ts
│   │   │
│   │   ├── login/                     # Autenticación
│   │   ├── registro-usuario/
│   │   ├── pagina404/
│   │   │
│   │   ├── guards/                    # Protección de rutas
│   │   │   ├── auth.guard.ts
│   │   │   ├── admin-1.guard.ts
│   │   │   └── admin-2.guard.ts
│   │   │
│   │   ├── services/                  # Servicios y lógica
│   │   │   ├── authentification.service.ts
│   │   │   ├── alumno.service.ts
│   │   │   ├── admin.service.ts
│   │   │   ├── curso.service.ts
│   │   │   ├── aviones.service.ts
│   │   │   ├── hrsvuelo.service.ts
│   │   │   ├── pagos.service.ts
│   │   │   ├── exportexcel.service.ts
│   │   │   └── ... más servicios
│   │   │
│   │   ├── interfaces/                # Modelos de datos
│   │   │   ├── auth.interface.ts
│   │   │   ├── alumno.interface.ts
│   │   │   ├── admin.interface.ts
│   │   │   ├── curso.interface.ts
│   │   │   ├── avion.interface.ts
│   │   │   └── ... más interfaces
│   │   │
│   │   ├── app.routes.ts              # Configuración de rutas
│   │   ├── app.config.ts
│   │   └── app.component.ts
│   │
│   ├── environments/                  # Configuración por ambiente
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   │
│   ├── styles.css                     # Estilos globales
│   └── main.ts
│
├── firebase.json                      # Configuración Firebase
├── firestore.rules                    # Reglas de seguridad
├── firestore.indexes.json
├── angular.json
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🛠️ Tecnología Utilizada

### Frontend
- **Angular 19.1** - Framework web moderno
- **TypeScript 5.7** - Lenguaje tipado
- **RxJS 7.8** - Programación reactiva
- **Angular Material 19** - Componentes UI
- **Angular CDK 19** - Utilidades de componentes

### Backend/Base de Datos
- **Firebase** - Plataforma completa
  - **Firestore** - Base de datos en tiempo real
  - **Firebase Authentication** - Autenticación segura
  - **Firebase Hosting** - Despliegue y hosting
  - **Firebase Storage** - Almacenamiento de archivos

### Utilidades
- **Angular SSR 19** - Server-side rendering
- **Angular Router 19** - Enrutamiento
- **Angular Forms 19** - Manejo de formularios
- **ngx-cookie-service 19** - Gestión de cookies
- **file-saver 2.0** - Exportación de archivos
- **Express 4** - Servidor Node.js (para SSR)

### Herramientas de Desarrollo
- **Node.js** - Runtime de JavaScript
- **npm** - Gestor de paquetes
- **Angular CLI** - Herramientas de línea de comandos
- **Karma** - Test runner
- **Jasmine** - Framework de testing

---

## 📤 Deployment

### Desplegar en Firebase Hosting

#### Prerrequisitos
```bash
# Instala Firebase CLI globalmente
npm install -g firebase-tools

# Inicia sesión en tu cuenta Firebase
firebase login
```

#### Pasos para desplegar

1. **Construye el proyecto:**
```bash
npm run build
```

2. **Inicia Firebase en el directorio del proyecto:**
```bash
firebase init
```

3. **Configura Firebase (selecciona):**
   - ✅ Hosting
   - ✅ Firestore
   - ✅ Storage (si lo necesitas)

4. **Despliega:**
```bash
firebase deploy
```

#### URL de Producción
Una vez desplegado, tu aplicación estará disponible en:
```
https://TU_PROJECT_ID.web.app
```

---

## 🐛 Solución de Problemas

### Problema: "No se encuentra el módulo @angular/fire"

**Solución:**
```bash
npm install @angular/fire
```

### Problema: Error de autenticación Firebase

**Verificar:**
1. Que las credenciales en `environment.ts` sean correctas
2. Que Firebase Authentication esté habilitada
3. Que la dirección del navegador esté en la lista de dominios permitidos

### Problema: Firestore devuelve error de permisos

**Verificar:**
1. Las reglas de seguridad en `firestore.rules`
2. Que el usuario esté autenticado correctamente
3. Que tenga los permisos necesarios en su rol

### Problema: La aplicación carga lentamente

**Soluciones:**
```bash
# Limpiar caché
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Compilar en modo desarrollo
npm start
```

### Problema: Error en el formulario de login

**Verificar:**
1. Que el usuario exista en Firebase Authentication
2. Que la contraseña sea correcta
3. Que el navegador permita cookies
4. Revisar la consola del navegador (F12) para más detalles

### Contacto y Soporte

Para reportar problemas o sugerencias:
- 📧 Email: soporte@etan.edu
- 🐛 Issues: [Crear un issue en el repositorio](link-al-repo)
- 📞 Teléfono: [número de soporte]

---

## 📝 Notas Importantes

- **Seguridad**: Nunca compartas tus credenciales de Firebase
- **Backups**: Realiza backups regulares de tu base de datos
- **Actualizaciones**: Mantén Angular y dependencias actualizados
- **Pruebas**: Prueba en ambiente desarrollo antes de desplegar a producción

---

**Última actualización:** Febrero 2026  
**Versión:** 1.0.0  
**Mantenedor:** Equipo ETAN
