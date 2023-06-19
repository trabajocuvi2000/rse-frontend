

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


// Cargasmos la dimensiones
const dimensiones = document.querySelector('.tabs-ul')
let outDimensiones = ''
let lista_dim = [];
var auxiliar = 0;
fetch(`${link_service}consultas/listarDimensiones`)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            // console.log(element.nombre)
            //${element.nombre}// esto estaba  lineas: 47 y 53
            lista_dim.push(element.nombre)
            if (auxiliar == 0) {
                outDimensiones += `
                        <li class="active">
                            <span class="text">social</span>
                        </li>
                    `
            } else {
                outDimensiones += `
                        <li>
                            <span class="text">ambiental</span>
                        </li>
                    `
            }
            auxiliar = auxiliar + 1;
        })
        dimensiones.innerHTML = outDimensiones;
    })




let nom_imagenes = ['Derechos_Humanos.jpg', 'Trabajadores.jpg', 'cuestiones_relacionadas_consumidor.jpg', 'participacion_comunidad_desarrollo.jpg', 'medio_ambiente.jpg'];
let enlaces_paginas = [
    `${url_global_pagina}tema_1${extencion}?usuario=${usuario_ID}`,
    `${url_global_pagina}tema_2${extencion}?usuario=${usuario_ID}`,
    `${url_global_pagina}tema_3${extencion}?usuario=${usuario_ID}`,
    `${url_global_pagina}tema_4${extencion}?usuario=${usuario_ID}`,
    `${url_global_pagina}tema_5${extencion}?usuario=${usuario_ID}`];

//guardamos la listas IDs temas
let lista_temas = [];//para guardaar el ID de los TEMAS


async function getTemas() {
    const respuesta = await fetch(`${link_service}consultas/listarTemas`)
    const json = await respuesta.json()

    return json;
}

(async function () {
    const datos_temas = await getTemas()
    datos_temas.forEach(element => {
        // console.log(element.tema_ID)
        if (element.dimension.nombre == "Social") {
            lista_temas.push(element.tema_ID)
        }
    });

    datos_temas.forEach(element => {
        // console.log(element.tema_ID)
        if (element.dimension.nombre == "Ambiental") {
            lista_temas.push(element.tema_ID)
        }
    });

    let contador = 0;
    //Temas Sociales
    const temas = document.querySelector('.container-cards_1');
    let outTemas = '';
    //Temas Ambientales
    const temas1 = document.querySelector('.container-cards_2');
    let outTemas1 = '';
    //cargamos la PRIMERA dimension
    datos_temas.forEach(element => {
        // console.log(element.tema_ID)
        if (element.dimension.nombre == "Social") {
            outTemas += `
                            <div class="card-dim">
                                <div class="card-imagen-dim">
                                    <img src="../imagenes/${nom_imagenes[contador]}" alt="">
                                </div>
                                <div class="card-content-dim">
                                    <p class="car-title">${element.nombre}</p>
                                    <p class="res-concept">${element.descripcion}</p>
                                    <div class="buton-comensar-dim">
                                        <a href="${enlaces_paginas[contador] + `&temas=${lista_temas}`}"
                                            class="button-dim">Comenzar</a>
                                    </div>
                                </div>
                            </div>
                `;
            contador = contador + 1;
        }
    });
    temas.innerHTML = outTemas;
    //cargamos la SEGUNDA Dimension
    datos_temas.forEach(element => {
        if (element.dimension.nombre == "Ambiental") {
            outTemas1 += `
                            <div class="card-dim">
                                <div class="card-imagen-dim">
                                    <img src="../imagenes/${nom_imagenes[contador]}" alt="">
                                </div>
                                <div class="card-content-dim">
                                    <p class="car-title">${element.nombre}</p>
                                    <p class="res-concept">${element.descripcion}</p>
                                    <div class="buton-comensar-dim">
                                        <a href="${enlaces_paginas[contador] + `&temas=${lista_temas}`}"
                                            class="button-dim">Comenzar</a>
                                    </div>
                                </div>
                            </div>
                `;
        }
    });
    temas1.innerHTML = outTemas1;
    /* Desplegar los temas por dimensiones */
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



})()

//funciones de los botones
function comezar() {
    window.location.href = `${url_global_pagina}tema_1${extencion}?usuario=${usuario_ID}&temas=${lista_temas}`;
}

function ir_evaluacion() {
    window.location.href = `${url_global_pagina}evaluacion_principal${extencion}?usuario=${usuario_ID}`;
}

function ir_reporte() {
    window.location.href = `${url_global_pagina}resultados${extencion}?usuario=${usuario_ID}`;
}

function ir_perfil() {
    window.location.href = `${url_global_pagina}perfil_usuario${extencion}?usuario=${usuario_ID}`;
}

function ir_about(){
    window.location.href = `${url_global_pagina}about${extencion}?usuario=${usuario_ID}`;
}

function salir() {
    window.location.href = `${url_global_pagina}login_encuestado${extencion}`;
}