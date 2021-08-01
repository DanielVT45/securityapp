/** @implements {Servidor}*/
const db = require("./baseDatos");
class ServidorFondo {
	/**
	 * Representa un servidor de fondo (En el backend).
	 * @constructor
	 * @param { string } origen: Representa la ip de origen de la cual se hizo la peticion.
	 * @param { string } destino: Representa la ip de destino a la cual el servidor respondera.
	 * @return { Object } json Regresara un objecto json con el resultado de la peticion.
	 * */
	constructor(peticion, respuesta) {
		this.peticion = peticion;
		this.respuesta = respuesta;
	}

	//Logica de la aplicacion y metodo principal.
	/**
	 *
	 *
	 * @override */
	async procesar() {
		console.log("Procesando... el servidor de fondo esta procesando...");
		await this.hacerPeticion();
		this.mandarRespuesta()
	}

	/**
	 * @param {object} peticion: Representa un objecto de tipo peticion.
	 * @override*/
	async hacerPeticion() {
		//console.log(peticion);
		if (this.peticion.metodo === "GET" && this.peticion.recurso === "/productos") {
			console.log("Conectando con la base de datos...");
			let productos = await this.recuperarRegistrosBD(this.peticion.recurso);
			//console.log(productos);
			this.respuesta.recurso === this.peticion.recurso;
			this.respuesta.body = productos;
    }
	}

	/**
	 *
	 * @override*/
	mandarRespuesta() {
		console.log("\nRespuesta del servidor de fondo:\n");
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
			(this.respuesta.ipOrigen = ipOrigen || this.ipServer),
			(this.respuesta.body = body || []);
	}

	/**
	 *(simulacion) Consulta la base de datos. y recuperar registros.
	 * */
	recuperarRegistrosBD(recurso) {
		if (recurso === "/productos") {
			//console.log(db["productos"]);
			return db["productos"] || [];
		}

		//default opcion
		this.mandarRespuesta({
			code: 404,
			error: false,
			message: "No existe la tabla en la base de datos",
		});
	}
}

module.exports = ServidorFondo;
