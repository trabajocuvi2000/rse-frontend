//Obtenemos el USUARIO de la URL
function obtener_valor(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


var usuario_ID = obtener_valor("usuario");//OBtenemos el ID de la URL

//cargamos al informacion del USUARIO 
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


async function getDimensiones() {
    const respuesta = await fetch(`${link_service}consultas/listarDimensiones`,)
    const json = await respuesta.json()

    return json;
}
async function getTemas() {
    const respuesta = await fetch(`${link_service}consultas/listarTemas`)
    const json = await respuesta.json()

    return json;
}

// let nom_imagenes = ['Derechos_Humanos.jpg', 'Trabajadores.jpg', 'cuestiones_relacionadas_consumidor.jpg', 'participacion_comunidad_desarrollo.jpg', 'medio_ambiente.jpg']; imagenes anteriores
// let nom_imagenes = ['tema_practicas_trabajo_2.jpg', 'tema_derechos_humanos_2.png', 'tema_comunidad_desarrollo_2.jpg', 'tema_cuestiones_relacionadas_consumidor_2.jpg', 'medio_ambiente.jpg'];
// let enlaces_paginas = [
//     `${url_global_pagina}tema_1${extencion}?usuario=${usuario_ID}`,
//     `${url_global_pagina}tema_2${extencion}?usuario=${usuario_ID}`,
//     `${url_global_pagina}tema_3${extencion}?usuario=${usuario_ID}`,
//     `${url_global_pagina}tema_4${extencion}?usuario=${usuario_ID}`,
//     `${url_global_pagina}tema_5${extencion}?usuario=${usuario_ID}`];


let enlaces_pagina = `${url_global_pagina}tema_1${extencion}?usuario=${usuario_ID}`;
//estandar_ID
var estadnar_id = 23;
const objeto = [];
let nom_containers_temas = [];
let lista_temas = [];
let lista_temas_comenzar = []; // para gradar la lista de temas IDs, para luego colocar en el boton comenzar


function getIdTemas() {
    let lista = [];
    var contendores = document.querySelectorAll('.container-cards');
    for (i = 0; i < contendores.length; i++) {
        objeto.forEach(element => {
            if (contendores[i].id == element.dimension) {
                element.temas.forEach(tema => {
                    lista.push(tema.tema_ID)
                })
            }
        })
    }
    return lista;
}

async function getToken() {
    const url = `${link_service}consultas/getToken/${usuario_ID}`;
    console.log(url)
    const respuesta = await fetch(url)
    const json = await respuesta.json()

    return json;
}



(async function () {
    // para que aparesca el logo de cargando en la ventana encaluacion
    document.getElementById('onload').style.visibility = "visible";

    const token = await getToken();
    localStorage.token = token.token; // guardamos el token

    const datos_dim = await getDimensiones();
    const datos_temas = await getTemas();
    datos_temas.forEach(element => {
        // console.log(element)
        // para que trabaje solo con el estandarque especificamos 
        if (element.dimension.estandar.estandar_ID == estadnar_id) {
            // console.log(element.dimension.nombre)
            const dim_exist = objeto.find(t => t.dimension === element.dimension.nombre)
            if (!dim_exist) {//si no existe ingresamo el objeto 
                const objeto_dim = {
                    dimension: element.dimension.nombre,
                    temas: [],
                }
                objeto.push(objeto_dim)
            }
            objeto.find((dim, index) => {
                // para que ingrese de acuerdo a la dimension 
                if (dim.dimension === element.dimension.nombre) {
                    objeto[index].temas.push(element)
                }

            })

        }
    });

    const dimensiones_tabs = document.querySelector('.tabs-ul')
    let outDimensiones_tabs = '';

    const contenido_dim = document.querySelector('.content-tabs')
    let outContenido_dim = '';
    var contador_dim = 1;
    // ordenamos de acuerdo al numero de elemtnos 
    objeto.sort(function (a, b) {
        return b.temas.length - a.temas.length;
    });
    // console.log(objeto)
    objeto.forEach(element => {
        //ordenamos el objeto de acuerdo al numero de temas para que el que tenga myor nuemro de temas vaya primero 
        if (contador_dim == 1) {
            outDimensiones_tabs += `<li class="active">
                                        <span class="text">${element.dimension}</span>
                                    </li>`

            outContenido_dim += `
            <div class="tab_wrap" style="display: block;">
                <div class="title">
                Dimensión ${element.dimension}
                </div>
                <div class="container-cards container-cards_${contador_dim}" id="${element.dimension}">
                    ${contador_dim}
                </div>
            </div> 
            `
            nom_containers_temas.push(`container-cards_${contador_dim}`)//guardamos el nombre de los containers

        } else {
            outDimensiones_tabs += `<li>
                                    <span class="text">${element.dimension}</span>
                                </li>`

            outContenido_dim += `
            <div class="tab_wrap" style="display: none;">
                <div class="title">
                Dimensión ${element.dimension}
                </div>
                <div class="container-cards container-cards_${contador_dim}" id="${element.dimension}">
                    ${contador_dim}
                </div>
            </div> 
            `
            nom_containers_temas.push(`container-cards_${contador_dim}`)//guardamos el nombre de los containers
        }
        contador_dim = contador_dim + 1;

    })
    dimensiones_tabs.innerHTML = outDimensiones_tabs;
    contenido_dim.innerHTML = outContenido_dim;
    //obtenemos todos los Cards
    var contendores = document.querySelectorAll('.container-cards');
    lista_temas = getIdTemas(); //obtenemos el Id de los indicadores
    //recorremos los contendores
    var cont = 0
    for (i = 0; i < contendores.length; i++) {
        // console.log(contendores[i].id)
        objeto.forEach(element => {
            if (contendores[i].id == element.dimension) {
                const contendor_dim = document.getElementById(contendores[i].id);
                let outContendor_dim = ''
                //recorremos los temas
                element.temas.forEach(tema => {
                    lista_temas.push(cont)
                    // console.log(lista_temas)
                    // if(cont == 0){
                    //     lista_temas_comenzar = lista_temas;
                    //     lista_temas_comenzar.push(0)
                    // }
                    outContendor_dim += `
                                    <div class="card-dim">
                                        <div class="card-imagen-dim">
                                            <img src="${tema.img_enlace}" alt="">
                                        </div>
                                        <div class="card-content-dim">
                                            <p class="car-title">${tema.nombre}</p>
                                            <p class="res-concept">${tema.descripcion}</p>
                                            <div class="buton-comensar-dim">
                                                <a href="${enlaces_pagina + `&temas=${lista_temas}`}"
                                                    class="button-dim">Comenzar</a>
                                            </div>
                                        </div>
                                    </div>
                    `;
                    cont = cont + 1; // incrementamos el contador de imagenes
                    lista_temas.pop()
                })
                contendor_dim.innerHTML = outContendor_dim;
            }
        })
        // console.log(lista_temas_comenzar)
    }
    lista_temas_comenzar = lista_temas;
    lista_temas_comenzar.push(0)
    // recorremos el objeto para crear los tabs
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
    // escondemos el logo de cargando en la ventana evaluacion
    document.getElementById('onload').style.visibility = "hidden";
})()



//funciones de los botones
function comezar() {
    window.location.href = `${url_global_pagina}tema_1${extencion}?usuario=${usuario_ID}&temas=${lista_temas_comenzar}`;
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

function salir() {
    window.location.href = `${url_global_pagina}login_encuestado${extencion}`;
}