const bcrypt = require("bcrypt");
const defaultRoundSalt = 10;
const jwt = require("jsonwebtoken");

//Carga variables de entorno en el sistema.
require("dotenv").config();
const SECRET = "secret";
//Importamos la clave secreta de las variables de entorno.
//const SECRET = process.env.SECRET;

module.exports = {
	async encriptar(password, saltRound) {
		if (saltRound) {
			return await bcrypt.hash(password, saltRound);
		}
		return await bcrypt.hash(password, defaultRoundSalt);
	},
	compararPassword(passwordPlano, passwordEncriptado) {
		console.log("Comparando passwords...");
		return bcrypt
			.compare(passwordPlano, passwordEncriptado)
			.then((sonIguales) => sonIguales)
			.catch((e) => console.log(e));
	},

	async firmarToken(payload) {
		return await jwt.sign(payload, SECRET, { expiresIn: "365 days" });
	},

	/**
	 * Verifica si el token es valido mediante la firma.
	 * @param {string} token
	 * @return { object } Devuelve la informacion del usuario decodificada.
	 * */
	async verifyToken(token) {
		console.log(
			"Verificando la autenticidad del token, mediante la libreria jsonwebtoken..."
		);
		try {
			return await jwt.verify(token, SECRET);
		} catch (e) {
			if (e) {
				if (e.name === "JsonWebTokenError") {
					throw new Error("El token proporcionado NO es invalido");
				}
				if (e.name === "TokenExpiredError") {
					throw new Error("El token proporcionado ha caducado!");
				}
			}
		}
	},
	//Funcion para simular el procesamiento (Agrega tiempo de espera).
	setTimeOut() {},
};
