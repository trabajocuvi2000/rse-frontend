var aux_empresa = 0;//para verificar que la empresa ya fue registrada
//Obtenemos el USUARIO de la URL
function obtener_valor(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var usuario_ID = obtener_valor("usuario");//ID del Usuario registrado


async function getToken() {
    const url = `${link_service}consultas/getToken/${usuario_ID}`;
    console.log(url)
    const respuesta = await fetch(url)
    const json = await respuesta.json()

    return json;
}

(async function () {
    const token = await getToken();
    localStorage.token = token.token; // guardamos el token
})()

//Cargamos al informacion del USUARIO 
const info_user = document.querySelector('.datos-usuario');
let out_info_user = '';
fetch(`${link_service}consultas/usuarioId/${usuario_ID}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token,
    }
})
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

// funcion para cargar el select de el ao de inicion con anos 
function crear_anos() {
    const inicio_operaciones = document.querySelector('.ano-inicio');
    let anos = '';
    anos = '<option value="" id="norma">Selecionar</option>'
    for (i = 1980; i <= 2022; i++) {
        anos += `
        <option value="${i}" id="norma">${i}</option>
        `;
    }
    inicio_operaciones.innerHTML = anos;
}
crear_anos();

function continuar_encuesta() {
    // window.location.href = `${url_global_pagina}evaluacion_principal${extencion}?usuario=${element.usuario_ID}`;
    if (aux_empresa == 1) {//comprobamos l ingreso de la empresa
        window.location.href = `${url_global_pagina}evaluacion_principal${extencion}?usuario=${usuario_ID}`;
    } else {
        mostrar_modal_cargando();
        // swal("Porfavor registre su empresa.")
        user_comfirm_empresa();
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

async function setEmpresa(nombre, sector_opera, numero_empleados, ruc,
    ciudad_operacion, direccion_operacion
    , numero_sedes, fecha_inicio_operacion, estimado_ingresos, pagina_web,
    termino_aceptacion) {
    await fetch(`${link_service}consultas/insertarEmpresa`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            sitio_web: pagina_web,
            ciudad_operacion: ciudad_operacion,
            direccion_operacion: direccion_operacion,
            sector_tipo: sector_opera,
            numero_sedes: numero_sedes,
            numero_empleados: numero_empleados,
            fecha_inicio_operciones: fecha_inicio_operacion,
            estimado_ingresos: estimado_ingresos,
            ruc_empresa: ruc,
            terminos_aceptacion: termino_aceptacion
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

async function getUsuarioID() {
    const respuesta = await fetch(`${link_service}consultas/usuarioId/${usuario_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        }
    })
    const json = await respuesta.json()
    return json
}

async function putUsuarioID(usuario, contrasena_usuario, nombre_usuario, apellido_usuario, correo_usuario, encuestado_ID, termino_aceptacion, tipo_cuenta, ultima_empresa_ingresa) {
    // termino_aceptacion, tipo_cuenta,
    console.log(termino_aceptacion)
    console.log(tipo_cuenta)
    await fetch(`${link_service}consultas/usuarioId/${usuario_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        }
    })
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
                        },
                        terminos_aceptacion: termino_aceptacion,
                        tipo_cuenta: tipo_cuenta
                    }
                })
            })
        })

}

function aceptar_terminos() {

    // para mostrar el modal cargando 
    mostrar_modal_cargando();
    var nombre = document.getElementById("nombre-empresa").value;
    var pagina_web = document.getElementById("pagina-web").value;

    // var ciudad_operacion = document.getElementById("ciudad-operacion").value;
    var combo_ciudad_operacion = document.querySelector(".selector-ciudad-operacion");
    var ciudad_operacion = combo_ciudad_operacion.options[combo_ciudad_operacion.selectedIndex].value;

    var direccion_operacion = document.getElementById("direccion-operacion").value;
    // var sector_opera = document.getElementById("selector-sector").value;

    var combo_sector = document.querySelector(".selector-sector");
    var sector_opera = combo_sector.options[combo_sector.selectedIndex].value;

    var numero_sedes = document.getElementById("numero-sedes").value;

    let numero_empleados = document.getElementById("numero-empleados-empresa").value;
    // var combo_num_empleados = document.querySelector(".selector-numero-empleados");
    // var numero_empleados = combo_num_empleados.options[combo_num_empleados.selectedIndex].value;

    let ruc = document.getElementById("ruc-empresa").value;
    // let fecha_inicio_operacion = document.getElementById("inicio-operacion").value;

    var combo_anio = document.querySelector(".ano-inicio");
    var fecha_inicio_operacion = combo_anio.options[combo_anio.selectedIndex].value;

    let estimado_ingresos = document.getElementById("estimado-ingresos").value;

    // console.log("NOmbre: " + nombre)
    // console.log("Pagina Web: " + pagina_web)
    // console.log("Ciudad de Operacion: " + ciudad_operacion)
    // console.log("Direccion de Operacion: " + direccion_operacion)
    // console.log("Sectore de Operacion: " + sector_opera)
    // console.log("Numero de Sede: " + numero_sedes)
    // console.log("Numero de Empleados: " + numero_empleados)
    // console.log("RUC: " + ruc)
    // console.log("Fecha Inicio de Operaciones: " + fecha_inicio_operacion)
    // console.log("Estimado de Ingresos Anuales: " + estimado_ingresos)



    if (nombre == "" || sector_opera == "" || numero_empleados == "" || ruc == ""
        || ciudad_operacion == "" || direccion_operacion == "" || numero_sedes == "" ||
        fecha_inicio_operacion == "" || estimado_ingresos == "") {
        // swal("Porfavor ingrese todos los datos.");
        user_complete_campos();
    } else {
        ocultar_modal_cargando();// ocultamos le modal cargando
        mostrar_modal_acptar_terminos();// mostramos el modal aceptar termimos
    }
}

function regitrarDatos() {
    //obtenemos la info del modal
    let opcion_si = document.getElementById('terminos-aceptacion-SI').checked;
    let opcion_no = document.getElementById('terminos-aceptacion-NO').checked;
    if (opcion_si == false && opcion_no == false) {
        swal("Seleccione una opción!");
    } else {
        //cerramos el modal
        close_modal();
        if (opcion_si == true) {
            guardar_empresa(1); // uno quiere decri que el usuairio SI acepto los terminos
        } else if (opcion_no == true) {
            guardar_empresa(0); // cero quiere decir que el usuario NO acepto los termonos 
        }
    }
}

function guardar_empresa(termino_aceptacion) {
    // para mostrar el modal cargando 
    mostrar_modal_cargando();
    var nombre = document.getElementById("nombre-empresa").value;
    var pagina_web = document.getElementById("pagina-web").value;

    // var ciudad_operacion = document.getElementById("ciudad-operacion").value;
    var combo_ciudad_operacion = document.querySelector(".selector-ciudad-operacion");
    var ciudad_operacion = combo_ciudad_operacion.options[combo_ciudad_operacion.selectedIndex].value;

    var direccion_operacion = document.getElementById("direccion-operacion").value;
    // var sector_opera = document.getElementById("selector-sector").value;

    var combo_sector = document.querySelector(".selector-sector");
    var sector_opera = combo_sector.options[combo_sector.selectedIndex].value;

    var numero_sedes = document.getElementById("numero-sedes").value;

    let numero_empleados = document.getElementById("numero-empleados-empresa").value;
    // var combo_num_empleados = document.querySelector(".selector-numero-empleados");
    // var numero_empleados = combo_num_empleados.options[combo_num_empleados.selectedIndex].value;

    let ruc = document.getElementById("ruc-empresa").value;
    // let fecha_inicio_operacion = document.getElementById("inicio-operacion").value;

    var combo_anio = document.querySelector(".ano-inicio");
    var fecha_inicio_operacion = combo_anio.options[combo_anio.selectedIndex].value;

    let estimado_ingresos = document.getElementById("estimado-ingresos").value;

    console.log("NOmbre: " + nombre);
    console.log("Pagina Web: " + pagina_web);
    console.log("Ciudad de Operacion: " + ciudad_operacion);
    console.log("Direccion de Operacion: " + direccion_operacion);
    console.log("Sectore de Operacion: " + sector_opera);
    console.log("Numero de Sede: " + numero_sedes);
    console.log("Numero de Empleados: " + numero_empleados);
    console.log("RUC: " + ruc);
    console.log("Fecha Inicio de Operaciones: " + fecha_inicio_operacion);
    console.log("Estimado de Ingresos Anuales: " + estimado_ingresos);
    console.log("Terminos de aceptacion: " + termino_aceptacion);

    (async function () {
        //ingresamos la empresa
        await setEmpresa(nombre, sector_opera, numero_empleados, ruc,
            ciudad_operacion, direccion_operacion
            , numero_sedes, fecha_inicio_operacion, estimado_ingresos, pagina_web,
            termino_aceptacion)
        // swal("Empresa Resgistrada Correctamente!")

        //obtenemos la empresa previamente ingresada
        const empresas_orden = await getEmpresa();
        empresas_orden.forEach(element => {
            ultima_empresa_ingresa = element.empresa_ID
        })
        //obtenemos la info del usuario para actualizar la EMPRESA ID
        const info_usuario = await getUsuarioID();
        console.log(info_usuario)
        await putUsuarioID(info_usuario.usuario, info_usuario.contrasena, info_usuario.encuestado.nombre, info_usuario.encuestado.apellido, info_usuario.encuestado.correo, info_usuario.encuestado.encuestado_ID, info_usuario.encuestado.terminos_aceptacion, info_usuario.encuestado.tipo_cuenta, ultima_empresa_ingresa);
        aux_empresa = 1;//para validar que solo pasa al siguinet proceso si ingreso una empresa
        setTimeout(()=>{
            user_empresa_registrado(); // para mostrar el mesnaje de aceptacion empresa
        },2000)
        // document.getElementById('continuar_evaluacion').style.border = "border: 2px solid rgb(71, 71, 241);";

    })()

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