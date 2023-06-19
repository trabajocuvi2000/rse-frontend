let resutaldo_final;//tiene el resultado final del algoritmo
let objeto_resp;//objeto para guardar los resulatados de las dimensiones, temas e indicadores 
let respuesta_final_2;
let objeto_resp_2;

let objeto_datos_evaluacion_graficas;// contiene la informacion de la evaluacion para las graficas 
let objeto_datos_evaluacion_graficas_COMPLETA; // coontitine la informacion de la evalucion completa para las graficas 
//Obtenemos el USUARIO de la URL
function obtener_valor(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



var usuario_ID = obtener_valor("usuario");//OBtenemos el ID de la URLs
// console.log(usuario_ID)
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

var valor_minimo = [];
var valor_maximo = [];
var valor_real = [];
var indicadores_tema = [];//cantidad de indicadores por tema 
let tema_dimension = [4, 1];//***********************NUMERO DE TEMAS POR DIMENSION */
//______________OBTENER INFORMACION (creamos un objeto con toda la informaicion respecto a las respuestas del Usuaio)______________________
const objeto_respuestas = [];
const objeto_respuestas_new = [];
let auxiliar = 0;
//________________________________________--
async function getRespuetasIndicadores() {
    const respuesta = await fetch(`${link_service}consultas/respuestasIndicadores`)
    const json = await respuesta.json()

    return json;
}

async function getRespuetasIndicadoresPreguntas() {
    const respuesta = await fetch(`${link_service}consultas/respuestasIndicadoresPreguntas`)
    const json = await respuesta.json()

    return json;
}

async function getTotalDimensiones() {
    const respuesta = await fetch(`${link_service}consultas/listarDimensiones`)
    const json = await respuesta.json()

    return json;
}

async function getTotalTemas() {
    const respuesta = await fetch(`${link_service}consultas/listarTemas`)
    const json = await respuesta.json()

    return json;
}


async function getTotalIndicadores() {
    const respuesta = await fetch(`${link_service}consultas/listarIndicadores`)
    const json = await respuesta.json()

    return json;
}

// obtenemos los datos de la evaluacion
async function getDatosEvaluacion() {
    const respuesta = await fetch(`${link_service}consultas/getData/${usuario_ID}`)
    const json = await respuesta.json()

    return json;
}

// obtenemos los datos de la evaluacion completa
async function getDatosEvaluacionCompleta() {
    const respuesta = await fetch(`${link_service}consultas/getEvaluationFull/${usuario_ID}`)
    const json = await respuesta.json()

    return json;
}

// mostrarmos los resultados de la evaluacion la evaluacion
(async function () {
    // ---------------------- Resultados GLOBALES  Inicio ------------------------
    const datos_evaluacion_COMPLETA = await getDatosEvaluacionCompleta();
    objeto_datos_evaluacion_graficas_COMPLETA = datos_evaluacion_COMPLETA;
    // mostramos el resultado global de la evaluacion 
    document.querySelector('.resultado-integracion-todo').innerHTML = `${(datos_evaluacion_COMPLETA.resultado_final * 100).toFixed(2)}%`
    // ---------------------- Resultados GLOBALES  Fin ------------------------


    const datos_evaluacion = await getDatosEvaluacion();
    objeto_datos_evaluacion_graficas = datos_evaluacion;
    // otenemos los datos de los elementos de RSE evaludos
    const total_dimensiones = await getTotalDimensiones();
    const total_temas = await getTotalTemas();
    const total_indicadores = await getTotalIndicadores();
    // mostramos el total de los Elementos de RSE evaluados
    document.querySelector('.num-total-valor-dim').innerHTML = total_dimensiones.length;
    document.querySelector('.num-total-valor-temas').innerHTML = total_temas.length;
    document.querySelector('.num-total-valor-indi').innerHTML = total_indicadores.length;

    // datos del nivel de integracion global y especifico
    if (datos_evaluacion.dimensiones_resultados.length > 1) {// validamos haya mas de una dimension evaluado
        // mostramos el resultados TOTAL de le evaluacion en la retroalimentacion
        document.querySelector('.resultado-integracion').innerHTML = `${(datos_evaluacion.resultado_final * 100).toFixed(2)}%`;

        // mostramos los resultados del nivel de integracion global y especifico
        let numero_temas_evaluados = 0;
        let numero_indicadores_evaluados = 0;
        let numero_dimensiones_evaluados = datos_evaluacion.dimensiones_resultados.length;
        let outDimIntegracion = ''; // para guardar las DIMENSIONES evaluadas
        let ottTemIntegracion = ''; // para guardar los TEMAS evaluados
        const DimIntegracion = document.querySelector('.dim-evaluadas-integracion');
        const TemIntegracion = document.querySelector('.tem-evaluados-integracion');

        datos_evaluacion.dimensiones_resultados.forEach(datos_dimensiones => { //recorremos las DIMENSIONES
            outDimIntegracion += `${datos_dimensiones.nom_dimension_evaluada.replace(/\./g, '')}, `;// concatenamos las DIMENSIONES 
            numero_temas_evaluados = numero_temas_evaluados + datos_dimensiones.temas_resultados.length;// obtenemos el totla de temas evaluados
            datos_dimensiones.temas_resultados.forEach(datos_temas => { // recorremos los TEMAS
                ottTemIntegracion += `${datos_temas.nom_tema_evaluado.replace(/\./g, '')}, `;// concatensmos los TEMAS
                numero_indicadores_evaluados = numero_indicadores_evaluados + datos_temas.indicadores_resultados.length;
            })


        })
        // moostramos los datos en panatalla
        DimIntegracion.innerHTML = outDimIntegracion;
        TemIntegracion.innerHTML = ottTemIntegracion;
        // mostramos el numeor de elementos de RSE evaluados 
        document.querySelector('.num-total-valor-dim-eva').innerHTML = numero_dimensiones_evaluados;
        document.querySelector('.num-total-valor-temas-eva').innerHTML = numero_temas_evaluados;
        document.querySelector('.num-total-valor-indi-eva').innerHTML = numero_indicadores_evaluados;

        //---------------------- MOSTRAR INFO TABLA ----------------------
        const estandares = document.querySelector('.cuerpo-tabla-temas');
        let outEstandares = '';
        let imagenes = ["../imagenes/tema_practicas_trabajo_2.jpg", "../imagenes/tema_derechos_humanos_2.png", "../imagenes/tema_comunidad_desarrollo_2.jpg", "../imagenes/tema_cuestiones_relacionadas_consumidor_2.jpg", "../imagenes/medio_ambiente.jpg"]
        let i = 0;
        let num_temas = 0;
        var lista_temas_class = [];
        var lista_barras_temas = [];
        var lista_barras_temas_pdf = [];
        datos_evaluacion.dimensiones_resultados.forEach(datos_dimensiones => {//recorremos DIMENSIONES
            datos_dimensiones.temas_resultados.forEach(element => {//recorremos TEMAS
                // element.nombre
                // element.nivel_1
                if (element.resultado_tema_formula != -1) { // para mostrar en caso de el resuktado de los TEMAS no se cero 
                    outEstandares += `
                                                           <div class="contenido-indicador fila">
                                                               <div class="info-tema">
                                                                   <div class="nom-img-temas fila-contenct">
                                                                       <img class="imagen" src=${element.img_tema_enlace}>
                                                                       <div class="nom_tema">${element.nom_tema_evaluado}</div>
                                                                   </div>
                                                                   <div class="impacto-tema fila-contenct">${(element.resultado_tema_formula * 100).toFixed(2)}%</div>
                                                                   <div class="barra-tema fila-contenct">
                                                                       <div class="grafica-barra-temas">
                                                                           <div class="linea-vertical linea-vertical-izquierda">
                                                                               <div class="vertical-line" style="height: 30px;" ></div>
                                                                               <span>0</span>
                                                                           </div>
                                                                           <div class="contorno">
                                                                               <div class="valor valor-${num_temas}">
   
                                                                               </div>
                                                                           </div>
                                                                               <div class="linea-vertical linea-vertica-deracha">
                                                                               <div class="vertical-line" style="height: 30px;" ></div>
                                                                               <span>100</span>
                                                                           </div>
                                                                       </div>
                                                                   </div>
                                                               </div>
                                                               <div class="tabla-info-indicadores">
                                                                   <div class="tabla-indicadores-titulo tabla-indicadores-titulo-${num_temas}">
                                                                       <div class="cabecera-tabla">
                                                                           <span class="titulo-1">Nombre</span>
                                                                           <span class="titulo-2">Integración</span>
                                                                       </div>
                                                                       <div class="cuerpo-tabla cuerpo-tabla-${num_temas}">
                                                                           <div class="cuerpo-fila">
                                                                               <span class="contendio-1">a</span>
                                                                               <span class="contenido-2">1</span>
                                                                           </div>
                                                                           <div class="cuerpo-fila">
                                                                               <span class="contendio-1">b</span>
                                                                               <span class="contenido-2">2</span>
                                                                           </div>
                                                                           <div class="cuerpo-fila">
                                                                               <span class="contendio-1">b</span>
                                                                               <span class="contenido-2">2</span>
                                                                           </div>
                                                                           <div class="cuerpo-fila">
                                                                               <span class="contendio-1">b</span>
                                                                               <span class="contenido-2">2</span>
                                                                           </div>
                                                                       </div>
                                                                   </div>
                                                               </div>
                                                           </div>
                                   `;
                } else { // en caso de los resultados de los TEMAS NO EXITAN 
                    outEstandares += `
                                                           <div class="contenido-indicador fila">
                                                               <div class="info-tema">
                                                                   <div class="nom-img-temas fila-contenct">
                                                                       <img class="imagen" src=${imagenes[i]}>
                                                                       <div class="nom_tema">${element.nom_tema_evaluado}</div>
                                                                   </div>
                                                                   <div class="impacto-tema fila-contenct">--</div>
                                                                   <div class="barra-tema fila-contenct">
                                                                       <div class="grafica-barra-temas">
                                                                       <div class="tema-no-evalaudo">
                                                                           <span>Tema No Registrado</span>
                                                                       </div>
                                                                       </div>
                                                                   </div>
                                                               </div>
                                                               <div class="tabla-info-indicadores">
                                                                   <div class="tabla-indicadores-titulo tabla-indicadores-titulo-${num_temas}">
                                                                       <div class="cabecera-tabla">
                                                                           <span class="titulo-1">Nombre</span>
                                                                           <span class="titulo-2">Integración</span>
                                                                       </div>
                                                                       <div class="cuerpo-tabla cuerpo-tabla-${num_temas}">
                                                                           <div class="cuerpo-fila">
                                                                               <span class="contendio-1">a</span>
                                                                               <span class="contenido-2">1</span>
                                                                           </div>
                                                                           <div class="cuerpo-fila">
                                                                               <span class="contendio-1">b</span>
                                                                               <span class="contenido-2">2</span>
                                                                           </div>
                                                                           <div class="cuerpo-fila">
                                                                               <span class="contendio-1">b</span>
                                                                               <span class="contenido-2">2</span>
                                                                           </div>
                                                                           <div class="cuerpo-fila">
                                                                               <span class="contendio-1">b</span>
                                                                               <span class="contenido-2">2</span>
                                                                           </div>
                                                                       </div>
                                                                   </div>
                                                               </div>
                                                           </div>
                                   `;
                }
                i = i + 1;
                lista_temas_class.push(`.cuerpo-tabla-${num_temas}`)
                lista_barras_temas.push(`.valor-${num_temas}`)
                num_temas = num_temas + 1;

            })

        })
        estandares.innerHTML = outEstandares; // resultados de TEMAS evaluados

        // ___________ SUB TABLA clasificacion de TEMAS  Incio_________________________
        let numero_temas = 0;
        datos_evaluacion.dimensiones_resultados.forEach(datos_dimensiones => {//recorremos DIMENSIONES
            datos_dimensiones.temas_resultados.forEach(element => {//recorremos TEMAS
                const cargarIndicadores = document.querySelector(lista_temas_class[numero_temas]);
                let outCargarIndicadores = '';
                console.log(element.resultado_tema_formula)
                let valor_barra = (element.resultado_tema_formula * 100)
                //console.log(valor_barra)
                //cambiar el color a las barras
                // if (valor_barra == -100) {
                //     //es
                //     // document.querySelector(lista_barras_temas[numero_temas]).innerHTML = "Tema No Evaluado"
                // }
                if (valor_barra < 33 && element.resultado_tema_formula != -1) {
                    document.querySelector(lista_barras_temas[numero_temas]).style.background = "red";
                } else if (valor_barra > 66 && element.resultado_tema_formula != -1) {
                    document.querySelector(lista_barras_temas[numero_temas]).style.background = "green";
                } else if (element.resultado_tema_formula != -1) {
                    document.querySelector(lista_barras_temas[numero_temas]).style.background = "yellow";
                }
                if (element.resultado_tema_formula != -1) {
                    document.querySelector(lista_barras_temas[numero_temas]).style.width = valor_barra + "%";//para mostrar el resultados de cada TEMA en una BARRA;
                }
                // ------------ SUB TABLA INDICADORES ------------
                element.indicadores_resultados.forEach(ind => {//recorremos indicadores
                    //console.log(ind.indicador)
                    if (ind.valor_real_normalizado == -1) {
                        outCargarIndicadores += `<div class="cuerpo-fila">
                                                    <span class="contendio-1">${ind.nom_indicador_evaluado}</span>
                                                        <span class="contenido-2">
                                                            <span class="visto-no-registrado">
                                                                No Registrado
                                                            </span>
                                                            <div class="texto-emergente-indicador emergente-no-utilizado">
                                                                No utilizado en la Evaluación
                                                            </div>
                                                    </span>
                                                </div>`;
                    } else if (ind.valor_real_normalizado > 0.66) {
                        outCargarIndicadores += `<div class="cuerpo-fila">
                           <span class="contendio-1">${ind.nom_indicador_evaluado}</span>
                           <span class="contenido-2 visto-bueno"><i class="fas fa-check-circle"></i>
                               <div class="texto-emergente-indicador emergente-bueno">
                                   Integración Alta: ${(ind.valor_real_normalizado * 100).toFixed(2)}
                               </div>
                           </span>
                       </div>`;
                    } else if (ind.valor_real_normalizado < 0.3) {
                        outCargarIndicadores += `<div class="cuerpo-fila">
                           <span class="contendio-1">${ind.nom_indicador_evaluado}</span>
                           <span class="contenido-2 visto-malo"><i class="fas fa-times-circle"></i>
                               <div class="texto-emergente-indicador emergente-malo">
                                   Integración Baja: ${(ind.valor_real_normalizado * 100).toFixed(2)}
                               </div>
                           </span>
                       </div>`;
                    } else {
                        outCargarIndicadores += `<div class="cuerpo-fila">
                           <span class="contendio-1">${ind.nom_indicador_evaluado}</span>
                           <span class="contenido-2 visto-regular"><i class="fas fa-minus-circle"></i>
                               <div class="texto-emergente-indicador emergente-regular">
                                   Integración Media: ${(ind.valor_real_normalizado * 100).toFixed(2)}
                               </div>
                           </span>
                       </div>`;
                    }

                })
                cargarIndicadores.innerHTML = outCargarIndicadores;
                numero_temas = numero_temas + 1;
            })
        })
        // ___________ SUB TABLA clasificacion de TEMAS  Fin_________________________

        //__________________Clasifcacion TEMAS Inicio____________________________
        const mejora_social = document.querySelector('.contenido-info-mejora-social');
        const posibilidad_mejora_social = document.querySelector('.contenido-info-posibilidad-mejora-social');
        const estable_social = document.querySelector('.contenido-info-estable-social');
        let outMejora_social = '';
        let outPosiblidaMejora_social = '';
        let outEstable_social = '';

        const mejora_ambiental = document.querySelector('.contenido-info-mejora-ambiental');
        const posibilidad_mejora_ambiental = document.querySelector('.contenido-info-posibilidad-mejora-ambiental');
        const estable_ambiental = document.querySelector('.contenido-info-estable-ambiental');
        let outMejora_ambiental = '';
        let outPosiblidaMejora_ambiental = '';
        let outEstable_ambiental = '';

        datos_evaluacion.dimensiones_resultados.forEach(datos_dimensiones => {//recorremos DIMENSIONES
            let nom_dim = datos_dimensiones.nom_dimension_evaluada
            datos_dimensiones.temas_resultados.forEach(element => {//recorremos TEMAS
                if (nom_dim == "Social") {
                    if (element.resultado_tema_formula < 0.33 && element.resultado_tema_formula != -1) {
                        outMejora_social += `
                                <div class="tema-puntaje"> 
                                    <div class="tema-info">
                                        <p>${element.nom_tema_evaluado}</p>
                                    </div>
                                    <div class="puntaje-info">
                                        <p>${(element.resultado_tema_formula * 100).toFixed(2)}%</p>
                                    </div>
                                </div>`;
                    } else if (element.resultado_tema_formula < 0.66 && element.resultado_tema_formula != -1) {
                        outPosiblidaMejora_social += `
                                <div class="tema-puntaje"> 
                                    <div class="tema-info">
                                        <p>${element.nom_tema_evaluado}</p>
                                    </div>
                                    <div class="puntaje-info">
                                        <p>${(element.resultado_tema_formula * 100).toFixed(2)}%</p>
                                    </div>
                                </div>`;
                    } else if (element.resultado_tema_formula > 0.66 && element.resultado_tema_formula != -1) {
                        outEstable_social += `
                                <div class="tema-puntaje"> 
                                    <div class="tema-info">
                                        <p>${element.nom_tema_evaluado}</p>
                                    </div>
                                    <div class="puntaje-info">
                                        <p>${(element.resultado_tema_formula * 100).toFixed(2)}%</p>
                                    </div>
                                </div>`;
                    }

                } else {
                    if (element.resultado_tema_formula < 0.33 && element.resultado_tema_formula != -1) {
                        outMejora_ambiental += `
                <div class="tema-puntaje">
                    <div class="tema-info">
                        <p>${element.nom_tema_evaluado}</p>
                    </div>
                    <div class="puntaje-info">
                        <p>${(element.resultado_tema_formula * 100).toFixed(2)}%</p>
                    </div>
                </div>`;
                    } else if (element.resultado_tema_formula < 0.66 && element.resultado_tema_formula != -1) {
                        outPosiblidaMejora_ambiental += `
                <div class="tema-puntaje">
                    <div class="tema-info">
                        <p>${element.nom_tema_evaluado}</p>
                    </div>
                    <div class="puntaje-info">
                        <p>${(element.resultado_tema_formula * 100).toFixed(2)}%</p>
                    </div>
                </div>`;
                    } else if (element.resultado_tema_formula > 0.66 && element.resultado_tema_formula != -1) {
                        outEstable_ambiental += `
                <div class="tema-puntaje">
                    <div class="tema-info">
                        <p>${element.nom_tema_evaluado}</p>
                    </div>
                    <div class="puntaje-info">
                        <p>${(element.resultado_tema_formula * 100).toFixed(2)}%</p>
                    </div>
                </div>`;
                    }
                }
            })
        })

        mejora_social.innerHTML = outMejora_social;
        posibilidad_mejora_social.innerHTML = outPosiblidaMejora_social;
        estable_social.innerHTML = outEstable_social;

        mejora_ambiental.innerHTML = outMejora_ambiental;
        posibilidad_mejora_ambiental.innerHTML = outPosiblidaMejora_ambiental;
        estable_ambiental.innerHTML = outEstable_ambiental;
        //__________________Clasifcacion TEMAS Fin____________________________

        // detener el loader de calculando
        setTimeout(() => {
            //llamamos a la funcion de Graficar
            // _____________________________
            // barra horizontal
            graficar_barras();
            // circular 
            grafica_circular()//para la barra de progreso circular TOTAL
            // barra vertical
            grafica_bar_vertical();
            // grafica_bar_vertical_pdf();
            // barra horizontal
            grafica_barra_horizontal();
            // radar
            grafica_radar();
            // grafica_radar_pdf();
            // zoomable
            grafica_zoomable();
            // retroalimenatciones
            obtener_retroalimenatcion();
            //mostrar panel
            mostrar_resultados();
            // copiar en PDF 
            copiar_pdf();
        }, 2000)
        //-------------- MODAL retroalimentacion tabla TEMAS Inicio -------------------
        setTimeout(() => {
            //LINK demora: https://stackoverflow.com/questions/48295288/how-to-handle-single-click-and-double-click-on-the-same-html-dom-element-usi
            const mostrar_info_indicadores = function () {
                this.timer = 0;
                this.preventSimpleClick = false;
                let delay = 300;
                this.timer = setTimeout(() => {
                    if (!this.preventSimpleClick) {
                        this.classList.toggle('active')//solo esto es para abrir los INDICADORES el resto es para la demora
                    }
                }, delay);
            }

            //obtenemos los datos de las filas de estadnares
            const mostrar_modal_info = function (evento) {
                this.preventSimpleClick = true;//para la demora
                clearTimeout(this.timer);//para la demora
                //--- obtenner un PADRE ESPECIFICO Inicio ---
                var padre = evento.srcElement.parentNode//obtenemos el primer padre
                //console.log(padre)
                var class_name = padre.className.split(" ")[0];
                while (class_name != 'info-tema') {//comparamos si es el padre que buscamos
                    padre = padre.parentNode;//obtenemos el siguiente padre en caso de que no se el que buscamos 
                    class_name = padre.className.split(" ")[0];
                }
                //console.log(padre.firstElementChild.textContent)
                //--- obtenner un PADRE ESPECIFICO Fin ---
                //--- Mostrar Retroalimenatcion de acuerdo al TEMA --
                fetch(`${link_service}consultas/listarTemas`)//obtenemos que indicadores son respondidos
                    .then(respuesta => respuesta.json())
                    .then(data => {
                        data.forEach(element => {
                            var nombre_1 = element.nombre;
                            var nombre_2 = padre.children[0].children[1].textContent;
                            var valor = padre.children[1].textContent.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
                            if (nombre_1 == nombre_2) {
                                if (valor > 66) {
                                    document.querySelector(".retoalimentacion-tema").innerHTML = "Este tema se aplica en gran parte de su empresa por lo que su empresa ya es considerada como una empresa sustentable y responsable.";

                                } else if (valor < 33) {
                                    document.querySelector(".retoalimentacion-tema").innerHTML = "Este tema no se aplica en su empresa por lo que se sugiere empezar a trabar en este tema.";
                                } else {
                                    document.querySelector(".retoalimentacion-tema").innerHTML = "Este tema se aplica de forma media por lo que se sugiere mejorar en ciertos aspectos respecto a este tema, para alcanzar un nivel óptimo de RSE.";
                                }
                            }

                        })

                    })
                document.querySelector(".titulo-modal-info-span").innerHTML = padre.firstElementChild.textContent;//para mostrar el nombre del TEMA en el MODALS
                document.getElementById("modal-info-id").style.visibility = "visible";
                document.getElementById("modal-info-id").style.opacity = "1";
                //document.getElementById("cotendor-modal-info-id").transform = "translateY(0%)";
            }
            // boton_mostrar_modal es un arreglo así que lo recorremos
            const boton_mostrar_modal = document.querySelectorAll(".info-tema");
            boton_mostrar_modal.forEach(boton => {
                //Agregar listener
                boton.addEventListener("dblclick", mostrar_modal_info);
            });
            const conte_indica = document.getElementsByClassName('info-tema')
            for (m = 0; m < conte_indica.length; m++) {
                conte_indica[m].addEventListener('click', mostrar_info_indicadores)
            }

            document.getElementById("cerrar-modal").addEventListener('click', () => {
                document.getElementById("modal-info-id").style.visibility = "hidden";
                document.getElementById("modal-info-id").style.opacity = "0";
                //document.getElementById("cotendor-modal-info-id").transform = "translateY(-30%)";
            })

        }, 1500)
        //-------------- MODAL retroalimentacion tabla TEMAS Inicio -------------------
    }
    else {
        document.getElementById('loader-resultados').innerHTML = `<div class="loader-mensaje-error">
        Tiene que responder al menos una pregunta de cada dimensión (Social, Ambiental), para acceder a este apartado.
    </div>`
    }


})()


// function algoritmo_todo_aspecpectos(objeto_respuestas_new) {
//     objeto_resp_2 = objeto_respuestas_new;
//     objeto_resp_2.forEach(datos_preguntas => {
//         //console.log(datos_preguntas)
//         datos_preguntas.temas.forEach(element => {
//             //console.log(element.indicadores)
//             element.indicadores.forEach(element_2 => {//recorremos cada indicador
//                 //console.log(element_2.indicador)
//                 //console.log(element_2.respuestas)
//                 let sum = 0;
//                 let cont = 0;
//                 for (let i = 0; i < element_2.respuestas.length; i++) {
//                     sum += element_2.respuestas[i];
//                     cont = cont + 1;
//                 }
//                 element_2.valor_real = sum//guardamos la suma
//                 element_2.valor_maximo = cont * 2//el valor maximo (multiplicamos por dos por que es el valor maximo de cada pregunta)
//                 //normalizamos el valor real y guardamos en OBJETO
//                 element_2.valor_real_normalizado = (element_2.valor_real - element_2.valor_minimo) / (element_2.valor_maximo - element_2.valor_minimo)
//             })
//             element.uno_cantida_indiacadores = 1 / element.indicadores.length;//1 sobre cantidad de  INIDCADORES (1/cant_indicadores) 

//         })

//     })

//     //--------------------- FORMULA -------------------------
//     //--------------------- NIVEL 1 ------------------------
//     let peso = 2;
//     objeto_resp_2.forEach(datos_preguntas => {//recorremos DIMENSIONES
//         datos_preguntas.temas.forEach(element => {//recorresmos TEMAS
//             let cantidad_indadores_normalizado = element.uno_cantida_indiacadores;
//             let suma_niveles = 0;
//             element.indicadores.forEach(element_2 => {//recorremos cada indicador
//                 let total = Math.pow(element_2.valor_real_normalizado, peso) * cantidad_indadores_normalizado;
//                 element_2.valor_1_formula = total;//guardamos los resultados de los indicadores
//                 suma_niveles = suma_niveles + total;
//             })
//             element.nivel_1 = Math.pow(suma_niveles, 1 / peso).toFixed(3)//guardamos los resultados de los temas

//         })
//         datos_preguntas.uno_cantidad_temas = 1 / datos_preguntas.temas.length;//1 sobre la cantidad de TEMAS (1/cant_TEMAS)

//     })
//     //--------------------- NIVEL 2 -------------------------
//     objeto_resp_2.forEach(datos_preguntas => {//recorremos DIMENSIONES
//         let cantidad_temas_normalizados = datos_preguntas.uno_cantidad_temas;
//         let suma_niveles = 0;
//         datos_preguntas.temas.forEach(element => {//recorremos TEMAS
//             //console.log(element)
//             let total = Math.pow(element.nivel_1, peso) * cantidad_temas_normalizados;
//             suma_niveles = suma_niveles + total;
//         })
//         //Math.pow(suma_niveles, 1 / peso).toFixed(3)
//         datos_preguntas.nivel_2 = Math.pow(suma_niveles, 1 / peso).toFixed(3) //guardamos los resultados de las Dimenisones
//     })
//     //--------------------- NIVEL 3 -------------------------
//     let suma_niveles = 0;
//     objeto_resp_2.forEach(datos_preguntas => {//recorremos DIMENSIONES
//         let total = Math.pow(datos_preguntas.nivel_2, peso) * datos_preguntas.uno_cantidad_temas;
//         suma_niveles = suma_niveles + total;
//     })
//     respuesta_final_2 = Math.pow(suma_niveles, 1 / peso).toFixed(2);//FINAL DEL ALGORITMO-----------
//     // encaso de que el resultado final global sea mayor de 100
//     if (respuesta_final_2 > 1) {
//         respuesta_final_2 = 1;
//     }
//     //---------------- FORMULA Fin ---------------------------
//     // console.log(respuesta_final_2)

//     document.querySelector('.resultado-integracion-todo').innerHTML = `${(respuesta_final_2 * 100).toFixed(2)}%`

// }

// //Creamos el Objeto
// (async function () {
//     const total_dimensiones = await getTotalDimensiones();
//     const total_temas = await getTotalTemas();
//     const total_indicadores = await getTotalIndicadores();
//     const respuestasIndicadores = await getRespuetasIndicadores()
//     const respuestasIndicadoresPreguntas = await getRespuetasIndicadoresPreguntas()

//     // console.log('Total de Dimensiones: '+total_dimensiones.length)
//     // console.log('Total de Temas: '+total_temas.length)
//     // console.log('Total de Indicadores: '+total_indicadores.length)
//     // document.querySelector('.num-total-valor-dim').innerHTML = total_dimensiones.length;
//     // document.querySelector('.num-total-valor-temas').innerHTML = total_temas.length;
//     // document.querySelector('.num-total-valor-indi').innerHTML = total_indicadores.length;
//     // ________________________
//     //creamos el objeto con toda la info (PARA EVLACION GLOBAL)
//     total_dimensiones.forEach(dimensiones_new => {//recoremos las dimensiones
//         const object_dim_new = {
//             dimension: dimensiones_new.nombre,
//             temas: [],
//             uno_cantidad_temas: 0,
//             nivel_2: 0
//         }
//         objeto_respuestas_new.push(object_dim_new)
//         total_temas.forEach(temas_new => {//recorremos los temas
//             objeto_respuestas_new.find((dimen_new, index) => {
//                 if (dimen_new.dimension === temas_new.dimension.nombre) {
//                     const object_tema = {
//                         nombre: temas_new.nombre,
//                         indicadores: [],
//                         uno_cantida_indiacadores: 0,
//                         nivel_1: 0
//                     }
//                     const tema_existe = objeto_respuestas_new[index].temas.find(t => t.nombre === temas_new.nombre)
//                     if (!tema_existe) {
//                         objeto_respuestas_new[index].temas.push(object_tema)
//                     }
//                     total_indicadores.forEach(indicador_new => {//recorremos los idnicadores
//                         objeto_respuestas_new[index].temas.find((tema_new, index_1_new) => {
//                             if (tema_new.nombre === indicador_new.tema.nombre) {
//                                 let array = [];
//                                 array.push('0' * indicador_new.preguntas_cualitativas.length);
//                                 // console.log(indicador_new.preguntas_cualitativas)
//                                 // console.log(indicador_new.preguntas_cualitativas.length)
//                                 for (i = 1; i < indicador_new.preguntas_cualitativas.length; i++) {
//                                     array.push(0)
//                                 }
//                                 const object_inidcadores = {
//                                     indicador: indicador_new.nombre,
//                                     respuestas: array,
//                                     valor_real: 0,
//                                     valor_maximo: 0,
//                                     valor_minimo: 0,
//                                     valor_real_normalizado: 0,
//                                     valor_1_formula: 0
//                                 }
//                                 const indicador_existe = objeto_respuestas_new[index].temas[index_1_new].indicadores.find(i => i.indicador === indicador_new.nombre)
//                                 if (!indicador_existe) {
//                                     objeto_respuestas_new[index].temas[index_1_new].indicadores.push(object_inidcadores)
//                                 }

//                             }
//                         })
//                     })

//                 }
//             })
//         })

//     })

//     // console.log(objeto_respuestas_new) (PARA EVLACION GLOBAL)
//     objeto_respuestas_new.forEach(element_dim => {
//         element_dim.temas.forEach(element_temas => {
//             element_temas.indicadores.forEach(elem_indicador => {
//                 // console.log(elem_indicador.indicador)
//                 respuestasIndicadores.forEach(element => {
//                     if (element.encuestado.encuestado_ID == encuestado_ID) {
//                         respuestasIndicadoresPreguntas.forEach(respuestas_valores => {
//                             if (element.respuestas_Indicadores_ID == respuestas_valores.respuestasaIndicadores.respuestas_Indicadores_ID && respuestas_valores.respuesta != -1) {
//                                 // console.log("-- " + element.indicador.tema.dimension.nombre)//nombre la dimension respondido
//                                 // console.log("----- " + element.indicador.tema.nombre)//nombre del tema respondido
//                                 // console.log("- " + element.indicador.nombre)//nombre del indicador respondido
//                                 // console.log("- " + respuestas_valores.preguntasCualitativas.pregunta_cualitativa)//pregunta
//                                 // console.log(respuestas_valores.respuesta)
//                                 if (element.indicador.nombre == elem_indicador.indicador) {
//                                     elem_indicador.respuestas.shift();//eliminamos un elemento
//                                     elem_indicador.respuestas.push(respuestas_valores.respuesta)
//                                 }

//                             }
//                         })
//                     }

//                 })


//                 // console.log(elem_indicador.respuestas)
//             })

//         })
//     })
//     // console.log(objeto_respuestas_new) (PARA EVLACION GLOBAL)
//     algoritmo_todo_aspecpectos(objeto_respuestas_new)
//     // ________________________
//     // respuestasIndicadores.forEach(element => {
//     //     if (element.encuestado.encuestado_ID == encuestado_ID) {
//     //         respuestasIndicadoresPreguntas.forEach(respuestas_valores => {
//     //             if (element.respuestas_Indicadores_ID == respuestas_valores.respuestasaIndicadores.respuestas_Indicadores_ID  && respuestas_valores.respuesta != -1) {
//     //                 console.log("-- " + element.indicador.tema.dimension.nombre)//nombre la dimension respondido
//     //                 console.log("----- " + element.indicador.tema.nombre)//nombre del tema respondido
//     //                 console.log("- " + element.indicador.nombre)//nombre del indicador respondido
//     //                 console.log("- " + respuestas_valores.preguntasCualitativas.pregunta_cualitativa)//pregunta
//     //                 console.log(respuestas_valores.respuesta)
//     //             }
//     //         })
//     //     }

//     // })

//     //console.log(data)
//     // console.log(encuestado_ID)
//     respuestasIndicadores.forEach(element => {
//         //console.log("- " + element.indicador.indicador_ID) //ID del indicador respondido
//         //console.log("- "+element.respuestas_Indicadores_ID)
//         //para o tener las respuesats solo del encuestado
//         if (element.encuestado.encuestado_ID == encuestado_ID) {
//             auxiliar = 1;
//             console.log(element.encuestado.encuestado_ID)
//             let datos = []
//             respuestasIndicadoresPreguntas.forEach(respuestas_valores => {
//                 if (element.respuestas_Indicadores_ID == respuestas_valores.respuestasaIndicadores.respuestas_Indicadores_ID && respuestas_valores.respuesta != -1) {//obtenemos las respuetas del indicador para realizar la suma
//                     //console.log("-- " + element.indicador.tema.dimension.nombre)//nombre la dimensionrespondido
//                     //console.log("----- " + element.indicador.tema.nombre)//nombre del tema respondido
//                     //console.log("- " + element.indicador.nombre)//nombre del indicador respondido
//                     //console.log(respuestas_valores.respuesta)
//                     //guardamos desde DIMENIONES
//                     const dimension_existe = objeto_respuestas.find(t => t.dimension === element.indicador.tema.dimension.nombre);
//                     if (!dimension_existe) {
//                         const object_dim = {
//                             dimension: element.indicador.tema.dimension.nombre,
//                             temas: [],
//                             uno_cantidad_temas: 0,
//                             nivel_2: 0
//                         }
//                         objeto_respuestas.push(object_dim)
//                     }
//                     objeto_respuestas.find((dimen, index) => {
//                         if (dimen.dimension === element.indicador.tema.dimension.nombre) {
//                             const object_tema = {
//                                 nombre: element.indicador.tema.nombre,
//                                 indicadores: [],
//                                 uno_cantida_indiacadores: 0,
//                                 nivel_1: 0
//                             }

//                             const tema_existe = objeto_respuestas[index].temas.find(t => t.nombre === element.indicador.tema.nombre)
//                             if (!tema_existe) {
//                                 objeto_respuestas[index].temas.push(object_tema)
//                             }
//                             objeto_respuestas[index].temas.find((tema, index_1) => {
//                                 if (tema.nombre === element.indicador.tema.nombre) {
//                                     const object_inidcadores = {
//                                         indicador: element.indicador.nombre,
//                                         respuestas: [],
//                                         valor_real: 0,
//                                         valor_maximo: 0,
//                                         valor_minimo: 0,
//                                         valor_real_normalizado: 0,
//                                         valor_1_formula: 0
//                                     }
//                                     const indicador_existe = objeto_respuestas[index].temas[index_1].indicadores.find(i => i.indicador === element.indicador.nombre)
//                                     if (!indicador_existe) {
//                                         objeto_respuestas[index].temas[index_1].indicadores.push(object_inidcadores)
//                                     }
//                                     //00000
//                                     objeto_respuestas[index].temas[index_1].indicadores.find((indica, inidex_2) => {
//                                         if (indica.indicador === element.indicador.nombre) {
//                                             objeto_respuestas[index].temas[index_1].indicadores[inidex_2].respuestas.push(respuestas_valores.respuesta)
//                                         }
//                                     })
//                                 }
//                             })
//                         }
//                     })
//                 }
//             })

//         }
//     })
//     if (auxiliar == 1) {
//         //llamamos a la funcion para aplicar el algoritmo
//         algoritmo_graficar();
//     } else {
//         document.getElementById('loader-resultados').innerHTML = `<div class="loader-mensaje-error">
//         Tiene que responder al menos una pregunta de cada dimensión (Social, Ambiental), para acceder a este apartado.
//     </div>`
//     }


// })()

// //______Algoritmo Inicio_____
// async function getAlgoritmo() {

//     //---------------- FORMULA Inicio ---------------------------
//     //console.log(objeto_respuestas)
//     objeto_resp = objeto_respuestas;
//     objeto_resp.forEach(datos_preguntas => {
//         //console.log(datos_preguntas)
//         datos_preguntas.temas.forEach(element => {
//             //console.log(element.indicadores)
//             element.indicadores.forEach(element_2 => {//recorremos cada indicador
//                 //console.log(element_2.indicador)
//                 //console.log(element_2.respuestas)
//                 let sum = 0;
//                 let cont = 0;
//                 for (let i = 0; i < element_2.respuestas.length; i++) {
//                     sum += element_2.respuestas[i];
//                     cont = cont + 1;
//                 }
//                 element_2.valor_real = sum//guardamos la suma
//                 element_2.valor_maximo = cont * 2//el valor maximo (multiplicamos por dos por que es el valor maximo de cada pregunta)
//                 //normalizamos el valor real y guardamos en OBJETO
//                 element_2.valor_real_normalizado = (element_2.valor_real - element_2.valor_minimo) / (element_2.valor_maximo - element_2.valor_minimo)
//             })
//             element.uno_cantida_indiacadores = 1 / element.indicadores.length;//1 sobre cantidad de  INIDCADORES (1/cant_indicadores) 

//         })

//     })

//     //--------------------- FORMULA -------------------------
//     //--------------------- NIVEL 1 ------------------------
//     let peso = 2;
//     objeto_resp.forEach(datos_preguntas => {//recorremos DIMENSIONES
//         datos_preguntas.temas.forEach(element => {//recorresmos TEMAS
//             let cantidad_indadores_normalizado = element.uno_cantida_indiacadores;
//             let suma_niveles = 0;
//             element.indicadores.forEach(element_2 => {//recorremos cada indicador
//                 let total = Math.pow(element_2.valor_real_normalizado, peso) * cantidad_indadores_normalizado;
//                 element_2.valor_1_formula = total;//guardamos los resultados de los indicadores
//                 suma_niveles = suma_niveles + total;
//             })
//             element.nivel_1 = Math.pow(suma_niveles, 1 / peso).toFixed(3)//guardamos los resultados de los temas

//         })
//         datos_preguntas.uno_cantidad_temas = 1 / datos_preguntas.temas.length;//1 sobre la cantidad de TEMAS (1/cant_TEMAS)

//     })
//     //--------------------- NIVEL 2 -------------------------
//     objeto_resp.forEach(datos_preguntas => {//recorremos DIMENSIONES
//         let cantidad_temas_normalizados = datos_preguntas.uno_cantidad_temas;
//         let suma_niveles = 0;
//         datos_preguntas.temas.forEach(element => {//recorremos TEMAS
//             //console.log(element)
//             let total = Math.pow(element.nivel_1, peso) * cantidad_temas_normalizados;
//             suma_niveles = suma_niveles + total;
//         })
//         //Math.pow(suma_niveles, 1 / peso).toFixed(3)
//         datos_preguntas.nivel_2 = Math.pow(suma_niveles, 1 / peso).toFixed(3) //guardamos los resultados de las Dimenisones
//     })
//     //--------------------- NIVEL 3 -------------------------
//     let suma_niveles = 0;
//     objeto_resp.forEach(datos_preguntas => {//recorremos DIMENSIONES
//         let total = Math.pow(datos_preguntas.nivel_2, peso) * datos_preguntas.uno_cantidad_temas;
//         suma_niveles = suma_niveles + total;
//     })
//     resutaldo_final = Math.pow(suma_niveles, 1 / peso).toFixed(2);//FINAL DEL ALGORITMO-----------
//     // encaso de que el resultado final sea mayor a 100
//     if (resutaldo_final > 1) {
//         resutaldo_final = 1;
//     }
//     //---------------- FORMULA Fin ---------------------------
// }
// //______Algoritmo FIn_____

// function algoritmo_graficar() {

//     (async function () {
//         //llamamos a la funcion para que aplique el algoritmo
//         await getAlgoritmo()
//         // console.log(objeto_resp_2)
//         // console.log(objeto_resp)
//         if (objeto_resp.length > 1) {
//             objeto_resp.find((dim, index_dim) => {
//                 // recorremos el segundo objeto el que tiene todos los datos
//                 objeto_resp_2.forEach(dim_2 => {
//                     if (dim.dimension == dim_2.dimension) {
//                         // console.log('- ' + dim.dimension + ' ' + index_dim)
//                         dim.temas.find((tema, index_tema) => {
//                             // console.log(tema.nombre + ' ' + index_tema)
//                             dim_2.temas.forEach(element_tema => {
//                                 //objeto_respuestas_new[index].temas[index_1_new].indicadores.find(
//                                 // i => i.indicador === indicador_new.nombre
//                                 // )
//                                 const tema_existe = objeto_resp[index_dim].temas.find(
//                                     i => i.nombre === element_tema.nombre
//                                 )
//                                 if (!tema_existe) {
//                                     // console.log('No EXISTE: ' + element_tema.nombre)
//                                     element_tema.nivel_1 = null;
//                                     element_tema.indicadores.forEach(element_indicador => {
//                                         element_indicador.respuestas.splice(0, element_indicador.respuestas.length);
//                                         element_indicador.valor_1_formula = null;
//                                         // console.log(element_indicador.indicador)
//                                     })
//                                     //vacimaos los indicadores ya que contenian solo elemntos cero
//                                     //ingresamos el tema no evaluado 
//                                     objeto_resp[index_dim].temas.push(element_tema)
//                                 }

//                             })
//                         })

//                     }
//                 })
//             })
//             // console.log(objeto_resp)
//             // // Obtenemos el nuemor de Dimensiones, Temas e Indicadores 
//             // let numero_temas_evaluados = 0;
//             // let numero_indicadores_evaluados = 0;
//             // let numero_dimensiones_evaluados = objeto_resp.length;
//             // let dim_evaluados = [];
//             // let temas_evaluados = [];
//             // let indi_evaluados = []
//             // // console.log('___________________________')
//             // let outDimIntegracion = '';
//             // let ottTemIntegracion = '';
//             // const DimIntegracion = document.querySelector('.dim-evaluadas-integracion');
//             // const TemIntegracion = document.querySelector('.tem-evaluados-integracion');
//             // document.querySelector('.resultado-integracion').innerHTML = `${(resutaldo_final * 100).toFixed(2)}%`;
//             // objeto_resp.forEach(datos_dimensiones => {
//             //     // console.log(datos_dimensiones.dimension)
//             //     dim_evaluados.push(datos_dimensiones.dimension)
//             //     outDimIntegracion += `${datos_dimensiones.dimension.replace(/\./g, '')}, `;// las dimensiones
//             //     numero_temas_evaluados = numero_temas_evaluados + datos_dimensiones.temas.length;
//             //     datos_dimensiones.temas.forEach(datos_temas => {
//             //         // console.log(datos_temas.nombre)
//             //         temas_evaluados.push(datos_temas.nombre)
//             //         ottTemIntegracion += `${datos_temas.nombre.replace(/\./g, '')}, `;// los Temas
//             //         numero_indicadores_evaluados = numero_indicadores_evaluados + datos_temas.indicadores.length;
//             //         datos_temas.indicadores.forEach(datos_indicadores => {
//             //             // console.log(datos_indicadores.indicador)
//             //             indi_evaluados.push(datos_indicadores.indicador)
//             //         })
//             //     })
//             // })
//             // // console.log(dim_evaluados)
//             // // console.log(temas_evaluados)
//             // // console.log(indi_evaluados)
//             // DimIntegracion.innerHTML = outDimIntegracion;
//             // TemIntegracion.innerHTML = ottTemIntegracion;


//             // // console.log('Dimesniones Evaluadas: '+numero_dimensiones_evaluados)
//             // // console.log('Temas Evaluados: '+numero_temas_evaluados)
//             // // console.log('Indicadores Evaluados: '+numero_indicadores_evaluados)
//             // document.querySelector('.num-total-valor-dim-eva').innerHTML = numero_dimensiones_evaluados;
//             // document.querySelector('.num-total-valor-temas-eva').innerHTML = numero_temas_evaluados;
//             // document.querySelector('.num-total-valor-indi-eva').innerHTML = numero_indicadores_evaluados;
//             // //__________________Clasifcacion TEMAS____________________________
//             // const mejora_social = document.querySelector('.contenido-info-mejora-social');
//             // const posibilidad_mejora_social = document.querySelector('.contenido-info-posibilidad-mejora-social');
//             // const estable_social = document.querySelector('.contenido-info-estable-social');
//             // let outMejora_social = '';
//             // let outPosiblidaMejora_social = '';
//             // let outEstable_social = '';

//             // const mejora_ambiental = document.querySelector('.contenido-info-mejora-ambiental');
//             // const posibilidad_mejora_ambiental = document.querySelector('.contenido-info-posibilidad-mejora-ambiental');
//             // const estable_ambiental = document.querySelector('.contenido-info-estable-ambiental');
//             // let outMejora_ambiental = '';
//             // let outPosiblidaMejora_ambiental = '';
//             // let outEstable_ambiental = '';

//             // objeto_resp.forEach(datos_preguntas => {//recorremos DIMENSIONES
//             //     let nom_dim = datos_preguntas.dimension
//             //     datos_preguntas.temas.forEach(element => {//recorremos TEMAS
//             //         if (nom_dim == "Social") {
//             //             if (element.nivel_1 < 0.33 && element.nivel_1 != null) {
//             //                 outMejora_social += `
//             //                         <div class="tema-puntaje"> 
//             //                             <div class="tema-info">
//             //                                 <p>${element.nombre}</p>
//             //                             </div>
//             //                             <div class="puntaje-info">
//             //                                 <p>${(element.nivel_1 * 100).toFixed(2)}%</p>
//             //                             </div>
//             //                         </div>`;
//             //             } else if (element.nivel_1 < 0.66 && element.nivel_1 != null) {
//             //                 outPosiblidaMejora_social += `
//             //                         <div class="tema-puntaje"> 
//             //                             <div class="tema-info">
//             //                                 <p>${element.nombre}</p>
//             //                             </div>
//             //                             <div class="puntaje-info">
//             //                                 <p>${(element.nivel_1 * 100).toFixed(2)}%</p>
//             //                             </div>
//             //                         </div>`;
//             //             } else if (element.nivel_1 > 0.66 && element.nivel_1 != null) {
//             //                 outEstable_social += `
//             //                         <div class="tema-puntaje"> 
//             //                             <div class="tema-info">
//             //                                 <p>${element.nombre}</p>
//             //                             </div>
//             //                             <div class="puntaje-info">
//             //                                 <p>${(element.nivel_1 * 100).toFixed(2)}%</p>
//             //                             </div>
//             //                         </div>`;
//             //             }

//             //         } else {
//             //             if (element.nivel_1 < 0.33 && element.nivel_1 != null) {
//             //                 outMejora_ambiental += `
//             //         <div class="tema-puntaje">
//             //             <div class="tema-info">
//             //                 <p>${element.nombre}</p>
//             //             </div>
//             //             <div class="puntaje-info">
//             //                 <p>${(element.nivel_1 * 100).toFixed(2)}%</p>
//             //             </div>
//             //         </div>`;
//             //             } else if (element.nivel_1 < 0.66 && element.nivel_1 != null) {
//             //                 outPosiblidaMejora_ambiental += `
//             //         <div class="tema-puntaje">
//             //             <div class="tema-info">
//             //                 <p>${element.nombre}</p>
//             //             </div>
//             //             <div class="puntaje-info">
//             //                 <p>${(element.nivel_1 * 100).toFixed(2)}%</p>
//             //             </div>
//             //         </div>`;
//             //             } else if (element.nivel_1 > 0.66 && element.nivel_1 != null) {
//             //                 outEstable_ambiental += `
//             //         <div class="tema-puntaje">
//             //             <div class="tema-info">
//             //                 <p>${element.nombre}</p>
//             //             </div>
//             //             <div class="puntaje-info">
//             //                 <p>${(element.nivel_1 * 100).toFixed(2)}%</p>
//             //             </div>
//             //         </div>`;
//             //             }
//             //         }
//             //     })
//             // })

//             // mejora_social.innerHTML = outMejora_social;
//             // posibilidad_mejora_social.innerHTML = outPosiblidaMejora_social;
//             // estable_social.innerHTML = outEstable_social;

//             // mejora_ambiental.innerHTML = outMejora_ambiental;
//             // posibilidad_mejora_ambiental.innerHTML = outPosiblidaMejora_ambiental;
//             // estable_ambiental.innerHTML = outEstable_ambiental;
//             // //_____________________________________________


//             //---------------------- MOSTRAR INFO TABLA ----------------------
//             // const estandares = document.querySelector('.cuerpo-tabla-temas');
//             // const estandares_pdf = document.querySelector('.cuerpo-tabla-temas-pdf');
//             // let outEstandares = '';
//             // let outEstandares_pdf = '';
//             // // let nom_imagenes = ['tema_practicas_trabajo_2.jpg', 'tema_derechos_humanos_2.png', 'tema_comunidad_desarrollo_2.jpg', 'tema_cuestiones_relacionadas_consumidor_2.jpg', 'medio_ambiente.jpg'];
//             // // let imagenes = ["../imagenes/Derechos_Humanos.jpg", "../imagenes/practicas_trabajo.png", "../imagenes/medio_ambiente.jpg", "../imagenes/participacion_comunidad_desarrollo.jpg", "../imagenes/practicas_trabajo.png"]
//             // let imagenes = ["../imagenes/tema_practicas_trabajo_2.jpg", "../imagenes/tema_derechos_humanos_2.png", "../imagenes/tema_comunidad_desarrollo_2.jpg", "../imagenes/tema_cuestiones_relacionadas_consumidor_2.jpg", "../imagenes/medio_ambiente.jpg"]
//             // let i = 0;
//             // let num_temas = 0;
//             // var lista_temas_class = [];
//             // var lista_barras_temas = [];
//             // var lista_barras_temas_pdf = [];
//             // objeto_resp.forEach(datos_preguntas => {//recorremos DIMENSIONES
//             //     let nom_dim = datos_preguntas.dimension
//             //     datos_preguntas.temas.forEach(element => {//recorremos TEMAS
//             //         element.nombre
//             //         element.nivel_1
//             //         if (element.nivel_1 != null) {
//             //             outEstandares += `
//             //                                             <div class="contenido-indicador fila">
//             //                                                 <div class="info-tema">
//             //                                                     <div class="nom-img-temas fila-contenct">
//             //                                                         <img class="imagen" src=${imagenes[i]}>
//             //                                                         <div class="nom_tema">${element.nombre}</div>
//             //                                                     </div>
//             //                                                     <div class="impacto-tema fila-contenct">${(element.nivel_1 * 100).toFixed(2)}%</div>
//             //                                                     <div class="barra-tema fila-contenct">
//             //                                                         <div class="grafica-barra-temas">
//             //                                                             <div class="linea-vertical linea-vertical-izquierda">
//             //                                                                 <div class="vertical-line" style="height: 30px;" ></div>
//             //                                                                 <span>0</span>
//             //                                                             </div>
//             //                                                             <div class="contorno">
//             //                                                                 <div class="valor valor-${num_temas}">

//             //                                                                 </div>
//             //                                                             </div>
//             //                                                                 <div class="linea-vertical linea-vertica-deracha">
//             //                                                                 <div class="vertical-line" style="height: 30px;" ></div>
//             //                                                                 <span>100</span>
//             //                                                             </div>
//             //                                                         </div>
//             //                                                     </div>
//             //                                                 </div>
//             //                                                 <div class="tabla-info-indicadores">
//             //                                                     <div class="tabla-indicadores-titulo tabla-indicadores-titulo-${num_temas}">
//             //                                                         <div class="cabecera-tabla">
//             //                                                             <span class="titulo-1">Nombre</span>
//             //                                                             <span class="titulo-2">Integración</span>
//             //                                                         </div>
//             //                                                         <div class="cuerpo-tabla cuerpo-tabla-${num_temas}">
//             //                                                             <div class="cuerpo-fila">
//             //                                                                 <span class="contendio-1">a</span>
//             //                                                                 <span class="contenido-2">1</span>
//             //                                                             </div>
//             //                                                             <div class="cuerpo-fila">
//             //                                                                 <span class="contendio-1">b</span>
//             //                                                                 <span class="contenido-2">2</span>
//             //                                                             </div>
//             //                                                             <div class="cuerpo-fila">
//             //                                                                 <span class="contendio-1">b</span>
//             //                                                                 <span class="contenido-2">2</span>
//             //                                                             </div>
//             //                                                             <div class="cuerpo-fila">
//             //                                                                 <span class="contendio-1">b</span>
//             //                                                                 <span class="contenido-2">2</span>
//             //                                                             </div>
//             //                                                         </div>
//             //                                                     </div>
//             //                                                 </div>
//             //                                             </div>
//             //                     `;
//             //         } else {
//             //             outEstandares += `
//             //                                             <div class="contenido-indicador fila">
//             //                                                 <div class="info-tema">
//             //                                                     <div class="nom-img-temas fila-contenct">
//             //                                                         <img class="imagen" src=${imagenes[i]}>
//             //                                                         <div class="nom_tema">${element.nombre}</div>
//             //                                                     </div>
//             //                                                     <div class="impacto-tema fila-contenct">--</div>
//             //                                                     <div class="barra-tema fila-contenct">
//             //                                                         <div class="grafica-barra-temas">
//             //                                                         <div class="tema-no-evalaudo">
//             //                                                             <span>Tema No Registrado</span>
//             //                                                         </div>
//             //                                                         </div>
//             //                                                     </div>
//             //                                                 </div>
//             //                                                 <div class="tabla-info-indicadores">
//             //                                                     <div class="tabla-indicadores-titulo tabla-indicadores-titulo-${num_temas}">
//             //                                                         <div class="cabecera-tabla">
//             //                                                             <span class="titulo-1">Nombre</span>
//             //                                                             <span class="titulo-2">Integración</span>
//             //                                                         </div>
//             //                                                         <div class="cuerpo-tabla cuerpo-tabla-${num_temas}">
//             //                                                             <div class="cuerpo-fila">
//             //                                                                 <span class="contendio-1">a</span>
//             //                                                                 <span class="contenido-2">1</span>
//             //                                                             </div>
//             //                                                             <div class="cuerpo-fila">
//             //                                                                 <span class="contendio-1">b</span>
//             //                                                                 <span class="contenido-2">2</span>
//             //                                                             </div>
//             //                                                             <div class="cuerpo-fila">
//             //                                                                 <span class="contendio-1">b</span>
//             //                                                                 <span class="contenido-2">2</span>
//             //                                                             </div>
//             //                                                             <div class="cuerpo-fila">
//             //                                                                 <span class="contendio-1">b</span>
//             //                                                                 <span class="contenido-2">2</span>
//             //                                                             </div>
//             //                                                         </div>
//             //                                                     </div>
//             //                                                 </div>
//             //                                             </div>
//             //                     `;
//             //         }
//             //         outEstandares_pdf += `<div class="contenido-indicador fila">
//             //     <div class="info-tema">
//             //         <div class="nom-img-temas fila-contenct">
//             //             <img class="imagen" src=${imagenes[i]}>
//             //             <div class="nom_tema">${element.nombre}</div>
//             //         </div>
//             //         <div class="impacto-tema fila-contenct">${(element.nivel_1 * 100).toFixed(2)}%</div>
//             //         <div class="barra-tema fila-contenct">
//             //             <div class="grafica-barra-temas-pdf">
//             //                 <div
//             //                     class="linea-vertical-pdf linea-vertical-pdf-izquierda">
//             //                     <div class="vertical-line-pdf"
//             //                         style="height: 30px;"></div>
//             //                     <span>0</span>
//             //                 </div>
//             //                 <div class="contorno valor-${num_temas}">
//             //                     <div class="valor valor-pdf-${num_temas}"">

//             //                     </div>
//             //                 </div>
//             //                 <div
//             //                     class="linea-vertical-pdf linea-vertica-deracha">
//             //                     <div class="vertical-line-pdf"
//             //                         style="height: 30px;"></div>
//             //                     <span>100</span>
//             //                 </div>
//             //             </div>
//             //         </div>
//             //     </div>
//             // </div>`;
//             //         i = i + 1;
//             //         lista_temas_class.push(`.cuerpo-tabla-${num_temas}`)
//             //         lista_barras_temas.push(`.valor-${num_temas}`)
//             //         lista_barras_temas_pdf.push(`.valor-pdf-${num_temas}`)
//             //         num_temas = num_temas + 1;

//             //     })

//             // })
//             // estandares.innerHTML = outEstandares;
//             // estandares_pdf.innerHTML = outEstandares_pdf;
//             // //para la TABLA CLASIFICACION de Temas 
//             // let numero_temas = 0;
//             // objeto_resp.forEach(datos_preguntas => {//recorremos DIMENSIONES
//             //     datos_preguntas.temas.forEach(element => {//recorremos TEMAS
//             //         const cargarIndicadores = document.querySelector(lista_temas_class[numero_temas]);
//             //         let outCargarIndicadores = '';
//             //         //console.log(element.nivel_1)
//             //         let valor_barra = (element.nivel_1 * 100)
//             //         //console.log(valor_barra)
//             //         //cambiar el color a las barras
//             //         // if (valor_barra == -100) {
//             //         //     //es
//             //         //     // document.querySelector(lista_barras_temas[numero_temas]).innerHTML = "Tema No Evaluado"
//             //         // }
//             //         if (valor_barra < 33) {
//             //             document.querySelector(lista_barras_temas[numero_temas]).style.background = "red"
//             //             document.querySelector(lista_barras_temas_pdf[numero_temas]).style.background = "red"
//             //         } else if (valor_barra > 66) {
//             //             document.querySelector(lista_barras_temas[numero_temas]).style.background = "green"
//             //             document.querySelector(lista_barras_temas_pdf[numero_temas]).style.background = "green"
//             //         } else {
//             //             document.querySelector(lista_barras_temas[numero_temas]).style.background = "yellow"
//             //             document.querySelector(lista_barras_temas_pdf[numero_temas]).style.background = "yellow"
//             //         }
//             //         document.querySelector(lista_barras_temas[numero_temas]).style.width = valor_barra + "%";//para mostrar el resultados de cada TEMA en una BARRA
//             //         document.querySelector(lista_barras_temas_pdf[numero_temas]).style.width = valor_barra + "%";
//             //         element.indicadores.forEach(ind => {//recorremos indicadores
//             //             //console.log(ind.indicador)
//             //             //console.log(ind.valor_1_formula)
//             //             if (ind.valor_1_formula == null) {
//             //                 // outCargarIndicadores += `<div class="cuerpo-fila">
//             //                 //                             <span class="contendio-1">${ind.indicador}</span>
//             //                 //                             <span class="contenido-2 visto-no-registrado">
//             //                 //                                 No Registrado
//             //                 //                             </span>
//             //                 //                         </div>`;
//             //             } else if (ind.valor_1_formula > 0.1) {
//             //                 outCargarIndicadores += `<div class="cuerpo-fila">
//             //             <span class="contendio-1">${ind.indicador}</span>
//             //             <span class="contenido-2 visto-bueno"><i class="fas fa-check-circle"></i>
//             //                 <div class="texto-emergente-indicador emergente-bueno">
//             //                     Integración Alta
//             //                 </div>
//             //             </span>
//             //         </div>`;
//             //             } else if (ind.valor_1_formula < 0.0199) {
//             //                 outCargarIndicadores += `<div class="cuerpo-fila">
//             //             <span class="contendio-1">${ind.indicador}</span>
//             //             <span class="contenido-2 visto-malo"><i class="fas fa-times-circle"></i>
//             //                 <div class="texto-emergente-indicador emergente-malo">
//             //                     Integración Baja
//             //                 </div>
//             //             </span>
//             //         </div>`;
//             //             } else {
//             //                 outCargarIndicadores += `<div class="cuerpo-fila">
//             //             <span class="contendio-1">${ind.indicador}</span>
//             //             <span class="contenido-2 visto-regular"><i class="fas fa-minus-circle"></i>
//             //                 <div class="texto-emergente-indicador emergente-regular">
//             //                     Integración Media
//             //                 </div>
//             //             </span>
//             //         </div>`;
//             //             }

//             //         })
//             //         cargarIndicadores.innerHTML = outCargarIndicadores;
//             //         numero_temas = numero_temas + 1;
//             //     })
//             // })
//             //funciones para graficar
//             // setTimeout(() => {
//             //     //llamamos a la funcion de Graficar
//             //     // _____________________________
//             //     // barra horizontal
//             //     graficar_barras();
//             //     // circular 
//             //     grafica_circular_valor_total()//para la barra de progreso circular TOTAL
//             //     grafica_circular_valor_dim_social()//barra de progreso circular SOCIAL
//             //     grafica_circular_valor_dim_ambental()//barra de progreso circular AMBIENTAL
//             //     // barra vertical
//             //     grafica_bar_vertical();
//             //     // grafica_bar_vertical_pdf();
//             //     // barra horizontal
//             //     grafica_barra_horixzontal();
//             //     // radar
//             //     grafica_radar();
//             //     // grafica_radar_pdf();
//             //     // zoomable
//             //     grafica_zoomable();
//             //     // retroalimenatciones
//             //     obtener_retroalimenatcion();
//             //     //mostrar panel
//             //     mostrar_resultados();
//             //     // copiar en PDF 
//             //     copiar_pdf();
//             // }, 2000)
//             // _____________________________
//             // //-------------- MODAL Inicio -------------------
//             // setTimeout(() => {
//             //     //LINK demora: https://stackoverflow.com/questions/48295288/how-to-handle-single-click-and-double-click-on-the-same-html-dom-element-usi
//             //     const mostrar_info_indicadores = function () {
//             //         this.timer = 0;
//             //         this.preventSimpleClick = false;
//             //         let delay = 300;
//             //         this.timer = setTimeout(() => {
//             //             if (!this.preventSimpleClick) {
//             //                 this.classList.toggle('active')//solo esto es para abrir los INDICADORES el resto es para la demora
//             //             }
//             //         }, delay);
//             //     }

//             //     //obtenemos los datos de las filas de estadnares
//             //     const mostrar_modal_info = function (evento) {
//             //         this.preventSimpleClick = true;//para la demora
//             //         clearTimeout(this.timer);//para la demora
//             //         //--- obtenner un PADRE ESPECIFICO Inicio ---
//             //         var padre = evento.srcElement.parentNode//obtenemos el primer padre
//             //         //console.log(padre)
//             //         var class_name = padre.className.split(" ")[0];
//             //         while (class_name != 'info-tema') {//comparamos si es el padre que buscamos
//             //             padre = padre.parentNode;//obtenemos el siguiente padre en caso de que no se el que buscamos 
//             //             class_name = padre.className.split(" ")[0];
//             //         }
//             //         //console.log(padre.firstElementChild.textContent)
//             //         //--- obtenner un PADRE ESPECIFICO Fin ---
//             //         //--- Mostrar Retroalimenatcion de acuerdo al TEMA --
//             //         fetch(`${link_service}consultas/listarTemas`)//obtenemos que indicadores son respondidos
//             //             .then(respuesta => respuesta.json())
//             //             .then(data => {
//             //                 data.forEach(element => {
//             //                     var nombre_1 = element.nombre;
//             //                     var nombre_2 = padre.children[0].children[1].textContent;
//             //                     var valor = padre.children[1].textContent.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
//             //                     if (nombre_1 == nombre_2) {
//             //                         if (valor > 66) {
//             //                             document.querySelector(".retoalimentacion-tema").innerHTML = "Este tema se aplica en gran parte de su empresa por lo que su empresa ya es considerada como una empresa sustentable y responsable.";

//             //                         } else if (valor < 33) {
//             //                             document.querySelector(".retoalimentacion-tema").innerHTML = "Este tema no se aplica en su empresa por lo que se sugiere empezar a trabar en este tema.";
//             //                         } else {
//             //                             document.querySelector(".retoalimentacion-tema").innerHTML = "Este tema se aplica de forma media por lo que se sugiere mejorar en ciertos aspectos respecto a este tema, para alcanzar un nivel óptimo de RSE.";
//             //                         }
//             //                     }

//             //                 })

//             //             })
//             //         document.querySelector(".titulo-modal-info-span").innerHTML = padre.firstElementChild.textContent;//para mostrar el nombre del TEMA en el MODALS
//             //         document.getElementById("modal-info-id").style.visibility = "visible";
//             //         document.getElementById("modal-info-id").style.opacity = "1";
//             //         //document.getElementById("cotendor-modal-info-id").transform = "translateY(0%)";
//             //     }
//             //     // boton_mostrar_modal es un arreglo así que lo recorremos
//             //     const boton_mostrar_modal = document.querySelectorAll(".info-tema");
//             //     boton_mostrar_modal.forEach(boton => {
//             //         //Agregar listener
//             //         boton.addEventListener("dblclick", mostrar_modal_info);
//             //     });
//             //     const conte_indica = document.getElementsByClassName('info-tema')
//             //     for (m = 0; m < conte_indica.length; m++) {
//             //         conte_indica[m].addEventListener('click', mostrar_info_indicadores)
//             //     }

//             //     document.getElementById("cerrar-modal").addEventListener('click', () => {
//             //         document.getElementById("modal-info-id").style.visibility = "hidden";
//             //         document.getElementById("modal-info-id").style.opacity = "0";
//             //         //document.getElementById("cotendor-modal-info-id").transform = "translateY(-30%)";
//             //     })

//             // }, 1500)
//         } 
//         // else {
//         //     document.getElementById('loader-resultados').innerHTML = `<div class="loader-mensaje-error">
//         //     Tiene que responder al menos una pregunta de cada dimensión (Social, Ambiental), para acceder a este apartado.
//         // </div>`
//         // }
//     })()
//     //-------------- MODAL Fin -------------------
// }

function mostrar_resultados() {
    document.getElementById('contenido-resultados').style.display = "block";
    document.getElementById('loader-resultados').style.display = "none";
}

////------------------Select GRAFICAS TEMAS----------------------------
function cargar_graficas_temas() {
    var combo = document.getElementById("selector");
    var selected = combo.options[combo.selectedIndex].text;
    if (selected == 'Radar') {
        document.getElementById('grafica-radar').style.display = 'block'
        document.getElementById('grafica-polar').style.display = 'none'
    }
    else if (selected == 'Circular') {
        document.getElementById('grafica-radar').style.display = 'none'
        document.getElementById('grafica-polar').style.display = 'block'
    }
    else if (selected == 'Todo') {
        document.getElementById('grafica-radar').style.display = 'block'
        document.getElementById('grafica-polar').style.display = 'block'
    }
}
////------------------Select GRAFICAS DIMENSIONES----------------------------
function cargar_graficas_dimensiones() {
    var combo = document.getElementById("selector_dim_bar");
    var selected = combo.options[combo.selectedIndex].text;
    if (selected == 'Bar-Horizontal') {
        document.getElementById('grafica-bar-horizontal').style.display = 'block'
        document.getElementById('grafica-bar-vertical').style.display = 'none'
    }
    else if (selected == 'Bar-Vertical') {
        document.getElementById('grafica-bar-horizontal').style.display = 'none'
        document.getElementById('grafica-bar-vertical').style.display = 'block'
    }
    // else if (selected == 'Barras') {
    //     document.getElementById('grafica-bar-horizontal').style.display = 'block'
    //     document.getElementById('grafica-bar-vertical').style.display = 'block'
    // }
}

////-----------------MENU-----------------------------
function menuToggle() {
    const toggleMenu = document.querySelector('.menu-salir');
    toggleMenu.classList.toggle('active')
}
// ______________TAB_____
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

//_____________segundo TAB___________________
var tabs_1 = document.querySelectorAll(".tabs-1 ul li");
var tab_wraps_1 = document.querySelectorAll(".tab_wrap_1");
tabs_1.forEach(function (tab, tab_index) {
    tab.addEventListener("click", function () {
        tabs_1.forEach(function (tab) {
            tab.classList.remove("active");
        })
        tab.classList.add("active");

        tab_wraps_1.forEach(function (content, content_index) {
            if (content_index == tab_index) {
                content.style.display = "block";
            }
            else {
                content.style.display = "none";
            }
        })

    })
})



//____________________
/*
var ctx = document.getElementById('marksChart_2').getContext('2d');

var chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: resultados_nivel_2,
            backgroundColor: ['#42a5f5', 'rgba(26,129,102,0.2)',],
            label: 'Comparacion Dimensiones'
        }],
        labels: ['Social', 'Ambiental']
    },
    options: { responsive: true }
});

*/



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