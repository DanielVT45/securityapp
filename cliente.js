module.exports = {
	peticion: {
		url: "http://10.53.67.42:80/",
		metodo: "GET",
		recurso: "/productos",
		//origen: "http://16.74.34.67/",
		//destino: null,
		headers: {
			"Content-Type": "application/json",
			token: null,
		},
		data: {
			email: "daniel@example.site",
			password: "qwerty",
		},
	},

	respuesta: {
		code: null,
		error: null,
		source: null,
		body: null,
	},

	hacerPeticion: async function (token) {
		//Import proxy:
		const ProxyInverso = require("./ProxyInverso.js");

		//Agregamos el token en la peticion.
		this.peticion.headers.token = token;

		//Interactuamos con el servidor a traves del proxy.
		let client = new ProxyInverso(this.peticion, this.respuesta);
		console.log(await client);

		


		/*******************************************************************
		 *               Peticion alterando el token
		 *******************************************************************/

		//Alterarmos el token
		this.peticion.headers.token += "d";

		let client2 = new ProxyInverso(this.peticion, this.respuesta);
		console.log(await client2);

		


		/*******************************************************************
		 *               Peticion alterando la contrasena
		 *******************************************************************/
    //Reestablecemos el token original
    this.peticion.headers.token = token;
		//Alteramos la contrasena
		this.peticion.data.password = "dd";

		let client3 = new ProxyInverso(this.peticion, this.respuesta);
		console.log(await client3);
	},
};
