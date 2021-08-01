const { encriptar, firmarToken } = require("./utils");
const cliente = require("./cliente");

//Create registe

(async () => {
	let password = "qwerty";
	let payload = {
		id: 1,
		name: "Daniel",
		email: "daniel@example.site",
    //Password - Cifrado con la biblioteca: bcrypt. (valor en claro: qwerty)
		password: "$2b$10$0P9J.ysGMGRw/JY5/i3aa.Ay6Bo/NSY8JsrOzgT2wpzYRXiw5cdh2",
	};
  console.clear();
	try {
		//Se emite y se firma el token.
		let token = await firmarToken(payload);
		//Inicializamos el metodo principal de la aplicacion:
		await cliente.hacerPeticion(token);
	} catch (e) {
		console.log(e);
	}
  
})();
