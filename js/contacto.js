

//Obtenemos el USUARIO de la URL
function obtener_valor(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


var usuario_ID = obtener_valor("usuario");//OBtenemos el ID de la URL
//_______________________________________
//obtenemos la informacion de los temas
// fetch(`${link_service}consultas/listarTemas`)
//     .then(response => response.json())
//     .then(data => {
//         datos_temas = data;
//     })
//_______________________________________

//cargamos al informacion del USUARIO 
const info_user = document.querySelector('.datos-usuario');
let out_info_user = '';
fetch(`${link_service}consultas/usuarioId/${usuario_ID}`)//recorremos solo una ves
    .then(response => response.json())
    .then(data => {
        out_info_user += `
                            <div class="nombre-user">
                                <span>${data.usuario}</span>
                            </div>
                            <div class="correo-user">
                                <span>${data.encuestado.correo}</span>
                            </div>
                                `;
        info_user.innerHTML = out_info_user;


    })


/* Desplegar imagenes de cada una de las preguntas*/
var tabs_preguntas = document.querySelectorAll(".ver-preguntas");
var tab_wraps_preguntas = document.querySelectorAll(".imagen-preguntas");

tabs_preguntas.forEach(function (tab, tab_index) {
    tab.addEventListener("click", function () {
        tabs_preguntas.forEach(function (tab) {
            tab.classList.remove("active");
        })
        tab.classList.add("active");

        tab_wraps_preguntas.forEach(function (content, content_index) {
            if (content_index == tab_index) {
                content.style.display = "block";
            }
            else {
                content.style.display = "none";
            }
        })

    })
})



//funciones de los botones
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

function ir_about(){
    window.location.href = `${url_global_pagina}about${extencion}?usuario=${usuario_ID}`;
}

function salir() {
    window.location.href = `${url_global_pagina}login_encuestado${extencion}`;
}