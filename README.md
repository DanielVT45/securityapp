# securityModule
En este proyecto de emulo las peticiones http. Se usaron dos objetos: peticion y respuesta.

Este proyecto sirve para gestionar los accesos de la aplicación, mediante la validacion de un token. Dichos tokens autenticara y autorizara a los usuarios que quieran consumir un recurso. El recurso de prueba es una base de datos "dummy" que contiene un catalogo de productos.

![image](https://user-images.githubusercontent.com/51674961/127759019-4e8478e1-108c-4c5a-bb09-9c76546aaa38.png)




# Diagrama de la aplicacion

![image](https://user-images.githubusercontent.com/51674961/127758960-4817413b-0729-444e-94c3-08a5955663d3.png)

### Pre-requisitos 📋

Es necesario tener instalado en la computadora los siguientes programas:
* **nodejs 14.0.0 o superior** [nodejs](https://nodejs.org/)
* **npm 7.19.0 ** [nodejs](https://nodejs.org/)


### Descargas de la aplicacion

Descargarlo con el protocolo seguro: https.
```
https://github.com/DanielVT45/abstractFactory.git
```

Descargarlo con protocolo seguro ssh.
```
git@github.com:DanielVT45/abstractFactory.git
```

### Instalación 🔧
Para instalar esta aplicacion es necesario descargar una copia de proyecto en local o en un servidor.
 
Descarga del programa con https
```
git clone https://github.com/DanielVT45/abstractFactory.git
```

Verificar que se haya descargado la carpeta del proyecto con el comando:

```
ls asbtractFactory
```

Acceder a la carpeta del proyecto. Descargar las dependencias y finalmente correr la aplicacion con los comandos:

```
cd abstractFactory
npm install
node index.js
