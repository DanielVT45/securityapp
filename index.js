const { encriptar, firmarToken } = require("./utils");
const cliente = require("./cliente");

//Create registe

(async () => {
	let password = "qwerty";
	let payload = {
		id: 1,
		name: "Daniel",
		email: "daniel@example.site",
		password: "$2b$10$0P9J.ysGMGRw/JY5/i3aa.Ay6Bo/NSY8JsrOzgT2wpzYRXiw5cdh2",
	};

	try {
		//let passwordEncriptado = await encriptar(password, 10);
		let token = await firmarToken(payload);
		
		await cliente.hacerPeticion(token);
	} catch (e) {
		console.log(e);
	}
})();
