const info_retroalimenatcion_general = document.querySelector(".info-total")
// console.log(info_retroalimenatcion_general)
function ocultar_elementos() {
    var informacion = document.querySelector('.content-tabs')
    informacion.style.background = "#fff"
    informacion.style.border = "1px solid #fff"
    informacion.style.padding = "0px"

    var reporte_general = document.getElementById('reporte-general');
    var reporte_dimensiones = document.getElementById('reporte-dimenciones');
    var reporte_graficas = document.getElementById('reporte-graficas');
    var barra_principal = document.querySelector('.tabs');
    var barra_graficas = document.querySelector('.tabs-1');
    var graficas_temas = document.getElementById('reporte_graficas_temas');
    var graficas_dimensiones = document.getElementById('reporte_graficas_dimensiones');
    var selecionador_graficas_dim = document.getElementById('selector');
    var selecionador_graficas_temas = document.getElementById('selector_dim_bar');

    var grafica_radar_temas = document.getElementById('grafica-radar')
    var grafica_bar_horizontal_temas = document.getElementById('grafica-bar-vertical');

    var imagen_temas = document.querySelectorAll('.imagen');

    reporte_general.style.display = "block"
    reporte_dimensiones.style.display = "block"
    reporte_graficas.style.display = "block"

    reporte_dimensiones.style.marginTop = "40px"
    // reporte_dimensiones.style.background = "green"

    reporte_graficas.style.marginTop = "350px"
    // reporte_graficas.style.background = 'yellow'

    barra_principal.style.display = "none";
    barra_graficas.style.display = "none";
    grafica_radar_temas.style.display = "block";
    grafica_bar_horizontal_temas.style.display = "none";
    graficas_temas.style.display = "block";
    graficas_dimensiones.style.display = "block";
    selecionador_graficas_dim.style.display = "none";
    selecionador_graficas_temas.style.display = "none";

    // imagen_temas.style.display = "none"
    // imagen_temas.forEach(function(imagen) {
    //     imagen.style.display = "none"
    //   });
}

function mostrar_elementos() {
    var informacion = document.querySelector('.content-tabs')

    var reporte_general = document.getElementById('reporte-general');
    var reporte_dimensiones = document.getElementById('reporte-dimenciones');
    var reporte_graficas = document.getElementById('reporte-graficas');
    var barra_principal = document.querySelector('.tabs');
    var barra_graficas = document.querySelector('.tabs-1');
    var graficas_temas = document.getElementById('reporte_graficas_temas');
    var graficas_dimensiones = document.getElementById('reporte_graficas_dimensiones');
    var selecionador_graficas_dim = document.getElementById('selector');
    var selecionador_graficas_temas = document.getElementById('selector_dim_bar');

    var grafica_radar_temas = document.getElementById('grafica-radar')
    var grafica_bar_horizontal_temas = document.getElementById('grafica-bar-vertical');

    var imagen_temas = document.querySelectorAll('.imagen');


    // var dowloand = document.querySelector('.content-tabs')
    reporte_general.style.display = "block"
    reporte_dimensiones.style.display = "none"
    reporte_graficas.style.display = "none"

    reporte_dimensiones.style.marginTop = "0px"
    reporte_dimensiones.style.background = "none"

    reporte_graficas.style.marginTop = "0px"
    reporte_graficas.style.background = 'none'

    barra_principal.style.display = "block";
    barra_graficas.style.display = "block"
    grafica_radar_temas.style.display = "none"
    grafica_bar_horizontal_temas.style.display = "none"
    graficas_temas.style.display = "block";
    graficas_dimensiones.style.display = "none";
    selecionador_graficas_dim.style.display = "block";
    selecionador_graficas_temas.style.display = "block";

    // imagen_temas.forEach(function(imagen) {
    //     imagen.style.display = "block"
    //   });

    informacion.style.background = "#fbfbfb"
    informacion.style.border = "1px solid #dddddd"
    informacion.style.padding = "20px"
}

function enviarPDF() {
    // para mostrar el modal cargando 
    mostrar_modal_cargando();
    // para ocultar los elemteos
    ocultar_elementos();

    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            const html = document.getElementById('generar-pdf')
            console.log(html);
            console.log("1. -> Paso");
            resolve(html)
        }, 2000)


    })

    promesa
        .then(res => {
            const promesa_2 = new Promise((resolve_2, reject) => {
                html2pdf()
                    .set({
                        margin: [0, 1],
                        filenama: 'documento.pdf',
                        image: {
                            type: 'jpeg',
                            quality: 0.98
                        },
                        html2canvas: {
                            scale: 2,
                            letterRedering: true
                        },
                        jsPDF: {
                            unit: "in",
                            format: "a2",
                            orientation: 'portrait' // landscape o portrait
                        }
                    })
                    .from(res)
                    .toPdf().output('datauristring').then(function (pdfAsString) {
                        let data = {
                            'fileDataURI': pdfAsString,
                        };
                        console.log(data);
                        $.post("../php/main.php", data);
                        console.log(data);
                        // alert("Enviado... ")
                    });
            })

            promesa_2
                .then(res_2 => {
                    console.log(res_2)
                    console.log("3. -> Paso");
                    //para mostrar los elemenots 
                    mostrar_elementos();
                    // para mostrar el modal 
                    completado();
                })


        })
}


function descargarPDF() {
    // para mostrar el modal cargando 
    mostrar_modal_cargando();
    // para ocultar los elemteos
    ocultar_elementos();

    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            const html = document.getElementById('generar-pdf')
            console.log(html);
            console.log("1. -> Paso");
            resolve(html)
        }, 2000)


    })

    promesa
        .then(res => {
            const promesa_2 = new Promise((resolve_2, reject) => {
                html2pdf()
                    .set({
                        margin: [0, 1],
                        filenama: 'documento.pdf',
                        image: {
                            type: 'jpeg',
                            quality: 0.98
                        },
                        html2canvas: {
                            scale: 2,
                            letterRedering: true
                        },
                        jsPDF: {
                            unit: "in",
                            format: "a2",
                            orientation: 'portrait' // landscape o portrait
                        }
                    })
                    .from(res)
                    .save()
                    .then(() => {
                        console.log("2. -> Paso");
                        resolve_2("Descargado.");
                    }
                    )
                    .catch(err => console.log(err))
            })

            promesa_2
                .then(res_2 => {
                    console.log(res_2)
                    console.log("3. -> Paso");
                    //para mostrar los elemenots 
                    mostrar_elementos();
                    // para mostrar el modal 
                    completado();
                })


        })
}

function imprimirPDF() {
    // para mostrar el modal cargando 
    mostrar_modal_cargando();
    // para ocultar los elemteos
    ocultar_elementos();

    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            const html = document.getElementById('generar-pdf')
            console.log(html);
            console.log("1. -> Paso");
            resolve(html)
        }, 2000)


    })

    promesa
        .then(res => {
            const promesa_2 = new Promise((resolve_2, reject) => {
                html2pdf()
                    .set({
                        margin: [0, 1],
                        filenama: 'documento.pdf',
                        image: {
                            type: 'jpeg',
                            quality: 0.98
                        },
                        html2canvas: {
                            scale: 2,
                            letterRedering: true
                        },
                        jsPDF: {
                            unit: "in",
                            format: "a2",
                            orientation: 'portrait' // landscape o portrait
                        }
                    })
                    .from(res)
                    // this code we can open PDF in a new page and print
                    .toPdf().get('pdf').then(function (pdfObj) {
                        // pdfObj has your jsPDF object in it, use it as you please!
                        // For instance (untested):
                        completado();
                        mostrar_elementos();
                        pdfObj.autoPrint();
                        window.open(pdfObj.output('bloburl'), '_blank');
                    });

                // this code is just to open de PDF in another page
                // .toPdf().get('pdf').then(function (pdf) {
                //     window.open(pdf.output('bloburl'), '_blank');
                // });
            })

            promesa_2
                .then(res_2 => {
                    console.log(res_2)
                    console.log("3. -> Paso");
                    //para mostrar los elemenots 
                    // para mostrar el modal 

                })


        })

}

// para obtener las respuestas

//Obtenemos el USUARIO de la URL
function obtener_valor(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



var usuario_ID = obtener_valor("usuario");//OBtenemos el ID de la URLs
// console.log(usuario_ID)
// buscamos el Encuestado ID de acuerod al usuario ID
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
        encuestado_ID = data.encuestado.encuestado_ID;//guardamos el ID del encuestado
        // console.log(encuestado_ID);
    })
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

function descargarExcel() {
    // para mostrar el modal cargando 
    mostrar_modal_cargando();
    // para ocultar los elemteos
    ocultar_elementos();

    (async function () {
        // const info_temas = await getTemas();
        // const info_indicadores = await getIndicadores();
        const info_preguntas_respondidas = await getRespuestas();
        // console.log(info_preguntas_respondidas);

        // console.log(resutaldo_final)//resulatdo final
        // console.log(objeto_resp)//resulatdo dimensiones y otros
        // console.log(respuesta_final_2) // resultado final con todas las practicas de RSE

        var lista_resultados = [];
        lista_resultados.push([])
        lista_resultados.push([])
        setTimeout(() => {
            var lista_titulo = ['Integración Global.', 'Integración Especifica.'];
            var lista_valores = [(objeto_datos_evaluacion_graficas_COMPLETA.resultado_final) * 100, (objeto_datos_evaluacion_graficas.resultado_final) * 100];

            // we save the dimenstions informartion first 
            objeto_datos_evaluacion_graficas.dimensiones_resultados.forEach(dimesnion => {// datos de las Dimesniones
                var titulo = 'Integración ' + dimesnion.nom_dimension_evaluada;
                lista_titulo.push(titulo);// agregamos el nombre de la dimension;
                lista_valores.push(dimesnion.resultado_dimension * 100); // agregamos el valor de la dimension
            })
            lista_resultados.push(lista_titulo);
            lista_resultados.push(lista_valores);

            // then we save the data about topics
            objeto_datos_evaluacion_graficas.dimensiones_resultados.forEach(dimesnion => {// datos de las Dimesniones
                // console.log(dimesnion.dimension);
                // console.log(dimesnion.nivel_2 * 100);
                //guardamos el nombre de lsa dimensiones
                lista_resultados.push([])
                lista_resultados.push([])
                lista_resultados.push(["Dimensión " + dimesnion.nom_dimension_evaluada + "."])
                lista_resultados.push([])
                dimesnion.temas_resultados.forEach(tema => {// datos de los Temas
                    var tema_nom_valor = [];
                    // console.log(tema.nombre);
                    // console.log(tema.nivel_1 * 100);
                    tema_nom_valor.push(tema.nom_tema_evaluado);
                    tema_nom_valor.push(tema.resultado_tema_formula * 100);
                    lista_resultados.push(tema_nom_valor);
                })
            })
            console.log(lista_resultados)

            lista_resultados.push([])
            lista_resultados.push([])

            lista_resultados.push(['Preguntas Respondidas.', 'Respuesta.', 'Tema', 'Dimensión'])
            lista_resultados.push([])
            // saving quesrtions results
            info_preguntas_respondidas.forEach(repuetas_guardadas => {//recorremos todas las respuestas
                //comparamos el indicador y el usuario para saber que indicador ha sido respondido 
                var pregunta_respuesta = [];
                if (repuetas_guardadas.respuestasaIndicadores.encuestado.encuestado_ID == encuestado_ID) {
                    //  console.log("--    " + repuetas_guardadas.respuestasaIndicadores.encuestado.encuestado_ID+ " " + repuetas_guardadas.preguntasCualitativas.pregunta_cualitativa + ":    " + repuetas_guardadas.respuesta);
                    //  console.log(repuetas_guardadas.respuestasaIndicadores.indicador.tema.nombre)
                    //  console.log(repuetas_guardadas.respuestasaIndicadores.indicador.tema.dimension.nombre)
                    var respuesta;
                    if (repuetas_guardadas.respuesta == 2) {
                        respuesta = 'Si';
                    } else if (repuetas_guardadas.respuesta == 1) {
                        respuesta = "Parcial";
                    } else if (repuetas_guardadas.respuesta == 0) {
                        respuesta = 'No';
                    } else {
                        respuesta = 'No Aplica';
                    }
                    // saving the question and the value
                    pregunta_respuesta.push(repuetas_guardadas.preguntasCualitativas.pregunta_cualitativa);
                    pregunta_respuesta.push(respuesta);
                    pregunta_respuesta.push(repuetas_guardadas.respuestasaIndicadores.indicador.tema.nombre);// saving the topic
                    pregunta_respuesta.push(repuetas_guardadas.respuestasaIndicadores.indicador.tema.dimension.nombre);// saving the dimention

                    // saving the the questions with its value in the final array
                    lista_resultados.push(pregunta_respuesta);
                }
            })
            // show the results by consol

            // console.log(lista_resultados);

            var wb = XLSX.utils.book_new();
            wb.Props = {
                Title: "SheetJS Tutorial",
                Subject: "Test",
                Author: "Red Stapler",
                CreatedDate: new Date(2017, 12, 19)
            };

            wb.SheetNames.push("Test Sheet");
            // var ws_data = [['hello', 'world'],['1', '2'],['4', '5','7','8']];
            var ws = XLSX.utils.aoa_to_sheet(lista_resultados);
            wb.Sheets["Test Sheet"] = ws;


            var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'resultados.xlsx');
            // para indicar en el MODAL que se ha completado la operacion
            completado();
            mostrar_elementos();// para volver a cargar todos los Resultados en la vista 
        }, 0000)
    })()
}

//PDF modal
const abri_pdf = document.getElementById("abrir_pdf");
const modal_pdf = document.getElementById("modal-pdf-id");
const contenedor_modal_pdf = document.getElementById("cotendor-modal-pdf-id");
// const cerrar_pdf_2 = document.getElementById("cerrar_pdf_2");
const cerrar_pdf = document.getElementById("cerrar_pdf");
//document.getElementById('table-temas').style.display = 'block'
abri_pdf.addEventListener('click', () => {
    modal_pdf.style.visibility = "visible";
    modal_pdf.style.opacity = "1";
    contenedor_modal_pdf.style.transform = "translateY(0%)"
})

cerrar_pdf.addEventListener('click', () => {
    modal_pdf.style.visibility = "hidden";
    modal_pdf.style.opacity = "0";
    contenedor_modal_pdf.style.transform = "translateY(-30%)"
})


//obtenemos la info del Usuario
async function getDataUsuarioPDF(usuario_ID) {
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

function copiar_pdf() {
    var nombre_usuario = document.querySelector('.nombre-user').textContent;
    var correo_usuario = document.querySelector('.correo-user').textContent;

    document.querySelector('.nombre-usuario').innerHTML = nombre_usuario;
    document.querySelector('.correo-usuario').innerHTML = correo_usuario;

    // console.log(usuario_ID);

    (async function () {
        const datos_empresa = await getDataUsuarioPDF(usuario_ID);
        document.querySelector('.nombre-empresa').innerHTML = `<label>Nombre:</label><span>${datos_empresa.encuestado.empresa.nombre}</span>`;
        document.querySelector('.sector-empresa').innerHTML = `<label>Sector:</label><span>${datos_empresa.encuestado.empresa.sector_tipo}</span>`;
        document.querySelector('.num-empleados-empresa').innerHTML = `<label>Numero de Empleados:</label><span>${datos_empresa.encuestado.empresa.numero_empleados}</span>`;
        document.querySelector('.ruc-empresa').innerHTML = `<label>RUC:</label><span>${datos_empresa.encuestado.empresa.ruc_empresa}</span>`;

    })()

    setTimeout(() => {
        //we charge info general 
        const info_general = document.querySelector('.info-especifico').parentElement.innerHTML;
        // console.log(info_general)
        document.querySelector('.informacion-general').innerHTML = `${info_general}`;

        //we charge dimentions info 
        const info_dimensiones = document.querySelector('.puntaje-dimensiones').parentElement.innerHTML;
        document.querySelector('.info-desmepeno-dimensiones').innerHTML = `${info_dimensiones}`;

        //cargmos graficas dimensiones
        const grafica_dim_1 = document.querySelector('.grafica-bar-horizontal').parentElement.innerHTML;
        document.querySelector('.grafica-bar-dim-ver-pdf').innerHTML = `${grafica_dim_1}`;

        // const grafica_dim_2 = document.getElementById('grafica-bar-vertical').parentElement.innerHTML;
        // document.querySelector('.grafica-bar-dim-hor-pdf').innerHTML = `${grafica_dim_2}`;

        //graficas temas 
        const grafica_temas_1 = document.querySelector('.grafica-zoomable-sunburst').parentElement.innerHTML;
        document.getElementById('grafica_circular-pdf').innerHTML = `${grafica_temas_1}`;

        // const grafica_temas_2 = document.getElementById('grafica-radar').parentElement.innerHTML;
        // console.log(grafica_temas_2)
        // document.getElementById('grafica_radar-pdf').innerHTML = `${grafica_temas_2}`;
        //grafica-bar-vertical
        //grafica-bar-horizontal

    }, 2000)
}

function cargar_info_PDF() {
    // var nombre_usuario = document.querySelector('.nombre-user').textContent;
    // var correo_usuario = document.querySelector('.correo-user').textContent;

    // document.querySelector('.nombre-usuario').innerHTML = nombre_usuario;
    // document.querySelector('.correo-usuario').innerHTML = correo_usuario;

    // console.log(usuario_ID);

    // (async function (){
    //     const datos_empresa = await getDataUsuarioPDF(usuario_ID);
    //     document.querySelector('.nombre-empresa').innerHTML = `<label>Nombre:</label><span>${datos_empresa.encuestado.empresa.nombre}</span>`;
    //     document.querySelector('.sector-empresa').innerHTML = `<label>Sector:</label><span>${datos_empresa.encuestado.empresa.sector_tipo}</span>`;
    //     document.querySelector('.num-empleados-empresa').innerHTML = `<label>Numero de Empleados:</label><span>${datos_empresa.encuestado.empresa.numero_empleados}</span>`;
    //     document.querySelector('.ruc-empresa').innerHTML = `<label>RUC:</label><span>${datos_empresa.encuestado.empresa.ruc_empresa}</span>`;

    // })()


    //obtenemos la retroalimentacion
    // var retroalimentacion_general = document.querySelector('.retroalimentacion-general').textContent;
    // var retroalimentacion_social = document.querySelector('.retroalimentacion-social').textContent;
    // var retroalimentacion_ambiental = document.querySelector('.retroalimentacion-ambiental').textContent;

    // document.querySelector('.retroalimentacion-general-pdf').innerHTML = retroalimentacion_general;
    // document.querySelector('.retroalimentacion-social-pdf').innerHTML = retroalimentacion_social;
    // document.querySelector('.retroalimentacion-ambiental-pdf').innerHTML = retroalimentacion_ambiental;
}