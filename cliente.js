module.exports = {
  peticion: {
    url: "http://10.53.67.42:80/productos",
    metodo: "GET",
    recurso: "/productos",
    network:{
      ipOrigen: "16.74.34.67",
      ipDestino: "110.54.23.45"
    },
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
 	  codigo: null,
 	  error: null,
    mensaje: null,
 	  ipOrigen: null,
 	  recurso: null,
 	  body: null,
  },
  hacerPeticion: async function(token) {
    //Import proxy:
    const ProxyInverso = require("./ProxyInverso.js");
     
    //Agregamos el token en la cabecera de la peticion.
    this.peticion.headers.token = token;
    console.log(`-----------------------------------------------------------------------------
    `);
    console.log(`
    Objetivo de la aplicacion: Autenticar y autorizar a un cliente que intente acceder a un recurso de del sevidor por medio de un \"JsonWebToken\".
    `);
    console.log("-----------------------------------------------------------------------------");
    console.log("\n")
    console.log("-----------------------------------------------------------------------------");
    console.log("\tObjeto mediante el cual se va a realizar las peticiones al \"proxy inverso.\")");
    console.log("-----------------------------------------------------------------------------");
    console.log("Objeto de tipo: peticion.");
    console.log(this.peticion);

    console.log("-----------------------------------------------------------------------------");
    console.log("\n")

    console.log("\n")
    console.log("-----------------------------------------------------------------------------");
    console.log("\tHaciendo peticion numero: 1. (Mediante un cliente - HAPPY PATH)")
    console.log("-----------------------------------------------------------------------------");
    console.log(`
      Objetivo: Probar el flujo de trabajo directo de la aplicacion.
      Respuesta esperada: Un codigo 200 junto con un arreglo de productos.
    `)
    console.log("-----------------------------------------------------------------------------");
    //Interactuamos con el servidor a traves del proxy.
    let cliente = new ProxyInverso(this.peticion, this.respuesta);
    let respuestaProxyInverso = await cliente.procesar();
    console.log(respuestaProxyInverso.respuesta);
    console.log("\n\n\n\n");



		/*******************************************************************
		 *               Peticion alterando el token
     *******************************************************************/
    console.log("\n")

    console.log("-----------------------------------------------------------------------------");
    console.log("\tHaciendo peticion numero: 2. (Mediante un cliente)")
    console.log("-----------------------------------------------------------------------------");
    console.log(`
      Objetivo: Probar la autenticidad del token inyectado en la cabecera http.
      Respuesta esperada: Un codigo: 403 con el mensaje: \"El token proporcionado NO es valido\"
    `);

    console.log("-----------------------------------------------------------------------------");
    //Alterarmos el token
    console.log("\nAlterando token contenido en la cabecera http...");
    this.peticion.headers.token += "d";

    let client2 = new ProxyInverso(this.peticion, this.respuesta);
    let respuestaProxyInverso2 = await client2.procesar();
    console.log(respuestaProxyInverso2.respuesta);
    console.log("\n\n\n\n");
    
    /*******************************************************************
		 *               Peticion alterando la contrasena
     *******************************************************************/

     console.log("-----------------------------------------------------------------------------");
     console.log("\tHaciendo peticion numero: 3. (Mediante un cliente)")
     console.log("-----------------------------------------------------------------------------");


    console.log(`
    Objetivo: Probar que las credenciales suministradas por el usuario 
    coincidan con las contenidas en la base de datos.
    Respuesta esperada: Un codigo: 403 con el mensaje: \"Las credenciales NO coinciden\"
    `);

    console.log("-----------------------------------------------------------------------------");
    console.log("\nRestaurando el token original... inyectado en la cabecera http\n");
    //Reestablecemos el token original
    this.peticion.headers.token = token;
    console.log("\nModificando las credenciales...");
    //Alteramos la contrasena
    this.peticion.data.password = "dd";
    console.log(this.peticion.data);
    console.log("\n");

    let client3 = new ProxyInverso(this.peticion, this.respuesta);
    let respuestaProxyInverso3 = await client3.procesar();
    console.log(respuestaProxyInverso3.respuesta);
    console.log("\n\n\n\n");
  },
}
