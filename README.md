# SecurityModule
En este proyecto se busco emular peticiones http a un proxy inverso. Se usaron dos objetos: peticion y respuesta.

Este proyecto sirve para gestionar accesos, mediante la validacion de un token. Dichos tokens autenticara y autorizara a los usuarios que quieran consumir recursos del servidor. El recurso de prueba es una base de datos "dummy" que contiene un catalogo de productos.

El proxy inverso tiene la responsabilidad de validar el token de acceso, buscar al usuario en la base de datos, con la informacion proporionada en el payload de token y finalmente comparar las credenciales de acceso del payload con las persistidas en la base de datos dummy.

Finalmente si se cumplen estos requisitos el proxy permite el consumo del servidor de Fondo. para recuperar un catalogo de productos "funkos". Envuelve el recurso en un objeto respuesta y se lo manda al cliente con un estado http.

![image](https://user-images.githubusercontent.com/51674961/127759232-aa2da088-6bcc-48af-b62b-e5c066cfbfc2.png)


# Diagrama de la aplicacion

![image](https://user-images.githubusercontent.com/51674961/127758960-4817413b-0729-444e-94c3-08a5955663d3.png)

### Pre-requisitos 📋

Es necesario tener instalado en la computadora los siguientes programas:
* **nodejs 14.0.0 o superior** [nodejs](https://nodejs.org/)
* **npm 7.19.0** [nodejs](https://npmjs.com/)


### Descargas de la aplicacion

Descargarlo con el protocolo seguro: https.
```
https://github.com/DanielVT45/securityapp.git
```

Descargarlo con protocolo seguro ssh.
```
git@github.com:DanielVT45/securityapp.git
```

### Instalación 🔧
Para instalar esta aplicacion es necesario descargar una copia de proyecto en local o en un servidor.
 
Descarga del programa con https
```
git clone https://github.com/DanielVT45/securityapp.git
```

Verificar que se haya descargado la carpeta del proyecto con el comando:

```
ls securityApp
```

Acceder a la carpeta del proyecto. Descargar las dependencias y correr la aplicacion con los comandos:

```
cd securityApp
npm install
node index.js
