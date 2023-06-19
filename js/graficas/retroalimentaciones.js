function obtener_retroalimenatcion() {
    //Retroalimentacion Temas
    fetch(`${link_service}consultas/listarDimensiones`)//obtenemos que indicadores son respondidos
        .then(respuesta => respuesta.json())
        .then(data => {
            data.forEach(element => {
                objeto_datos_evaluacion_graficas.dimensiones_resultados.forEach(element_1 => {
                    if (element.nombre == element_1.nom_dimension_evaluada) {
                        if (element.nombre == 'Social') {
                            if (element_1.resultado_dimension > 0.66) {
                                document.querySelector('.retroalimentacion-social').innerHTML = `Esta dimensión se aplica en gran parte de su empresa por lo que su empresa ya es considerada como una empresa sustentable y responsable.`;
                            } else if (element_1.resultado_dimension > 0.33 && element_1.resultado_dimension < 0.66 ) {
                                document.querySelector('.retroalimentacion-social').innerHTML = `Esta dimensión se aplica de forma media por lo que se sugiere mejorar en ciertos aspectos respecto a esta dimensión, para alcanzar un nivel óptimo de RSE.`;
                            } else {
                                document.querySelector('.retroalimentacion-social').innerHTML = 'Esta dimensión no se aplica en su empresa por lo que se sugiere empezar a trabar en esta dimensión.';
                            }
                        } else {
                            if (element_1.resultado_dimension > 0.66) {
                                document.querySelector('.retroalimentacion-ambiental').innerHTML = 'Esta dimensión se aplica en gran parte de su empresa por lo que su empresa ya es considerada como una empresa sustentable y responsable.';
                            } 
                            if (  element_1.resultado_dimension > 0.33 && element_1.resultado_dimension < 0.66 ) {
                                document.querySelector('.retroalimentacion-ambiental').innerHTML = `Esta dimensión se aplica de forma media por lo que se sugiere mejorar en ciertos aspectos respecto a esta dimensión, para alcanzar un nivel óptimo de RSE.`;
                            } 
                            if(element_1.resultado_dimension < 0.33) {
                                document.querySelector('.retroalimentacion-ambiental').innerHTML = 'Esta dimensión no se aplica en su empresa por lo que se sugiere empezar a trabar en esta dimensión.';
                            }
                        }

                    }
                })

                // if (element.nombre == "Social") {

                // } else if (element.nombre == "Ambiental") {

                // }
            })
        })
}