
//Funcion para obtener los valores de la Usuario
function getGET() {
    // capturamos la url
    var loc = document.location.href;
    // si existe el interrogante
    if (loc.indexOf('?') > 0) {
        // cogemos la parte de la url que hay despues del interrogante
        var getString = loc.split('?')[1];
        // obtenemos un array con cada clave=valor
        var GET = getString.split('&');
        var get = {};
        // recorremos todo el array de valores
        for (var i = 0, l = GET.length; i < l; i++) {
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}

var valores = getGET();

// console.log(valores['usuario'])
// console.log(valores['temas'])
var lista_temas = valores['temas'].split(',')
var usuario_ID = valores['usuario'];//variable no utilizada
var encuestado_ID;
//cargamos al informacion del USUARIO 
const info_user = document.querySelector('.datos-usuario');
let out_info_user = '';
var encuestado_ID;
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
        encuestado_ID = data.encuestado.encuestado_ID;//guardamos el ID del encuestado


    })



let tema_id = lista_temas[0];
// console.log("tema ID: "+lista_temas)


//contiene la cantidad de opciones que tiene cada indicador, para luego recorrer y obtener cual  opcion esta marcado en el radio buton 
let num_preguntas_indicador = []
//Guardamos el ID de las preguntas masrcados por indicador
let id_preguntas_marcadas = [];
//para guardar los adis de los idncadores
let id_indicador = [];
//para comprar que indicadores an sido respondidos
let comprobar_boton = 0;
//total de preguntas por TEMA
let nume_preguntas_tema = 0;
//total de preguntas respondidas por Tema
let num_preguntas_respondidas_tema = 0;

//__________________________________________
async function getTemas() {
    const respuesta = await fetch(`${link_service}consultas/listarTemas`)
    const json = await respuesta.json()

    return json;
}

async function getIndicadores() {
    const respuesta = await fetch(`${link_service}consultas/listarIndicadores`)
    const json = await respuesta.json()

    return json;
}

async function getRespuestas() {
    const respuesta = await fetch(`${link_service}consultas/respuestasIndicadoresPreguntas`)
    const json = await respuesta.json()

    return json;
}

function pintar(numero_indicador){
    // console.log(numero_indicador)
    // console.log(`no-total-preguntas-respondidas-${numero_indicador}`)
    if(numero_indicador>0){
        var valor_1 = document.getElementById(`no-total-preguntas-respondidas-${numero_indicador}`).textContent
        var valor_2 = document.getElementById(`no-total-preguntas-${numero_indicador}`).textContent
        if(valor_1 == valor_2){
            document.getElementById(`no-respondido_${numero_indicador}`).style.background = "#10962d"
            document.getElementById(`no-respondido_${numero_indicador}`).style.color = "#fff"
        }
    }

}
//__________________________________________

(async function () {
    const info_temas = await getTemas()
    const info_indicadores = await getIndicadores()
    const info_preguntas_respondidas = await getRespuestas()

    let contar_temas = 1;
    let contador_temas_2 = 0;
    info_temas.forEach(element => {
        if (element.dimension.nombre == "Social") {
            // console.log(`- step_name_tema_${contar_temas}`)
            // console.log(element.nombre)
            document.getElementById(`step_name_tema_${contar_temas}`).innerHTML = element.nombre;
            contar_temas = contar_temas + 1;
        }else{
            contador_temas_2 = contador_temas_2+1;
        }

        
    });
    contar_temas = contar_temas + contador_temas_2;
    info_temas.forEach(element => {
        if (element.dimension.nombre == "Ambiental") {
            // console.log(`- step_name_tema_${contar_temas-1}`)
            // console.log(element.nombre)
            document.getElementById(`step_name_tema_${contar_temas - 1}`).innerHTML = element.nombre;
        }
    });

    info_temas.forEach(element => {
        if (tema_id == element.tema_ID) {
            document.getElementById("tema-titulo").innerHTML = element.nombre;
            document.getElementById("tema-descripcion").innerHTML = element.descripcion;
        }
    })



    let num_indicadores = 0;
    //variables para cargar los indicadores
    const cargar_indicadores = document.querySelector('.acordion');
    let outCargar_indicadores = '';

    let nombre_indicadores = [];
    let class_body_contenedor = [];
    //cargamos los nombres de los inidcadores a evaluar
    info_indicadores.forEach(element => {
        if (tema_id == element.tema.tema_ID) {
            outCargar_indicadores += `
                        <div class="accordion-item">
                            <div class="accordion-item-header" id="titulo-indicador_${num_indicadores + 1}">
                                <div class="contenido-acordion-header">
                                    ${element.nombre}
                                    <div class="respondido">
                                        <div class="si-respondido" id="si-respondido_${num_indicadores + 1}">No Respondido: <span id="si-total-preguntas-respondidas-${num_indicadores + 1}">0</span>/<span id="si-total-preguntas-${num_indicadores + 1}">30</span></div>
                                        <div class="no-respondido" id="no-respondido_${num_indicadores + 1}">Respondido: <span id="no-total-preguntas-respondidas-${num_indicadores + 1}">0</span>/<span id="no-total-preguntas-${num_indicadores + 1}">30</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item-body" id="crud-table">
                                <div class="accordion-item-body-content cargar-preguntas_${num_indicadores + 1}">
                                    <div class="preguntas">
                                        <span>hola mundo</span>
                                    </div>
                                    <div class="radio-button">
                                        <input type="radio" class="radio" name="opcion1" value="2">SI
                                        <input type="radio" class="radio" name="opcion1" value="0">NO
                                        <input type="radio" class="radio" name="opcion1" value="1">Parcialmente
                                    </div>
                                </div>
                                <div class="coment">
                                    <textarea name="" id="comentario" cols="135" rows="5" placeholder="Descripcion Indicador"></textarea>
                                </div>
                                <div class="buton-enviar">
                                    <button class="enviar" id="buton_${num_indicadores + 1}" onclick="obtener_datos_indicador(${num_indicadores + 1})">Guardar</button>
                                </div>

                            </div>
                        </div>
                    `;
            nombre_indicadores.push(element.nombre)
            class_body_contenedor.push(`cargar-preguntas_${num_indicadores + 1}`)
            num_indicadores = num_indicadores + 1;
        }
    })
    cargar_indicadores.innerHTML = outCargar_indicadores;

    //cargamos las preguntas de cada Indicador
    //console.log(class_body_contenedor)
    var contador_indicadores = 0;
    var opciones = 0;
    let IDs_preguntas_respondidas = []
    info_indicadores.forEach(element => {
        var contador = 0;
        var cont = 1;
        var variable = `cargar-preguntas_${contador_indicadores + 1}`;
        var variable_preguntas_indicador_no_1 = `no-total-preguntas-${contador_indicadores + 1}`;
        var variable_preguntas_indicador_no_2 = `no-total-preguntas-respondidas-${contador_indicadores + 1}`;
        var variable_preguntas_indicador_si_1 = `si-total-preguntas-${contador_indicadores + 1}`;
        var variable_preguntas_indicador_si_2 = `si-total-preguntas-respondidas-${contador_indicadores + 1}`;
        const preguntas = document.querySelector("." + variable);
        let outPreguntas = '';
        var contador_cargar_posicion = -3;
        //variables usadas  para guardar respuestas
        let num_preguntas_ind = 0;//para contar las preguntas(numero de opciones por cada indicador)
        let id_preguntas = [];//para guardar los ID de las preguntas de cada indicador 
        let id_ind;//para guardar los IDs de los Indicadore
        let total_preguntas_respondidas = 0;
        if (element.nombre == nombre_indicadores[contador_indicadores]) {
            //console.log(element.nombre)
            opciones = opciones + 1;
            element.preguntas_cualitativas.forEach(pregunta => {
                //console.log("----  "+pregunta.pregunta_cualitativa)
                outPreguntas += `
                                    <div class="preguntas">
                                        <span>${cont}.</span>
                                        <span>${pregunta.pregunta_cualitativa}</span>
                                    </div>
                                
                                    <div class="radio-button">
                                        <div><input type="radio" id="opcion_${opciones}${contador + 1}"  name="opcion_${opciones}${cont}" value="2"><span>SI</span></div>
                                        <div><input type="radio" id="opcion_${opciones}${contador + 2}"  name="opcion_${opciones}${cont}" value="0"><span>NO</span></div>
                                        <div><input type="radio" id="opcion_${opciones}${contador + 3}"  name="opcion_${opciones}${cont}" value="1"><span>Parcialmente</span></div>
                                    </div>
                                    `;
                contador = contador + 3;
                cont = cont + 1;
                var opcion_ingresada = opciones;
                num_preguntas_ind = contador;
                id_ind = element.indicador_ID;//guardamos el ID del idicador
                id_preguntas.push(pregunta.pregunta_Cualitativa_ID)//guardamos el ID PREGUNTAS
                nume_preguntas_tema = nume_preguntas_tema + 1; //para obtener el total de pregunats por TEMA
                contador_cargar_posicion = contador_cargar_posicion + 3;
                info_preguntas_respondidas.forEach(element_guardas_1 => {
                    if (element_guardas_1.respuestasaIndicadores.indicador.nombre == element.nombre && element_guardas_1.respuestasaIndicadores.encuestado.encuestado_ID == encuestado_ID) {//comparamos el indicador y el usuario par saber que indicador ya a respondido 
                        if (pregunta.pregunta_cualitativa == element_guardas_1.preguntasCualitativas.pregunta_cualitativa) {//comparamos si la pregunta se encuentra dentro de preguntas respondidas
                            //console.log(element_guardas_1.preguntasCualitativas.pregunta_cualitativa+":    "+element_guardas_1.respuesta
                            //ocultar el boton del indicador respondido
                            // console.log(contador_indicadores)
                            let boton = document.getElementById(`buton_${contador_indicadores + 1}`);
                            boton.style.display = "none";
                            total_preguntas_respondidas = total_preguntas_respondidas + 1;
                            //cambiar los valores de las pregunats respondidasa por indicador
                            document.getElementById(variable_preguntas_indicador_no_2).innerHTML = total_preguntas_respondidas;
                            document.getElementById(variable_preguntas_indicador_si_2).innerHTML = total_preguntas_respondidas;
                            //cambiar el estado de no respondido a respondido y viseversa
                            let respondido_no = document.getElementById(`no-respondido_${contador_indicadores + 1}`);
                            let respondido_si = document.getElementById(`si-respondido_${contador_indicadores + 1}`);
                            respondido_no.style.display = "block";
                            respondido_si.style.display = "none";
                            num_preguntas_respondidas_tema = num_preguntas_respondidas_tema + 1
                            document.getElementById("total-preguntas-tema-respondidas").innerHTML = num_preguntas_respondidas_tema;
                            if (element_guardas_1.respuesta == 1) {
                                IDs_preguntas_respondidas.push(`#opcion_${opcion_ingresada}` + (contador_cargar_posicion + 3))
                                //document.querySelector(`#opcion_${opcion_ingresada}` + (contador_cargar_posicion + 3)).checked = true;
                            } if (element_guardas_1.respuesta == 2) {
                                IDs_preguntas_respondidas.push(`#opcion_${opcion_ingresada}` + (contador_cargar_posicion + 1))
                                //document.querySelector(`#opcion_${opcion_ingresada}` + (contador_cargar_posicion + 1)).checked = true;
                            } if (element_guardas_1.respuesta == 0) {
                                IDs_preguntas_respondidas.push(`#opcion_${opcion_ingresada}` + (contador_cargar_posicion + 2))
                                //document.querySelector(`#opcion_${opcion_ingresada}` + (contador_cargar_posicion + 2)).checked = true;
                            }
                        }

                    }
                });
            })
            contador_indicadores = contador_indicadores + 1;
            //console.log(contador_indicadores)

        }
        //console.log(nombre_indicadores.length)
        //console.log(variable)

        if (class_body_contenedor.includes(variable)) {
            // console.log("---   "+variable)
            //para mostrar el numero de preguntas que tiene cada indicador
            document.getElementById(variable_preguntas_indicador_no_1).innerHTML = cont - 1;
            document.getElementById(variable_preguntas_indicador_si_1).innerHTML = cont - 1;
            pintar(contador_indicadores)
            if (num_preguntas_ind > 0) {//para que no ingrese valores ceros
                num_preguntas_indicador.push(num_preguntas_ind)//guardamos el numero de preguntas de cada indicador, es decir, la cantidad de opciones por cada Indicador
                //nos permite determinar indicadores respondidos y no respondidos
                comprobar_boton = comprobar_boton + 1
                var comprobar = comprobar_boton
            }
            if (id_preguntas.length > 0) {//para que solo arrays que contiene datos 
                id_preguntas_marcadas.push(id_preguntas)//guardamos el id de cada una de lass preguntas de cada indicador, para luego guardar en BD este ID de acuerdo las preguntas que el usuario haya selecionado
            }
            if (id_ind != null) {//para que no ingrese ID nullo
                id_indicador.push(id_ind)//guardamos el ID de cada Indicador, para luego guardar de acuerdo a lass preguntas que el usuario aya selecionado por indicador
            }
            preguntas.innerHTML = outPreguntas;
        }

    })

    //console.log(num_preguntas_indicador)
    //console.log(num_indicadores)
    //console.log(data)
    //console.log(nombre_indicadores[0])
    document.getElementById("total-preguntas-tema").innerHTML = nume_preguntas_tema;

    for (i = 0; i < IDs_preguntas_respondidas.length; i++) {
        document.querySelector(IDs_preguntas_respondidas[i]).checked = true;
    }

    setTimeout(() => {
        //tutorial de funcion: https://www.youtube.com/watch?v=rKK1q7nFt7M
        //________________________________ACORDION_______________________________________
        const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");
        // tutorial del acordiong en youtube: https://www.youtube.com/watch?v=dr8Emho-kYo&t=15s
        accordionItemHeaders.forEach(accordionItemHeader => {
            accordionItemHeader.addEventListener("click", event => {

                // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

                const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
                if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
                    currentlyActiveAccordionItemHeader.classList.toggle("active");
                    currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
                }

                accordionItemHeader.classList.toggle("active");
                const accordionItemBody = accordionItemHeader.nextElementSibling;
                if (accordionItemHeader.classList.contains("active")) {
                    accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
                }
                else {
                    accordionItemBody.style.maxHeight = 0;
                }

            });
        });
    }, 1500)

})()

//Ingresa el ID del indicador Respondido
async function setRespuestasIndicador(numero) {
    await fetch(`${link_service}consultas/insertarRespuestasIndicadores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            encuestado: {
                encuestado_ID: encuestado_ID
            },
            indicador: {
                indicador_ID: id_indicador[numero - 1]
            }
        })
    })
}
//luego de ingresar el indicador Obtenemos el ID Ingresado 
async function getIdIndicador() {
    const respuesta = await fetch(`${link_service}consultas/respuestasIndicadores`)
    const data = await respuesta.json()

    await data.sort(function (a, b) {
        return a.respuestas_Indicadores_ID - b.respuestas_Indicadores_ID;
    });
    let id_indicador_ingresado = data[data.length - 1].respuestas_Indicadores_ID;//Obtenemso el ID del Ultimo Indicador Ingresado

    return id_indicador_ingresado;
}
//ingresamos cada una de las preguntas
async function setPreguntas(id_indicador, id_pregunta, respuesta_numerica) {
    await fetch(`${link_service}consultas/insertarIndicadoresPreguntas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            respuestasaIndicadores: {
                respuestas_Indicadores_ID: id_indicador//es el ID del ultimo indicador INgresado
            },
            preguntasCualitativas: {
                pregunta_Cualitativa_ID: id_pregunta//id pregunta respondida
            },
            respuesta: respuesta_numerica//ingresamos la respuesta de la pregunta respondida (ID pregunta)
        })
    })
}


function syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while ((end - start) < milliseconds) {
        end = new Date().getTime();
    }
}
function obtener_datos_indicador(numero) {
    // console.log(num_preguntas_indicador)
    // console.log(id_preguntas_marcadas)
    // console.log(id_indicador)

    let posicione_preguntas = [];
    let valores_preguntas = [];
    let cantidad_preguntas = 0;//total de preguntas respondidas
    //Obtenemos las preguntas que el Usuario MARCO
    //es decir, obtenemos el valor y la pocicion de la pregunta para luego por medio de "id_preguntas_marcadas" obtener el ID de la pregunta 
    for (i = 1; i <= num_preguntas_indicador[numero - 1]; i++) {
        if (document.getElementById(`opcion_${numero}` + i).checked == true) {
            //__________
            let j = 0;
            let posciones = 0;
            let val = 0;
            while (j <= num_preguntas_indicador[numero - 1]) {
                if ((i <= (j + 3)) && (val == 0)) {
                    val = 1;
                    posicione_preguntas.push(posciones)//posicion de la pregunta respondida
                }
                posciones = posciones + 1;
                j = j + 3;
            }
            //__________
            let dato1 = document.getElementById(`opcion_${numero}` + i).value;
            valores_preguntas.push(dato1)//VALOR de la pregunta respondida
            cantidad_preguntas = cantidad_preguntas + 1;//obtenemos total de preguntas por indicador
        }
    }
    //cambir el nuemro de pregunta respondidas en el indicador
    document.getElementById(`no-total-preguntas-respondidas-${numero}`).innerHTML = cantidad_preguntas;
    document.getElementById(`si-total-preguntas-respondidas-${numero}`).innerHTML = cantidad_preguntas;
    //cambiar el numero toatal de preguntas respondidas
    num_preguntas_respondidas_tema = num_preguntas_respondidas_tema + cantidad_preguntas
    document.getElementById("total-preguntas-tema-respondidas").innerHTML = num_preguntas_respondidas_tema;

    //console.log(posicione_preguntas)
    //console.log(valores_preguntas)
    if (cantidad_preguntas > 0) {
        //cambiamos el boton, es decir, ocultamos el boton luego de aber respondido un indicador 
        document.getElementById(`buton_${numero}`).style.display = "none";
        //cambiar el estado de no respondido a respondido y viseversa
        document.getElementById(`no-respondido_${numero}`).style.display = "block";
        document.getElementById(`si-respondido_${numero}`).style.display = "none";
        //invocamos cada una de las funciones para ingreesar
        (async function () {
            pintar(numero)
            await setRespuestasIndicador(numero)//llamos a la funcion que ingrese el ID del indicador respondido
            const id_indicador_respondido = await getIdIndicador();//obtenemos el ultimo inidcador respondido
            //recorremos las lisa de pregunatas
            for (i = 0; i < posicione_preguntas.length; i++) {
                await setPreguntas(id_indicador_respondido, id_preguntas_marcadas[numero - 1][posicione_preguntas[i]], valores_preguntas[i])
            }
        })()
        swal("Datos registrados correctamente.");
    } else {
        swal("Por favor seleccione una pregunta antes de guardar.");
    }
}

//Botones
function siguiente() {
    window.location.href = `${url_global_pagina}tema_2${extencion}?usuario=${usuario_ID}&temas=${lista_temas}`;

}

function atras() {
    window.location.href = `${url_global_pagina}evaluacion_principal${extencion}?usuario=${usuario_ID}`;
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

function ir_about(){
    window.location.href = `${url_global_pagina}about${extencion}?usuario=${usuario_ID}`;
}

function salir() {
    window.location.href = `${url_global_pagina}login_encuestado${extencion}`;
}
