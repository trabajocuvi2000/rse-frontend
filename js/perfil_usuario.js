
//Obtenemos el USUARIO de la URL

function obtener_valor(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var usuario_ID = obtener_valor("usuario");
//cargamos al informacion del USUARIO 
const info_user = document.querySelector('.datos-usuario');
let out_info_user = '';
//para guardar el id del enscuetado y de la empresa
var encuestado_id;
var empresa_id;
var contrasena_usuario;
var tipo_cuenta_usuario;
var termino_aceptacion_usuario;
//___________________________
//obtenemos la info del Usuario
async function getDataUsuario() {
    const respuesta = await fetch(`${link_service}consultas/usuarioId/${usuario_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        }
    })
    const json = await respuesta.json()

    return json;
}
//obtenemos la info de la Empresa
async function getDataEmpresa() {
    const respuesta = await fetch(`${link_service}consultas/empresaId/${empresa_id}`)
    const json = await respuesta.json()

    return json;
}
//mostramos la informacion del usuario
(async function () {
    //cargamos la Info del USUARIo
    const datos_usuario = await getDataUsuario()
    out_info_user += `
                            <div class="nombre-user">
                                <span>${datos_usuario.usuario}</span>
                            </div>
                            <div class="correo-user">
                                <span>${datos_usuario.encuestado.correo}</span>
                            </div>
                                `;
    info_user.innerHTML = out_info_user;
    // console.log(datos_usuario)
    //-------------------------
    document.getElementById('nombre').value = datos_usuario.encuestado.nombre;
    document.getElementById('apellido').value = datos_usuario.encuestado.apellido;
    document.getElementById('usuario').value = datos_usuario.usuario;
    document.getElementById('email').value = datos_usuario.encuestado.correo;
    document.getElementById('contrasena').value = datos_usuario.contrasena;
    document.getElementById('confirmar-contrasena').value = datos_usuario.contrasena;

    encuestado_id = datos_usuario.encuestado.encuestado_ID;
    empresa_id = datos_usuario.encuestado.empresa.empresa_ID;
    contrasena_usuario = datos_usuario.contrasena;
    //guardamos el termino de aceptacion y el tipo de correo con el que el usuario inicio seccion 
    termino_aceptacion_usuario = datos_usuario.encuestado.terminos_aceptacion;
    tipo_cuenta_usuario = datos_usuario.encuestado.tipo_cuenta;
    // comprbamos que tipo de usuario es
    var tipo_usuario = datos_usuario.encuestado.tipo_cuenta;
    if (tipo_usuario == 1) { // si el usuario se registro por google ocultamos elmentos
        document.getElementById("correo-actualizar").style.display = "none";
        document.getElementById("apellido-actulizar").style.display = "none";
        document.querySelector(".contrasenas").style.display = "none";
        document.getElementById("boton-actualizar").style.display = "none";
        document.getElementById('nombre').disabled = true;
        document.getElementById('email').disabled = true;
        document.querySelector(".contenido").style.width = "30%";
        document.querySelector('.contrasenas-anterior').style.display = 'none';
    }

})()
//__________________________
//para actualizar los datos del Usuario
async function putDatosUsuario() {
    await fetch(`${link_service}consultas/actualizarUsuario/${usuario_ID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario: document.getElementById('usuario').value,
            contrasena: contrasena_usuario,
            encuestado: {
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                correo: document.getElementById('email').value,
                encuestado_ID: encuestado_id,
                empresa: {
                    empresa_ID: empresa_id
                },
                terminos_aceptacion: termino_aceptacion_usuario,
                tipo_cuenta: tipo_cuenta_usuario
            },
            administrador_ID: null,
        })
    })

}
function actualizar_usaurio() {
    var contrasena = document.getElementById('contrasena').value;
    var confirmar_contrasena = document.getElementById('confirmar-contrasena').value;
    if (contrasena == confirmar_contrasena) {
        (async function () {
            contrasena_usuario = contrasena; // caambiamos la nueva contrasena
            await putDatosUsuario();
            swal("Datos actualizados correctamente.")
        })()
    } else {
        swal("Las contraseñas no coinciden.")
    }


}

async function comprobarContranaUsuario(correo, contrasena) {
    const respuesta = await fetch(`${link_service}consultas/comprobarUsuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "contrasena": contrasena,
            "encuestado": {
                "correo": correo
            }
        })
    })
    const json = await respuesta.json();
    return json;
}
let comfir_contrasena = false;
function comprobar_contrasena() {
    (async function () {
        var contrasena_anterior = document.getElementById('contrasena-previa').value;
        // console.log(document.getElementById('email').value);
        const comprobar = await comprobarContranaUsuario(document.getElementById('email').value, contrasena_anterior);
        if (comprobar.contrasena_correcta) {
            // ingresamos la contrasena en los campos para que valide
            document.getElementById('contrasena').value = contrasena_anterior;
            document.getElementById('confirmar-contrasena').value = contrasena_anterior;
            // para mostrar los campos 
            document.querySelector('.contrasenas-anterior').style.display = 'none';
            document.querySelector('.contrasenas').style.display = 'flex';
            comfir_contrasena = true;
        } else {
            swal('La contrasena no coincide!')
        }
    })()
}

function ir_evaluacion() {
    window.location.href = `${url_global_pagina}evaluacion_principal${extencion}?usuario=${usuario_ID}`;
}

function ir_dashboard() {
    window.location.href = `${url_global_pagina}dashboard${extencion}?usuario=${usuario_ID}`;
}

function ir_reporte() {
    window.location.href = `${url_global_pagina}resultados${extencion}?usuario=${usuario_ID}`;
}
function ir_perfil() {
    window.location.href = `${url_global_pagina}perfil_usuario${extencion}?usuario=${usuario_ID}`;
}

function configuracion_empresa() {
    window.location.href = `${url_global_pagina}configuracion_empresa${extencion}?usuario=${usuario_ID}`;
}

function ir_contactanos() {
    window.location.href = `${url_global_pagina}ayuda${extencion}?usuario=${usuario_ID}`;
}

function ir_about() {
    window.location.href = `${url_global_pagina}about${extencion}?usuario=${usuario_ID}`;
}

function regresar() {
    history.back()
}

function salir() {
    window.location.href = `${url_global_pagina}login_encuestado${extencion}`;
}
