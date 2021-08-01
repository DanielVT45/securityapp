const db = {
	users: [
		{
			name: "Daniel",
			email: "daniel@example.site",
			password: "$2b$10$0P9J.ysGMGRw/JY5/i3aa.Ay6Bo/NSY8JsrOzgT2wpzYRXiw5cdh2",
		},
		{
			name: "Gilberto",
			email: "giberto@example.site",
			password: "$2b$10$za4SIinS0uGIkJ27hEwUL.UXGDgga70ywGpDsDJJnYHzrC0vrNLFK",
		},
		{
			name: "Gilberto",
			email: "giberto@example.site",
			password: "$2b$10$ItTIR1Gt2b.iK7PGeg0N3u0mdec0.BQevGcu/ysne/wuih45gBoce",
		},
	],
	productos: [
		{ name: "Funko Pop: Rei Ayanami", Precio: 400 },
		{ name: "Funko Pop: Asuka", Precio: 400 },
		{ name: "Funko Pop: Venom", Precio: 400 },
		{ name: "Funko Pop: Unidad-01", Precio: 400 }
  ],

	//Functiones: busqueda. Retorna el usuario de la base de datos.
	buscarUsuario: function (data) {
		console.log("Buscando el usuario en la Base De Datos \"dummy\"...");
		const { email, password } = data;
		//Extrae las llaves y los valores para armar la query.
		//let llaves = Object.keys(params);

		//Buscar en la base de datos.
    let user = this.users.filter((user) => {
			return user.email === email;
		})[0];

		return user || null;
	},
};

module.exports = db;
