/** @implements {Servidor}*/
const db = require("./baseDatos");
class ServidorFondo {
	/**
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
	procesar() {
		let registros = this.hacerPeticion(this.peticion);
		console.log(registros);
	}

	/**
	 *
	 * @override*/
	async hacerPeticion(peticion) {
		//console.log(peticion);
		const { recurso } = peticion;
		let productos = await this.recuperarRegistrosBD(recurso);
		console.log(productos);
		return productos;
	}

	/**
	 *
	 * @override*/
	mandarRespuesta() {}

	/**
	 *(simulacion) Consulta la base de datos. y recuperar registros.
	 * */
	recuperarRegistrosBD(recurso) {
		if (recurso === "/productos") {
			//console.log(db["productos"]);
			return db["productos"] || [];
		}

		//default opcion
		return {
			code: 404,
			error: false,
			message: "No existe la tabla en la base de datos",
		};
	}
}

module.exports = ServidorFondo;
