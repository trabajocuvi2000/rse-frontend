
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
//cargamos al informacion del USUARIO 
const info_user = document.querySelector('.datos-usuario');
let out_info_user = '';
var encuestado_ID;
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
        encuestado_ID = data.encuestado.encuestado_ID;//guardamos el ID del encuestado


    })

//obtenemos el id del tema
let index_temas = lista_temas[parseInt(lista_temas.length - 1)];
// console.log(index_temas)
let tema_id = lista_temas[index_temas];
// cargamos la IMAGEN 
// let nom_imagenes = ['tema_practicas_trabajo_2.jpg', 'tema_derechos_humanos_2.png', 'tema_comunidad_desarrollo_2.jpg', 'tema_cuestiones_relacionadas_consumidor_2.jpg', 'medio_ambiente.jpg'];
// let nom_imagenes = ['Derechos_Humanos.jpg', 'Trabajadores.jpg', 'cuestiones_relacionadas_consumidor.jpg', 'participacion_comunidad_desarrollo.jpg', 'medio_ambiente.jpg'];
// document.querySelector('.card-imagen').innerHTML = `<img src="../imagenes/${nom_imagenes[index_temas]}" alt="">`
// cambiamos el contenidod del btn SIGUIENTE 
function cambiar_btn_siguiete() {
    console.log(index_temas + '   ' + (lista_temas.length - 2))
    if (index_temas == (lista_temas.length - 2)) {
        document.querySelector('.btn-siguiente').innerHTML = 'Finalizar';
    }
}
cambiar_btn_siguiete();// llamos a la funcion para cambiar el contenido del boton siguiente

function pintar_steps() {
    for (i = 0; i <= parseInt(index_temas); i++) {
        if (i <= 0) {
            var step = document.getElementById(`step-counter-${i + 1}`)
            step.classList.add("active");
        } else {
            var step = document.getElementById(`step-counter-${i + 1}`)
            step.classList.add("active");
            var step_barra = document.getElementById(`stepper-item-${i}`)
            step_barra.classList.add("active");
        }

        // console.log(i+1)
    }
}

//contiene la cantidad de opciones (radio button) que tiene cada container de cada indicador, para luego recorrer y obtener cual  opcion esta marcado en el radio buton 
let num_preguntas_indicador = []
//Guardamos el ID de todas las preguntas marcadas y no marcadas
let id_preguntas_marcadas = [];
//Guarda los IDs de los indicadores
let id_indicador = [];

// ___________________________________
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
    const respuesta = await fetch(`${link_service}consultas/respuestasIndicadoresPreguntas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        }
    })
    const json = await respuesta.json()

    return json;
}
// ___________________________________
// funcion para cargar las respuestas del usuario 
let IDs_preguntas_respondidas = [];
let num_preguntas_responidas_por_indicador = 0;
function recuperar_reespuestas_usuario(info_preguntas_respondidas, nombre_indicador, pregunta_respondida, opcion_ingresada, contador_cargar_posicion) {
    // console.log(nombre_indicador)
    info_preguntas_respondidas.forEach(repuetas_guardadas => {//recorremos todas las respuestas
        //comparamos el indicador y el usuario para saber que indicador ha sido respondido 
        if (repuetas_guardadas.respuestasaIndicadores.indicador.nombre == nombre_indicador && repuetas_guardadas.respuestasaIndicadores.encuestado.encuestado_ID == encuestado_ID) {
            // console.log("--    " + repuetas_guardadas.respuestasaIndicadores.encuestado.encuestado_ID + repuetas_guardadas.preguntasCualitativas.pregunta_cualitativa + ":    " + repuetas_guardadas.respuesta)
            // document.querySelector(`#opcion_11`).checked = true;
            if (pregunta_respondida == repuetas_guardadas.preguntasCualitativas.pregunta_cualitativa) {
                // console.log("--    " + repuetas_guardadas.respuestasaIndicadores.encuestado.encuestado_ID + repuetas_guardadas.preguntasCualitativas.pregunta_cualitativa + ":    " + repuetas_guardadas.respuesta)
                num_preguntas_responidas_por_indicador = num_preguntas_responidas_por_indicador + 1;
                if (repuetas_guardadas.respuesta == 1) { // parcial 
                    IDs_preguntas_respondidas.push(`#opcion_${opcion_ingresada}` + (contador_cargar_posicion + 2))
                } if (repuetas_guardadas.respuesta == 2) { // si
                    IDs_preguntas_respondidas.push(`#opcion_${opcion_ingresada}` + (contador_cargar_posicion + 1))
                } if (repuetas_guardadas.respuesta == 0) { // no
                    IDs_preguntas_respondidas.push(`#opcion_${opcion_ingresada}` + (contador_cargar_posicion + 3))
                } if (repuetas_guardadas.respuesta == -1) {// no aplica
                    IDs_preguntas_respondidas.push(`#opcion_${opcion_ingresada}` + (contador_cargar_posicion + 4))
                }
            }
            //para cargar el comentario previamente guardado 
            if (repuetas_guardadas.respuestasaIndicadores.cometario_usuario != null) {
                document.getElementById(`comentario_${opcion_ingresada}`).innerHTML = repuetas_guardadas.respuestasaIndicadores.cometario_usuario;
            }
        }

    })
}

function cargar_respuestas_usuario() {
    for (i = 0; i < IDs_preguntas_respondidas.length; i++) {
        document.querySelector(IDs_preguntas_respondidas[i]).checked = true;
    }
}

function pintar(numero_indicador) {
    // console.log(numero_indicador)
    // console.log(`no-total-preguntas-respondidas-${numero_indicador}`)
    if (numero_indicador > 0) {
        var preguntas_respondidas = parseInt(document.getElementById(`si-total-preguntas-respondidas-${numero_indicador}`).textContent)
        var preguntas = parseInt(document.getElementById(`si-total-preguntas-${numero_indicador}`).textContent)
        if (preguntas_respondidas == preguntas) {
            document.getElementById(`si-respondido_${numero_indicador}`).style.background = "#10962d"
            document.getElementById(`si-respondido_${numero_indicador}`).style.color = "#fff"
            document.getElementById(`texto-respondido-${numero_indicador}`).innerHTML = "Respondido: "
        } else if (preguntas_respondidas < preguntas && preguntas_respondidas != 0) {
            document.getElementById(`si-respondido_${numero_indicador}`).style.background = "yellow"
            document.getElementById(`si-respondido_${numero_indicador}`).style.color = "#000"
            document.getElementById(`texto-respondido-${numero_indicador}`).innerHTML = "Respondido: "
        }
    }
}

function caragar_info_tema(tema_id) {
    (async function () {
        const info_temas = await getTemas();
        const info_indicadores = await getIndicadores();
        const info_preguntas_respondidas = await getRespuestas();

        //cargamos la informacion el el CARD 
        info_temas.forEach(element => {
            if (tema_id == element.tema_ID) {
                document.getElementById("tema-titulo").innerHTML = element.nombre;
                document.getElementById("tema-descripcion").innerHTML = element.descripcion;
                document.querySelector('.card-imagen').innerHTML = `<img src="${element.img_enlace}" alt="">`

            }
        })

        // creamos los steps 
        const lista_temas_spteps = document.querySelector('.stepper-wrapper')
        let outLista_temas_spteps = ''
        let num_temas = 1;
        for (j = 0; j < lista_temas.length; j++) {
            info_temas.forEach(element => {
                if (lista_temas[j] == element.tema_ID) {
                    // console.log(element.nombre)
                    outLista_temas_spteps += `
                                    <div class="stepper-item" id="stepper-item-${num_temas}">
                                        <div class="step-counter" id="step-counter-${num_temas}">${num_temas}</div>
                                        <div id="step_name_tema_${num_temas}" class="step-name">
                                            ${element.nombre}
                                        </div>
                                    </div>
                    `;
                    num_temas = num_temas + 1;
                }

            })
        }
        lista_temas_spteps.innerHTML = outLista_temas_spteps;
        pintar_steps()//pintamos los stepss
        //cargamos los Indicaafores en el acordion 
        const cargar_indicadores = document.querySelector('.acordion');
        let outCargar_indicadores = '';

        let num_indicadores = 0;//para tener un conteo de cuantos indicadores hay
        let nombre_indicadores = [];// contiene el nombre de los indicadores
        let clase_cada_indicador = []; // contine el nombre de cada indicador 
        info_indicadores.forEach(element => {
            if (tema_id == element.tema.tema_ID) {
                outCargar_indicadores += `
                        <div class="accordion-item">
                            <div class="accordion-item-header" id="titulo-indicador_${num_indicadores + 1}">
                                <div class="contenido-acordion-header">
                                    ${element.nombre}
                                    <div class="respondido">
                                        <div class="si-respondido" id="si-respondido_${num_indicadores + 1}"><span id="texto-respondido-${num_indicadores + 1}">No Respondido: </span><span id="si-total-preguntas-respondidas-${num_indicadores + 1}">0</span>/<span id="si-total-preguntas-${num_indicadores + 1}">30</span></div>
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
                                    <textarea name="" id="comentario_${num_indicadores + 1}" cols="135" rows="5" placeholder="Comentario"></textarea>
                                </div>
                                <div class="buton-enviar">
                                    <button class="enviar" id="buton_${num_indicadores + 1}" onclick="obtener_datos_indicador(${num_indicadores + 1})"><span class="guardar-preguntas-indicador-${num_indicadores + 1}">Guardar</span></button>
                                </div>

                            </div>
                        </div>
                    `;
                clase_cada_indicador.push(`.cargar-preguntas_${num_indicadores + 1}`)
                nombre_indicadores.push(element.nombre)
                id_indicador.push(element.indicador_ID)
                num_indicadores = num_indicadores + 1;

            }
        })
        // console.log(clase_cada_indicador)
        cargar_indicadores.innerHTML = outCargar_indicadores;

        // Cargamos las PREGUNTAS de cada indicador
        var contador_indicadores = 0;
        var opciones = 0;//para cambir de numero en cada INIDCADOR
        var cantidad_preguntas = 0;
        info_indicadores.forEach(element => {
            num_preguntas_responidas_por_indicador = 0
            if (element.nombre == nombre_indicadores[contador_indicadores]) {
                // console.log(nombre_indicadores[contador_indicadores])
                // console.log(clase_cada_indicador[contador_indicadores])
                //para obtener la el conteiner de cada indicador
                const preguntas = document.querySelector(clase_cada_indicador[contador_indicadores]);
                let outPreguntas = `
                <div class="options">
                    <div class="questions">
                        <span>Preguntas</span>
                    </div>
                    <div class="si-no-parcial-no-aplica">
                        <div class="div">Si</div>
                        <div class="div">Parcial</div>
                        <div class="div">No</div>
                        <div class="div">No Aplica</div>
                    </div>
                </div>
                `;
                var cont = 1;
                var contador = 0;
                // let preguntas_cargadas = [] // para grardar las preguntas cargadas
                let lista_IDs_preguntas = [];
                if (element.nombre == nombre_indicadores[contador_indicadores]) {
                    opciones = opciones + 1;

                    //recorremos las preguntas de cada indicador
                    element.preguntas_cualitativas.forEach(pregunta => {
                        outPreguntas += `
                                    <div class="preguntas">
                                        <span>${cont}.</span>
                                        <span>${pregunta.pregunta_cualitativa}</span>
                                    </div>
                                
                                    <div class="radio-button">
                                        <div><input type="radio" id="opcion_${opciones}${contador + 1}"  name="opcion_${opciones}${cont}" value="2"></div>
                                        <div><input type="radio" id="opcion_${opciones}${contador + 2}"  name="opcion_${opciones}${cont}" value="1"></div>
                                        <div><input type="radio" id="opcion_${opciones}${contador + 3}"  name="opcion_${opciones}${cont}" value="0"></div>
                                        <div><input type="radio" id="opcion_${opciones}${contador + 4}"  name="opcion_${opciones}${cont}" value="-1"></div>
                                    </div>
                                    `;
                        //recuperamos las respuestas del usuario y guardamos los IDs de opciones 
                        recuperar_reespuestas_usuario(info_preguntas_respondidas, element.nombre, pregunta.pregunta_cualitativa, opciones, contador);
                        contador = contador + 4;
                        cont = cont + 1;
                        cantidad_preguntas = cantidad_preguntas + 1;
                        lista_IDs_preguntas.push(pregunta.pregunta_Cualitativa_ID)
                        // preguntas_cargadas.push(pregunta.pregunta_cualitativa)
                    });
                }
                num_preguntas_indicador.push(contador)// guardamos el numeor de opciones de cada indicador
                id_preguntas_marcadas.push(lista_IDs_preguntas)// guardamos los IDs de las preguntas
                // para mostrar las preguntas respondidas por indicador
                document.getElementById(`si-total-preguntas-respondidas-${contador_indicadores + 1}`).innerHTML = num_preguntas_responidas_por_indicador;
                // para mostrar el totla de preguntas en cada indicador
                document.getElementById(`si-total-preguntas-${contador_indicadores + 1}`).innerHTML = cont - 1;
                // para alterar los cuadros que contienen las cantidad de preguntas respondidas y no respondidas
                pintar(contador_indicadores + 1)
                //cargamos las preguntas en container de acuerdo a cada indicador
                preguntas.innerHTML = outPreguntas;
                contador_indicadores = contador_indicadores + 1;
                //cargamos las respuestas 
                // console.log(preguntas_cargadas)

            }
        })
        // mostramos el total de preguntas
        document.getElementById('total-preguntas-tema').innerHTML = cantidad_preguntas;
        // mostramos el total de preguntas respondidas
        document.getElementById('total-preguntas-tema-respondidas').innerHTML = IDs_preguntas_respondidas.length;
        // console.log(IDs_preguntas_respondidas)
        //cargamos las respuestas del usuario 
        cargar_respuestas_usuario();
        // _______________________ ACORDION Inicio _____________________
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
        // _______________________ ACORDION Fin _____________________

    })()

}

caragar_info_tema(tema_id)

//___________________________________________________________
//Ingresa el ID del indicador Respondido
async function setRespuestasIndicador(numero, comentario_usuario) {
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
            },
            cometario_usuario: comentario_usuario
        })
    })
}
//Actualizar el comentario del indicador
async function putRespuestasIndicador(numero, id_respuestas_indicador, id_encuestado, id_indicador_respondido, comentario_nuevo) {
    await fetch(`${link_service}consultas/actualizarRespuestasIndicadores/${id_respuestas_indicador}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            encuestado: {
                encuestado_ID: id_encuestado
            },
            indicador: {
                indicador_ID: id_indicador_respondido
            },
            cometario_usuario: comentario_nuevo
        })
    })
}
//luego de ingresar el indicador Obtenemos el ID Ingresado 
async function getIdIndicador() {
    const respuesta = await fetch(`${link_service}consultas/respuestasIndicadores`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        }
    })
    const data = await respuesta.json()

    await data.sort(function (a, b) {
        return a.respuestas_Indicadores_ID - b.respuestas_Indicadores_ID;
    });
    let id_indicador_ingresado = data[data.length - 1].respuestas_Indicadores_ID;//Obtenemso el ID del Ultimo Indicador Ingresado

    return id_indicador_ingresado;
}

// obtenemos todos los indicadores previamente registrados 
async function getIndicadoresPreviamenteRespondidos() {
    const respuesta = await fetch(`${link_service}consultas/respuestasIndicadores`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        }
    })
    const data = await respuesta.json()

    return data;
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

//___________________________________________________________
// actualizamos la pregunta con el nuevo valor 
async function putPreguntas(id_pregunta_acualizar, id_indicador, id_pregunta, respuesta_numerica) {
    await fetch(`${link_service}consultas/actualizarRespuestasIndicadoresPregutas/${id_pregunta_acualizar}`, {
        method: 'PUT',
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
let auxiliar_2 = 0; // para que solo una ves actualice el comentario del inidcador 
function encontrar_pregunta(informacion_preguntas_respondidas, id_indicador_ingresado, id_respuesta, respuesta, numero) {
    (async function () {
        // comparamos el usuario 
        let auxiliar = 0;
        informacion_preguntas_respondidas.forEach(repuetas_guardadas => {//recorremos todas las respuestas
            //comparamos id de la respuesta y el usuario para que sea unico
            if (parseInt(repuetas_guardadas.preguntasCualitativas.pregunta_Cualitativa_ID) == parseInt(id_respuesta) && repuetas_guardadas.respuestasaIndicadores.encuestado.encuestado_ID == encuestado_ID) {
                if (repuetas_guardadas.respuesta == respuesta) {
                    console.log('ID: ' + repuetas_guardadas.respuestas_Indicadores_Preguntas_ID + '   NO INGRESAR NI ACTUALIZAR "ya existe": ' + repuetas_guardadas.preguntasCualitativas.pregunta_Cualitativa_ID + '     ' + respuesta + ' Indicador ID: ' + repuetas_guardadas.respuestasaIndicadores.respuestas_Indicadores_ID)
                    auxiliar = 1;
                } else {
                    var id_pregunta_actulizar = repuetas_guardadas.respuestas_Indicadores_Preguntas_ID;
                    var id_pregunta = id_respuesta;
                    var new_respuesta = respuesta;
                    var id_indicador = repuetas_guardadas.respuestasaIndicadores.respuestas_Indicadores_ID;
                    // var id_indicador = repuetas_guardadas.respuestasaIndicadores.indicador.indicador_ID;
                    console.log('ID: ' + id_pregunta_actulizar + '      Actualizando...   ' + id_pregunta + ': ' + new_respuesta + ' Indicador ID: ' + id_indicador)
                    auxiliar = 1;
                    (async function () {
                        await putPreguntas(id_pregunta_actulizar, id_indicador, id_pregunta, new_respuesta);
                    })()
                }

                var comentario_nuevo = document.getElementById(`comentario_${numero}`).value;
                if (repuetas_guardadas.respuestasaIndicadores.cometario_usuario != comentario_nuevo && auxiliar_2 == 0) {
                    var id_respuestas_indicador = repuetas_guardadas.respuestasaIndicadores.respuestas_Indicadores_ID;
                    var id_encuestado = repuetas_guardadas.respuestasaIndicadores.encuestado.encuestado_ID;
                    var id_indicador_respondido = repuetas_guardadas.respuestasaIndicadores.indicador.indicador_ID;
                    var comentario_previo = repuetas_guardadas.respuestasaIndicadores.cometario_usuario; // este valor no lo utilizo
                    // console.log(repuetas_guardadas.respuestasaIndicadores.respuestas_Indicadores_ID)//id del respueatas_indicador
                    // console.log(repuetas_guardadas.respuestasaIndicadores.encuestado.encuestado_ID)// id encuestado
                    // console.log(repuetas_guardadas.respuestasaIndicadores.indicador.indicador_ID) // id indicador respondido
                    // console.log(repuetas_guardadas.respuestasaIndicadores.cometario_usuario) // comentario previo 
                    (async function () {
                        console.log("-------- > Actualizando comentario...")
                        auxiliar_2 = 1;
                        await putRespuestasIndicador(numero, id_respuestas_indicador, id_encuestado, id_indicador_respondido, comentario_nuevo);
                    })()
                }
            }

        })

        if (auxiliar == 0) {
            console.log('INGRESAR: ' + id_respuesta + ': ' + respuesta + ' Indicador ID: ' + id_indicador[numero - 1])
            //recorremos las lisa de pregunatas
            await setPreguntas(id_indicador_ingresado, id_respuesta, respuesta)
        }
        // swal("Datos registrados correctamente.");
    })()

}

function obtener_datos_indicador(numero) {
    (async function () {
        // para mostrar el modal cargando 
        //___________________
        var auxiliar_modal = 0;
        mostrar_modal_cargando();
        //___________________
        document.querySelector(`.guardar-preguntas-indicador-${numero}`).innerHTML = 'Guardando...'
        // obtenemos el comentario del textarea
        var comentario_usuario = document.getElementById(`comentario_${numero}`).value;
        console.log(comentario_usuario);

        // obtenemos de nuevo las preguntas ya registradas 
        const informacion_preguntas_respondidas = await getRespuestas();;
        console.log(num_preguntas_indicador) // cantidad de pregunats por inidcador
        console.log(id_preguntas_marcadas)  // contine todos los IDs de todas las preguntas masrcadas y no marcadas
        console.log(id_indicador) // contiene ID de todos los indicadores en la pgina

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
                    if ((i <= (j + 4)) && (val == 0)) {
                        val = 1;
                        posicione_preguntas.push(posciones)//posicion de la pregunta respondida
                    }
                    posciones = posciones + 1;
                    j = j + 4;
                }
                //__________
                let dato1 = document.getElementById(`opcion_${numero}` + i).value;
                valores_preguntas.push(dato1)//VALOR de la pregunta respondida
                cantidad_preguntas = cantidad_preguntas + 1;//obtenemos total de preguntas por indicador
            }
        }

        console.log(posicione_preguntas)
        console.log(valores_preguntas)
        console.log('________________________')
        document.getElementById(`si-total-preguntas-respondidas-${numero}`).innerHTML = cantidad_preguntas;
        pintar(numero)

        if (cantidad_preguntas > 0) {
            //
            const info_indicadores_respondidos = await getIndicadoresPreviamenteRespondidos();
            var aux = 0
            var id_indicador_ingresado;
            info_indicadores_respondidos.forEach(element => {
                if (element.encuestado.encuestado_ID == encuestado_ID && element.indicador.indicador_ID == id_indicador[numero - 1]) {
                    aux = 1;
                    id_indicador_ingresado = element.respuestas_Indicadores_ID;
                    // console.log(id_indicador_ingresado)
                }
            })

            if (aux == 1) {
                auxiliar_2 = 0; // para validar que solo una ves actualice el comentario del indicador
                console.log('YA existe: ', id_indicador[numero - 1])
                for (i = 0; i < posicione_preguntas.length; i++) {
                    // console.log(id_preguntas_marcadas[numero - 1][posicione_preguntas[i]] + ': ' + valores_preguntas[i])
                    encontrar_pregunta(informacion_preguntas_respondidas, id_indicador_ingresado, id_preguntas_marcadas[numero - 1][posicione_preguntas[i]], valores_preguntas[i], numero)
                }
            } else {
                console.log('NO existe: ', id_indicador[numero - 1])
                await setRespuestasIndicador(numero, comentario_usuario)//llamos a la funcion que ingrese el ID del indicador respondido, y ademas si existe que ingrese el comentario
                const id_indicador_respondido = await getIdIndicador();//obtenemos el ultimo inidcador respondido
                //recorremos las lisa de pregunatas
                for (i = 0; i < posicione_preguntas.length; i++) {
                    await setPreguntas(id_indicador_respondido, id_preguntas_marcadas[numero - 1][posicione_preguntas[i]], valores_preguntas[i])
                }
                // swal("Datos registrados correctamente.");


            }
        } else {
            // swal("Por favor seleccione al menos una pregunta..");
            auxiliar_modal = 1;
            registrado_incompleto();
        }
        document.querySelector(`.guardar-preguntas-indicador-${numero}`).innerHTML = 'Guardar';
        // para mostrar el modal 
        if (auxiliar_modal == 0) {
            registrado_completo();
        }
    })()
}

//Botones
let siguiente_tema = 0;
function siguiente() {
    siguiente_tema = parseInt(index_temas) + 1;
    console.log(siguiente_tema)
    if (siguiente_tema < lista_temas.length - 1) {
        lista_temas.pop()// eliminamos el ultimo elemento del array
        lista_temas.push(siguiente_tema) // agregamos el siguiente

        window.location.href = `${url_global_pagina}tema_1${extencion}?usuario=${usuario_ID}&temas=${lista_temas}`;
    } else {
        window.location.href = `${url_global_pagina}resultados${extencion}?usuario=${usuario_ID}`;
    }

}

function atras() {
    siguiente_tema = parseInt(index_temas) - 1;
    console.log(siguiente_tema)
    if (siguiente_tema >= 0) {
        console.log('____________________________')
        lista_temas.pop()// eliminamos el ultimo elemento del array
        lista_temas.push(siguiente_tema) // agregamos el siguiente

        window.location.href = `${url_global_pagina}tema_1${extencion}?usuario=${usuario_ID}&temas=${lista_temas}`;
    } else {
        window.location.href = `${url_global_pagina}evaluacion_principal${extencion}?usuario=${usuario_ID}`;
    }
    // window.location.href = `${url_global_pagina}evaluacion_principal${extencion}?usuario=${usuario_ID}`;
}

function ir_estadnar_referencia() {
    window.open("https://www.iarse.org/uploads/Indicadores%20Ethos-%20IARSE%20v3.1%202017.pdf", '_blank');
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
