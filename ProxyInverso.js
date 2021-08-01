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
 * El la ip de destino ba a determinar me va a determinar el servidor de fondo.
 * */

/*const servidoresdeFondo = {
	servidor1: function (req, res) {},
	servidor2: function (req, res) {},
	servidor2: function (req, res) {},
};*/

/**@implements {Servidor}*/
class ProxyInverso {
	/**
	 *Representa un objeto de tipo Proxy Inverso.
	 * @constructor
	 * @param {peticion} objecto Representa el objeto de peticion.
	 * @param {respuesta} objecto Reresenta el objeto de respuesta
	 * */
	constructor(peticion, respuesta) {
		this.peticion = peticion;
		this.respuesta = respuesta;

		this.ipServidorProxy = "110.54.23.45";
		this.ipCliente = peticion.network.ipOrigen;
		this.network = {
			ipOrigen: this.peticion.ipOrigen,
			ipCliente: this.peticion.ipOrigen,
		};
	}

	/**
	 * Este metodo simulara las peticiones al servidor de fondo.
	 * Esta funcion procesa la logina necesaria para validar los acceso de los usuario.
	 * @param { objecto } peticion
	 * @param { objecto } respuesta
	 * @return { JSON object } peticion
	 * @override */
	async procesar(peticion, respuesta) {
		console.log("\nProcesando peticion en el proxy inverso...\n");
		return verifyToken(this.peticion.headers.token)
			.then(async (payload) => {
				if (!this.peticion.data) {
					console.log("primer filtro");
					await this.crearRespuesta({
						codigo: 403,
						error: true,
						mensaje: "Faltan credenciales",
						ipOrigen: this.ipServidorProxy,
						body: [],
					});
					return this.mandarRespuesta();
				}

				const { email, password } = this.peticion.data;
				//Verifica que la peticion contenga valores esperados: email y password
				if (password === "" || email === "") {
					console.log("segundo filtro");
					await this.crearRespuesta({
						codigo: 403,
						error: true,
						mensaje: "Faltan credenciales",
						ipOrigen: this.ipServidor,
						body: [],
					});
					return this.mandarRespuesta();
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
					async (sonIguales) => {
						//console.log(sonIguales);
						if (sonIguales) {
							console.log(
								"\n***************************************************************"
							);
							console.log("\t\tACCESO CONCEDIDO AL SISTEMA");
							console.log(
								"***************************************************************"
							);
							//Mandar peticion al servidor de fondo
							this.hacerPeticion(this.peticion);
							await this.crearRespuesta({
								codigo: 201,
								error: true,
								mensaje: "Autenticacion exitosa!",
								ipOrigen: this.ipServidor,
								body: [],
							});
							return this.mandarRespuesta();
						}

						await this.crearRespuesta({
							codigo: 403,
							error: true,
							mensaje: "Las credenciales NO coinciden",
							ipOrigen: this.ipServidor,
							body: [],
						});

						console.log(
							"\n***************************************************************"
						);
					  console.log("\t\tACCESO DENEGADO AL SISTEMA.");
						console.log(
							"***************************************************************"
						);

						return this.mandarRespuesta();
					}
				);
			})
			.catch(async (e) => {
				console.log(
					"\n***************************************************************"
				);
				console.log("\t\tACCESO DENEGADO AL SISTEMA");
				console.log(
					"***************************************************************"
				);
				await this.crearRespuesta({
					codigo: 403,
					error: true,
					mensaje: e.message,
					ipOrigen: this.ipServidorProxy,
					body: [],
				});
				return this.mandarRespuesta();
			});
	}

	/**
	 * Esta funcion hace peticiones al servidor de fondo.
	 * @param {Obj} peticion: Representa la peticion hecha por el usuario.
	 * @override */
	async hacerPeticion(peticion) {
		//crear una instancia del servidor de fondo.
		console.log("\nRealizando peticion... al servidor de fondo...\n");
		let servidorFondo = new ServidorFondo(this.peticion, this.respuesta);
		servidorFondo.procesar();
	}

	/** Devuelve un objeto de tipo peticion para responder al cliente.
	 * @param {void}
	 * @return {objecto}
	 * */
	mandarRespuesta() {
		return {
			peticion: this.peticion,
			respuesta: this.respuesta,
		};
	}

	/**
	 * Esta funcion responde al cliente que hizo la peticion.
	 * @param {number} code Es el codigo retornado por el servidor,
	 * @param {boolean} error Es el error del servidor,
	 * @param {string} message Es un mensaje adicional que sirve para informar al cliente.,
	 * @param { object} recurso Representa los datos recuperados del servidor.
	 * @override */
	crearRespuesta(datos) {
		const { codigo, error, mensaje, ipOrigen, body } = datos;
		(this.respuesta.codigo = codigo || 200),
			(this.respuesta.error = error || false),
			(this.respuesta.mensaje = mensaje || "peticion exita"),
			(this.respuesta.ipOrigen = ipOrigen || this.ipServidorProxy),
			(this.respuesta.ipCliente = this.ipCliente),
			(this.respuesta.body = body || []);
	}
}

module.exports = ProxyInverso;
