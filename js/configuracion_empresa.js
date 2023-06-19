
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
var terminos_aceptacion_usuario;
function crear_anos() {
    const inicio_operaciones = document.querySelector('.ano-inicio');
    let anos = '';
    anos = '<option value="" id="norma">Selecionar nuevo año</option>'
    for (i = 1980; i <= 2022; i++) {
        anos += `
        <option value="${i}" id="norma">${i}</option>
        `;
    }
    inicio_operaciones.innerHTML = anos;
}
crear_anos();
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
    //guardamos la info los IDs del encuestado y de la empresa
    encuestado_id = datos_usuario.encuestado.encuestado_ID;
    empresa_id = datos_usuario.encuestado.empresa.empresa_ID;
    
    //Cargamos la info de la empresa
    const datos_empresa = await getDataEmpresa();
    
    document.getElementById("nombre-empresa").value = datos_empresa.nombre;
    document.getElementById("pagina-web").value = datos_empresa.sitio_web;
    document.getElementById("ciudad-anterior").value = datos_empresa.ciudad_operacion;
    document.getElementById("direccion-operacion").value = datos_empresa.direccion_operacion;
    document.getElementById("sector-anterior").value = datos_empresa.sector_tipo;
    document.getElementById("numero-sedes").value = datos_empresa.numero_sedes;
    document.getElementById("numero-empleados-empresa").value = datos_empresa.numero_empleados;
    document.getElementById("inicio-operacion").value = datos_empresa.fecha_inicio_operciones;
    console.log(datos_empresa.fecha_inicio_operciones)
    document.getElementById("estimado-ingresos").value = datos_empresa.estimado_ingresos;
    document.getElementById("ruc-empresa").value = datos_empresa.ruc_empresa;
    terminos_aceptacion_usuario = datos_empresa.terminos_aceptacion;
})()

function cargar_estar_ciudad_operacion() {
    var combo_ciudad_operacion = document.querySelector(".selector-ciudad-operacion");
    var ciudad_operacion = combo_ciudad_operacion.options[combo_ciudad_operacion.selectedIndex].value;
    //console.log(value)
    document.getElementById('ciudad-anterior').value = ciudad_operacion;
}

function cargar_sector() {
    var combo_ciudad_operacion = document.querySelector(".selector-sector");
    var ciudad_operacion = combo_ciudad_operacion.options[combo_ciudad_operacion.selectedIndex].value;
    //console.log(value)
    document.getElementById('sector-anterior').value = ciudad_operacion;
}

function cargar_anio_inicio() {
    var combo_ciudad_operacion = document.querySelector(".ano-inicio");
    var ciudad_operacion = combo_ciudad_operacion.options[combo_ciudad_operacion.selectedIndex].value;
    //console.log(value)
    document.getElementById('inicio-operacion').value = ciudad_operacion;
}
//__________________________

//para actualizar los datos de la EMPRESAa
async function putDatosEmpresa() {
    await fetch(`${link_service}consultas/actualizarEmpresa/${empresa_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: document.getElementById("nombre-empresa").value,
            sitio_web: document.getElementById("pagina-web").value,
            ciudad_operacion: document.getElementById("ciudad-anterior").value,
            direccion_operacion: document.getElementById("direccion-operacion").value,
            sector_tipo: document.getElementById("sector-anterior").value,
            numero_sedes: document.getElementById("numero-sedes").value,
            numero_empleados: document.getElementById("numero-empleados-empresa").value,
            fecha_inicio_operciones: document.getElementById("inicio-operacion").value,
            estimado_ingresos: document.getElementById("estimado-ingresos").value,
            ruc_empresa: document.getElementById("ruc-empresa").value,
            terminos_aceptacion: terminos_aceptacion_usuario
        })
    })
}

function actualizar_empresa() {
    (async function () {
        // para mostrar el modal cargando 
        mostrar_modal_cargando();
        await putDatosEmpresa()
        user_actualizando_usuario();
    })()
    // swal("Datos de la Empresa actualizados correctamente.")
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
