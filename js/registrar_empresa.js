var aux_empresa = 0;//para verificar que la empresa ya fue registrada
//Obtenemos el USUARIO de la URL
function obtener_valor(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var usuario_ID = obtener_valor("usuario");//ID del Usuario registrado

//Cargamos al informacion del USUARIO 
const info_user = document.querySelector('.datos-usuario');
let out_info_user = '';
fetch(`${link_service}consultas/usuarioId/${usuario_ID}`)
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



var tabs = document.querySelectorAll(".tabs ul li");
var tab_wraps = document.querySelectorAll(".tab_wrap");

tabs.forEach(function (tab, tab_index) {
    tab.addEventListener("click", function () {
        tabs.forEach(function (tab) {
            tab.classList.remove("active");
        })
        tab.classList.add("active");

        tab_wraps.forEach(function (content, content_index) {
            if (content_index == tab_index) {
                content.style.display = "block";
            }
            else {
                content.style.display = "none";
            }
        })

    })
})

function continuar_encuesta() {
    // window.location.href = `${url_global_pagina}evaluacion_principal${extencion}?usuario=${element.usuario_ID}`;
    if (aux_empresa == 1) {//comprobamos l ingreso de la empresa
        window.location.href = `${url_global_pagina}evaluacion_principal${extencion}?usuario=${usuario_ID}`;
    } else {
        swal("Porfavor registre su empresa.")
    }
}

function mostrar_ingresarEmpresa() {
    document.getElementById('contenido-ingresar-empresa').style.display = 'block'
    document.getElementById('informacion-empresa').style.display = 'none';

}

function regresar_ver_info_empresa() {
    // location.reload();
    document.getElementById('contenido-ingresar-empresa').style.display = 'none'
    document.getElementById('informacion-empresa').style.display = 'block';
}

async function setEmpresa(nombre, sector_opera, numero_empleados, ruc) {
    await fetch(`${link_service}consultas/insertarEmpresa`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            sector_tipo: sector_opera,
            numero_empleados: numero_empleados,
            ruc_empresa: ruc
        })
    })
}

async function getEmpresa() {
    const respuesta = await fetch(`${link_service}consultas/empresas`)
    const json = await respuesta.json()
    //Ordenamos los los Usuario/Encuestados
    await json.sort(function (a, b) {
        return a.empresa_ID - b.empresa_ID;
    });
    return json;
}

async function getUsuarioID(){
    const respuesta = await fetch(`${link_service}consultas/usuarioId/${usuario_ID}`)
    const json = await respuesta.json()
    return json
}

async function putUsuarioID(usuario,contrasena_usuario,nombre_usuario,apellido_usuario,correo_usuario,encuestado_ID,ultima_empresa_ingresa){
    await fetch(`${link_service}consultas/usuarioId/${usuario_ID}`)
    .then(response => response.json())
    .then(data => {
        //actualizamos los datos del USUARIO
        console.log(usuario_ID)
        fetch(`${link_service}consultas/actualizarUsuario/${usuario_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario: usuario,
                contrasena: contrasena_usuario,
                encuestado: {
                    nombre: nombre_usuario,
                    apellido: apellido_usuario,
                    correo: correo_usuario,
                    encuestado_ID: encuestado_ID,
                    empresa: {
                        empresa_ID: ultima_empresa_ingresa
                    }
                }
            })
        })
    })

}
function guardar_empresa() {
    var nombre = document.getElementById("nombre-empresa").value;
    let sector_opera = document.getElementById("sector-opera-empresa").value;
    let numero_empleados = document.getElementById("numero-empleados-empresa").value;
    let ruc = document.getElementById("ruc-empresa").value;

    if (nombre == "" || sector_opera == "" || numero_empleados == "" || ruc == "") {
        swal("Porfavor ingrese todos los datos.")
    } else {
        //Ingresamos la Empresa
        var ultima_empresa_ingresa = '';
        (async function () {
            //ingresamos la empresa
            await setEmpresa(nombre, sector_opera, numero_empleados, ruc)
            swal("Empresa Resgistrada Correctamente!")
            //obtenemos la empresa previamente ingresada
            const empresas_orden = await getEmpresa();
            empresas_orden.forEach(element => {
                ultima_empresa_ingresa = element.empresa_ID
            })
            //obtenemos la info del usuario para actualizar la EMPRESA ID
            const info_usuario = await getUsuarioID() 
            await putUsuarioID(info_usuario.usuario,info_usuario.contrasena,info_usuario.encuestado.nombre,info_usuario.encuestado.apellido,info_usuario.encuestado.correo,info_usuario.encuestado.encuestado_ID,ultima_empresa_ingresa);
            aux_empresa = 1;//para validar que solo pasa al siguinet proceso si ingreso una empresa
        })()
        // swal("", "Usuario Resgistrado Corectamente!", "success");
        setTimeout(() => {
            // location.reload();
            document.getElementById('contenido-ingresar-empresa').style.display = 'none'
            document.getElementById('informacion-empresa').style.display = 'block';
            //Cargamos Informcion de al Empresa
            const info_empresa = document.getElementById('informacion-empresa');
            let out_info_empresa = '';
            fetch(`${link_service}consultas/empresaId/${ultima_empresa_ingresa}`)
                .then(response => response.json())
                .then(data => {
                    out_info_empresa += `
            <div class="titulo-empresa">
                <span>Información Empresa</span>
            </div>
            <div class="info-empresa">
                <div class="nom-empresa">
                    <div class="titulo">Empresa:</div>
                    <div class="nom-empresa">${data.nombre}</div>
                </div>
                <div class="sector-empresa">
                    <div class="titulo">Sector:</div>
                    <div class="sector-empresa">${data.sector_tipo}</div>
                </div>
                <div class="cantidad-empleados-empresa">
                    <div class="titulo">Total Empleados:</div>
                    <div class="sector-empresa">${data.numero_empleados}</div>
                </div>
                <div class="ruc-empresa">
                    <div class="titulo">RUC:</div>
                    <div class="ruc">${data.ruc_empresa}</div>
                </div>
            </div>
        `;
                    info_empresa.innerHTML = out_info_empresa;
                })

        }, 3000)
    }
}

function menuToggle() {
    const toggleMenu = document.querySelector('.menu-salir');
    toggleMenu.classList.toggle('active')
}
//para al perfil del usuario (la interfaz hay que eiitar)
function ir_perfil() {
    window.location.href = `${url_global_pagina}perfil_usuario${extencion}?usuario=${usuario_ID}`;
}

function ir_registrar_encuestado() {
    window.location.href = `${url_global_pagina}registrar_encuestado${extencion}`;
}