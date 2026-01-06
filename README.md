# Proyecto Frontend - Angular 20

Este proyecto es una aplicación frontend desarrollada con Angular 20.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js** (versión 18.19 o superior recomendada)
- **npm** (versión 10 o superior, viene incluido con Node.js)

Puedes verificar las versiones instaladas ejecutando:

```bash
node --version
npm --version
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

### 2. Instalar dependencias

Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las dependencias necesarias:

```bash
npm install
```

Este comando leerá el archivo `package.json` e instalará todos los paquetes requeridos en la carpeta `node_modules`.

## Ejecución del Proyecto

### Modo Desarrollo

Para levantar el servidor de desarrollo, ejecuta:

```bash
npm start
```

O también puedes usar:

```bash
ng serve
```

El proyecto se ejecutará por defecto en `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.

### Opciones adicionales de ejecución

Para ejecutar en un puerto específico:

```bash
ng serve --port 4300
```

Para abrir automáticamente el navegador:

```bash
ng serve --open
```

## Compilación para Producción

Para compilar el proyecto para producción, ejecuta:

```bash
npm run build
```

O directamente:

```bash
ng build
```

Los archivos compilados se generarán en el directorio `dist/`. Estos archivos están optimizados y minificados, listos para ser desplegados en un servidor.

Para compilación con optimización adicional:

```bash
ng build --configuration production
```

## Ejecución de Pruebas

### Pruebas Unitarias

Para ejecutar las pruebas unitarias con Karma:

```bash
npm test
```

### Pruebas End-to-End

Para ejecutar las pruebas e2e:

```bash
npm run e2e
```

## Estructura del Proyecto

```
├── src/
│   ├── app/              # Componentes, servicios y módulos de la aplicación
│   ├── assets/           # Archivos estáticos (imágenes, fuentes, etc.)
│   ├── environments/     # Configuraciones de entorno
│   ├── index.html        # Archivo HTML principal
│   ├── main.ts           # Punto de entrada de la aplicación
│   └── styles.css        # Estilos globales
├── angular.json          # Configuración de Angular CLI
├── package.json          # Dependencias y scripts del proyecto
├── tsconfig.json         # Configuración de TypeScript
└── README.md             # Este archivo
```

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instala todas las dependencias |
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Compila el proyecto para producción |
| `npm test` | Ejecuta las pruebas unitarias |
| `ng generate component <name>` | Genera un nuevo componente |
| `ng generate service <name>` | Genera un nuevo servicio |
| `ng generate module <name>` | Genera un nuevo módulo |

## Solución de Problemas

### Error: "ng: command not found"

Si encuentras este error, instala Angular CLI globalmente:

```bash
npm install -g @angular/cli
```

### Problemas con node_modules

Si experimentas problemas con las dependencias, intenta:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto en uso

Si el puerto 4200 está ocupado, especifica otro puerto:

```bash
ng serve --port 4300
```

## Recursos Adicionales

- [Documentación oficial de Angular](https://angular.dev/)
- [Angular CLI](https://angular.dev/tools/cli)
- [Angular Style Guide](https://angular.dev/style-guide)

## Soporte

Si encuentras algún problema o tienes preguntas, por favor abre un issue en el repositorio.
