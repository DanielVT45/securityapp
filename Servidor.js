/** @interface */
class Servidor {
	procesar(endpoint, handler) {
		throw new Error("Interface");
	}

	hacerPeticion() {
		throw new Error("Interface");
	}

	mandarRespuesta() {
		throw new Error("Interface");
	}
}
