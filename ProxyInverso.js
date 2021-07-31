const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ServidorFondo = require("./ServidorFondo");

const { verifyToken, compararPassword } = require("./utils");

//Base de datos dummy: usuarios
const db = require("./baseDatos");

/*
 * Crear una relacion entre la instancia del servidor y un valor {Servidor1 : "/"}
 * Servidor base: 192.168.1.20:80/
 * Necesito rutas: ["/", "/usuarios", "/productos" ];
 *
 * Necesito determinar un origen y un destino.
 * El origen me va a determinar el destino.
 * */

/*const servidoresdeFondo = {
	servidor1: function (req, res) {},
	servidor2: function (req, res) {},
	servidor2: function (req, res) {},
};*/

/**@implements {Servidor}*/
class ProxyInverso {
	constructor(peticion, respuesta) {
		/*
		 * 1.- Validar Token.
		 * 2.- Validar que las credenciales No esten vacias.
		 * 3.- Buscar el usuario en la base de datos dummy.
		 * 4.- Comparar las credenciales: passwords. Compara el password cifrado con el que el cliente mando en la peticion.
		 * 5.- Si se cumple el happy path, entonces se manda la peticion al servidor de Fondo.
		 *
		 * */
		this.peticion = peticion;
		this.respuesta = respuesta;
		this.servidor = new ServidorFondo();

		return verifyToken(peticion.headers.token)
			.then((payload) => {
				const { email, password } = this.peticion.data;

				//Verifica que la peticion contenga valores:
				if (!(email && password)) {
					return this.mandarRespuesta(
						this.respuesta,
						"Credenciales Vacias",
						403
					);
				}

				//Buscar en la base de datos dummy.
				let usuario = db.buscarUsuario({ email: email });

				//Verifica que la respuesta de la base de datos NO este vacia.
				if (!usuario) {
					return this.mandarRespuesta(
						this.respuesta,
						"No existe el usuario en la base de datos",
						404
					);
				}

				//Comparamos las credenciales de la peticion con la del usuario recuperado de la base de datos.
				return compararPassword(password, usuario.password).then(
					(sonIguales) => {
						//console.log(sonIguales);
						if (sonIguales) {
							//peticion al servidor
							return this.procesar();
						}
              console.log("\n***************************************************************");
              console.log("\tACCESO DENEGADO AL SISTEMA");
              console.log("***************************************************************");

						return this.mandarRespuesta(
							this.respuesta,
							"Credenciales incorrectas",
							403
						);
					}
				);
			})
			.catch((e) => {
				console.log("\n***************************************************************");
				console.log("\tACCESO DENEGADO AL SISTEMA");
				console.log("***************************************************************");

				console.log(e.name);
			});

		//En caso de que se realicen con exit todas las velidaciones se ejecutara este metodo.
	}

	/** Este metodo simulara las peticiones al servidor de fondo.
	 * @param { string } endpoint
	 * @return { JSON }
	 * @override */
	async procesar() {
		//Logica del programa.
		//console.clear();
		console.log("\n***************************************************************");
		console.log("\tACCESO CONCEDIDO AL SISTEMA (HAPPY PATH)");
		console.log("***************************************************************");
		
		console.log("Procesando... el proxy esta realizando la peticion al servidor de fondo!");

		if (this.peticion.url === "http://10.53.67.42:80/") {
			let recursos = await this.hacerPeticion(this.peticion);
			console.log(recursos);
			return this.mandarRespuesta(recursos, "Productos", 200);
		}
		return this.mandarRespuesta(null, "Error en el servidor de Fondo", 404);
	}

	/**
	 * Esta funcion hace peticiones al servidor de fondo.
	 * @param {Obj} pet
	 * @override */
	hacerPeticion(peticion) {
		this.servidor.hacerPeticion(peticion);
		return "";
	}

	/**
	 * Esta funcion responde al cliente que hizo la peticion.
	 *
	 * @override */
	mandarRespuesta(recurso, message, code) {
		const respuesta = {
			code: code || 500,
			message: message || "Error Interno del servidor"
		};

		return respuesta;
	}
}

module.exports = ProxyInverso;
