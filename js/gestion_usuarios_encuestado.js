var info_usuario;

async function getToken() {
    const url = `${link_service}consultas/getTokenUnique`;
    console.log(url)
    const respuesta = await fetch(url)
    const json = await respuesta.json()
    return json;
}

(async function () {
    const token = await getToken();
    localStorage.token = token.token;
})()

//obtenemos los datos del usuario para verificar si se encuentran registrado
async function getDatosUsuarios() {
    const respuesta = await fetch(`${link_service}consultas/usuarios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        }
    })
    const json = await respuesta.json()

    return json;
}

//ingresamos el usuario 
async function setUsuarioEncuestado(usuario, contrasena, nombre, apellido, email) {
    await fetch(`${link_service}consultas/insertarUsuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario: usuario,
            contrasena: contrasena,
            encuestado: {
                nombre: nombre,
                apellido: apellido,
                correo: email,
                empresa_ID: "2"
            }
        })
    })
}


//retraso
function syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while ((end - start) < milliseconds) {
        end = new Date().getTime();
    }
}

//Autentificar Encuestado
// function autentificar_encuestado() {
//     document.querySelector('.btn').innerHTML = 'Comprobando...'
//     document.querySelector('.btn').style.background = 'rgb(126, 126, 241)'
//     var usuario = document.getElementById("email").value;
//     var contrasena = document.getElementById("password").value;

//     if (usuario == "" || contrasena == "") {
//         swal("Porfavor ingrese todos los campos.")
//         document.querySelector('.btn').innerHTML = 'Login'
//         document.querySelector('.btn').style.background = 'rgb(71, 71, 241)'
//     } else {
//         var valor = 0;
//         (async function () {
//             const datos_usuario = await getDatosUsuarios();
//             document.querySelector('.btn').innerHTML = 'Login';
//             document.querySelector('.btn').style.background = 'rgb(71, 71, 241)'
//             await datos_usuario.forEach(element => {
//                 if (element.encuestado != null) {//para comparar solo el Encuestado
//                     if (usuario == element.encuestado.correo) {
//                         if (contrasena == element.contrasena) {
//                             valor = 1;
//                             swal("", "Se identifo correctamente!", "success");
//                             setTimeout(() => {
//                                 window.location.href = `${url_global_pagina}evaluacion_principal${extencion}?usuario=${element.usuario_ID}`;
//                             }, 2000)
//                         }

//                     }
//                 }
//             })
//             if (valor == 0) {
//                 swal("Datos incorrectos, por favor ingrese de nuevo.");
//                 document.querySelector('.btn').innerHTML = 'Login';
//                 document.querySelector('.btn').style.background = 'rgb(71, 71, 241)'
//             }
//         })()


//     }
// }



//para el ADMINISTRADOR
function registrar_administrador() {
    window.location.href = `${url_global_pagina}registrar_administrador${extencion}`
}

function ingresar_administrador() {
    window.location.href = `${url_global_pagina}registrar_normas/registrar_norma${extencion}`
}


function registrarse() {
    window.location.href = `${url_global_pagina}registrar_encuestado${extencion}`
}