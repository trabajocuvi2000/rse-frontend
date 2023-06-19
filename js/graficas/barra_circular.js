


//console.log(resutaldo_final)//resulatdo final
//console.log(objeto_resp)//resulatdo dimensiones y otros
//console.log(objeto_resp[1].nivel_2*100)//social
//console.log(objeto_resp[0].nivel_2*100)//ambiental

function grafica_circular() {
    function radialProgress(selector, ancho, alto, centro, gorsor, letra) {
        var anchura = ancho;
        var altura = alto;

        const parent = d3.select(selector)
        const size = parent.node().getBoundingClientRect()
        const svg = parent.append('svg')
            .attr('width', anchura)
            .attr('height', altura);
        const outerRadius = Math.min(anchura, altura) * 0.45;
        const thickness = gorsor;//10 anchura
        let value = 0;

        const mainArc = d3.arc()
            .startAngle(0)
            .endAngle(Math.PI * 2)
            .innerRadius(outerRadius - thickness)
            .outerRadius(outerRadius)

        svg.append("path")
            .attr('class', 'progress-bar-bg')
            .attr('transform', `translate(${anchura / 2},${altura / 2})`)
            .attr('d', mainArc())

        const mainArcPath = svg.append("path")
            .attr('class', 'progress-bar')
            .attr('transform', `translate(${anchura / 2},${altura / 2})`)

        svg.append("circle")
            .attr('class', 'progress-bar')
            .attr('transform', `translate(${anchura / 2},${altura / 2 - outerRadius + thickness / 2})`)
            .attr('width', thickness)
            .attr('height', thickness)
            .attr('r', thickness / 2)

        const end = svg.append("circle")
            .attr('class', 'progress-bar')
            .attr('transform', `translate(${anchura / 2},${altura / 2 - outerRadius + thickness / 2})`)
            .attr('width', thickness)
            .attr('height', thickness)
            .attr('r', thickness / 2)

        let percentLabel = svg.append("text")
            .attr('class', 'progress-label')
            .style("font-size", letra)
            .attr('transform', `translate(${anchura / 2},${anchura + centro})`)//en 238 antes estaba -> anchura / 2
            .text('0')

        return {
            update: function (progressPercent) {
                const startValue = value
                const startAngle = Math.PI * startValue / 50
                const angleDiff = Math.PI * progressPercent / 50 - startAngle;
                const startAngleDeg = startAngle / Math.PI * 180
                const angleDiffDeg = angleDiff / Math.PI * 180
                const transitionDuration = 1500

                mainArcPath.transition().duration(transitionDuration).attrTween('d', function () {
                    return function (t) {
                        mainArc.endAngle(startAngle + angleDiff * t)
                        return mainArc();
                    }
                })
                end.transition().duration(transitionDuration).attrTween('transform', function () {
                    return function (t) {
                        return `translate(${anchura / 2},${altura / 2})` +
                            `rotate(${(startAngleDeg + angleDiffDeg * t)})` +
                            `translate(0,-${outerRadius - thickness / 2})`
                    }
                })
                percentLabel.transition().duration(transitionDuration).tween('bla', function () {
                    return function (t) {
                        //percentLabel.text(progressPercent+'%');
                        percentLabel.text((Math.round(startValue + (progressPercent - startValue) * t)) + '%');
                    }
                })
                value = progressPercent
            }
        }
    }

    // let chart = radialProgress('.char-barra-cirular')
    // chart.update(resutaldo_final * 100)

    let chart_especifico = radialProgress('.char-barra-cirular-especifico', 180, 470, 73, 12, 36)
    chart_especifico.update(objeto_datos_evaluacion_graficas.resultado_final * 100)

    //respuesta_final_2
    let chart_global = radialProgress('.char-barra-cirular-global',80,368,113,8,22)
    chart_global.update(objeto_datos_evaluacion_graficas_COMPLETA.resultado_final * 100)


    // Dimensiones 
    for (i = 0; i < objeto_datos_evaluacion_graficas.dimensiones_resultados.length; i++) {
        if (objeto_datos_evaluacion_graficas.dimensiones_resultados[i].nom_dimension_evaluada == "Social") {
            let chart_social = radialProgress('.barra_progreso_social', 80, 370, 113, 8, 22)
            chart_social.update(objeto_datos_evaluacion_graficas.dimensiones_resultados[i].resultado_dimension * 100);
        } else {
            let chart_ambiental = radialProgress('.barra_progreso_ambiental', 80, 370, 113, 8, 22)
            chart_ambiental.update(objeto_datos_evaluacion_graficas.dimensiones_resultados[i].resultado_dimension * 100);
        }
    }

}


// function grafica_circular_valor_dim_social() {
//     function radialProgress(selector) {
//         var anchura = 80;
//         var altura = 370;

//         const parent = d3.select(selector)
//         const size = parent.node().getBoundingClientRect()
//         const svg = parent.append('svg')
//             .attr('width', anchura)
//             .attr('height', altura);
//         const outerRadius = Math.min(anchura, altura) * 0.45;
//         const thickness = 8;//10 anchura
//         let value = 0;

//         const mainArc = d3.arc()
//             .startAngle(0)
//             .endAngle(Math.PI * 2)
//             .innerRadius(outerRadius - thickness)
//             .outerRadius(outerRadius)

//         svg.append("path")
//             .attr('class', 'progress-bar-bg')
//             .attr('transform', `translate(${anchura / 2},${altura / 2})`)
//             .attr('d', mainArc())

//         const mainArcPath = svg.append("path")
//             .attr('class', 'progress-bar')
//             .attr('transform', `translate(${anchura / 2},${altura / 2})`)

//         svg.append("circle")
//             .attr('class', 'progress-bar')
//             .attr('transform', `translate(${anchura / 2},${altura / 2 - outerRadius + thickness / 2})`)
//             .attr('width', thickness)
//             .attr('height', thickness)
//             .attr('r', thickness / 2)

//         const end = svg.append("circle")
//             .attr('class', 'progress-bar')
//             .attr('transform', `translate(${anchura / 2},${altura / 2 - outerRadius + thickness / 2})`)
//             .attr('width', thickness)
//             .attr('height', thickness)
//             .attr('r', thickness / 2)

//         let percentLabel = svg.append("text")
//             .attr('class', 'progress-label-dim')
//             .attr('transform', `translate(${anchura / 2},${anchura + 113})`)//en 238 antes estaba -> anchura / 2
//             .text('0')

//         return {
//             update: function (progressPercent) {
//                 const startValue = value
//                 const startAngle = Math.PI * startValue / 50
//                 const angleDiff = Math.PI * progressPercent / 50 - startAngle;
//                 const startAngleDeg = startAngle / Math.PI * 180
//                 const angleDiffDeg = angleDiff / Math.PI * 180
//                 const transitionDuration = 1500

//                 mainArcPath.transition().duration(transitionDuration).attrTween('d', function () {
//                     return function (t) {
//                         mainArc.endAngle(startAngle + angleDiff * t)
//                         return mainArc();
//                     }
//                 })
//                 end.transition().duration(transitionDuration).attrTween('transform', function () {
//                     return function (t) {
//                         return `translate(${anchura / 2},${altura / 2})` +
//                             `rotate(${(startAngleDeg + angleDiffDeg * t)})` +
//                             `translate(0,-${outerRadius - thickness / 2})`
//                     }
//                 })
//                 percentLabel.transition().duration(transitionDuration).tween('bla', function () {
//                     return function (t) {
//                         //percentLabel.text(progressPercent+'%');
//                         percentLabel.text((Math.round(startValue + (progressPercent - startValue) * t)) + '%');
//                     }
//                 })
//                 value = progressPercent
//             }
//         }
//     }

//     let chart = radialProgress('.barra_progreso_social')
//     chart.update(objeto_resp[0].nivel_2 * 100)

//     // let chart_pdf = radialProgress('.barra-circular-social-pdf')
//     // chart_pdf.update(objeto_resp[0].nivel_2 * 100)

//     // let chart_pdf_principal = radialProgress('.char-barra-cirular-pdf')
//     // chart_pdf_principal.update(resutaldo_final * 100)

// }

// function grafica_circular_valor_dim_ambental() {
//     function radialProgress(selector) {
//         var anchura = 80;
//         var altura = 370;

//         const parent = d3.select(selector)
//         const size = parent.node().getBoundingClientRect()
//         const svg = parent.append('svg')
//             .attr('width', anchura)
//             .attr('height', altura);
//         const outerRadius = Math.min(anchura, altura) * 0.45;
//         const thickness = 8;//10 anchura
//         let value = 0;

//         const mainArc = d3.arc()
//             .startAngle(0)
//             .endAngle(Math.PI * 2)
//             .innerRadius(outerRadius - thickness)
//             .outerRadius(outerRadius)

//         svg.append("path")
//             .attr('class', 'progress-bar-bg')
//             .attr('transform', `translate(${anchura / 2},${altura / 2})`)
//             .attr('d', mainArc())

//         const mainArcPath = svg.append("path")
//             .attr('class', 'progress-bar')
//             .attr('transform', `translate(${anchura / 2},${altura / 2})`)

//         svg.append("circle")
//             .attr('class', 'progress-bar')
//             .attr('transform', `translate(${anchura / 2},${altura / 2 - outerRadius + thickness / 2})`)
//             .attr('width', thickness)
//             .attr('height', thickness)
//             .attr('r', thickness / 2)

//         const end = svg.append("circle")
//             .attr('class', 'progress-bar')
//             .attr('transform', `translate(${anchura / 2},${altura / 2 - outerRadius + thickness / 2})`)
//             .attr('width', thickness)
//             .attr('height', thickness)
//             .attr('r', thickness / 2)

//         let percentLabel = svg.append("text")
//             .attr('class', 'progress-label-dim')
//             .attr('transform', `translate(${anchura / 2},${anchura + 113})`)//en 238 antes estaba -> anchura / 2
//             .text('0')

//         return {
//             update: function (progressPercent) {
//                 const startValue = value
//                 const startAngle = Math.PI * startValue / 50
//                 const angleDiff = Math.PI * progressPercent / 50 - startAngle;
//                 const startAngleDeg = startAngle / Math.PI * 180
//                 const angleDiffDeg = angleDiff / Math.PI * 180
//                 const transitionDuration = 1500

//                 mainArcPath.transition().duration(transitionDuration).attrTween('d', function () {
//                     return function (t) {
//                         mainArc.endAngle(startAngle + angleDiff * t)
//                         return mainArc();
//                     }
//                 })
//                 end.transition().duration(transitionDuration).attrTween('transform', function () {
//                     return function (t) {
//                         return `translate(${anchura / 2},${altura / 2})` +
//                             `rotate(${(startAngleDeg + angleDiffDeg * t)})` +
//                             `translate(0,-${outerRadius - thickness / 2})`
//                     }
//                 })
//                 percentLabel.transition().duration(transitionDuration).tween('bla', function () {
//                     return function (t) {
//                         //percentLabel.text(progressPercent+'%');
//                         percentLabel.text((Math.round(startValue + (progressPercent - startValue) * t)) + '%');
//                     }
//                 })
//                 value = progressPercent
//             }
//         }
//     }

//     let chart = radialProgress('.barra_progreso_ambiental')
//     chart.update(objeto_resp[1].nivel_2 * 100)

//     // let chart_pdf = radialProgress('.barra-circular-ambiental-pdf')
//     // chart_pdf.update(objeto_resp[1].nivel_2 * 100)

// }


// Dashboard
function grafica_circular_dashboard() {
    function radialProgress(selector, ancho, alto, centro, gorsor, letra) {
        var anchura = ancho;
        var altura = alto;

        const parent = d3.select(selector)
        const size = parent.node().getBoundingClientRect()
        const svg = parent.append('svg')
            .attr('width', anchura)
            .attr('height', altura);
        const outerRadius = Math.min(anchura, altura) * 0.45;
        const thickness = gorsor;//10 anchura
        let value = 0;

        const mainArc = d3.arc()
            .startAngle(0)
            .endAngle(Math.PI * 2)
            .innerRadius(outerRadius - thickness)
            .outerRadius(outerRadius)

        svg.append("path")
            .attr('class', 'progress-bar-bg')
            .attr('transform', `translate(${anchura / 2},${altura / 2})`)
            .attr('d', mainArc())

        const mainArcPath = svg.append("path")
            .attr('class', 'progress-bar')
            .attr('transform', `translate(${anchura / 2},${altura / 2})`)

        svg.append("circle")
            .attr('class', 'progress-bar')
            .attr('transform', `translate(${anchura / 2},${altura / 2 - outerRadius + thickness / 2})`)
            .attr('width', thickness)
            .attr('height', thickness)
            .attr('r', thickness / 2)

        const end = svg.append("circle")
            .attr('class', 'progress-bar')
            .attr('transform', `translate(${anchura / 2},${altura / 2 - outerRadius + thickness / 2})`)
            .attr('width', thickness)
            .attr('height', thickness)
            .attr('r', thickness / 2)

        let percentLabel = svg.append("text")
            .attr('class', 'progress-label')
            .style("font-size", letra)
            .attr('transform', `translate(${anchura / 2},${anchura + centro})`)//en 238 antes estaba -> anchura / 2
            .text('0')

        return {
            update: function (progressPercent) {
                const startValue = value
                const startAngle = Math.PI * startValue / 50
                const angleDiff = Math.PI * progressPercent / 50 - startAngle;
                const startAngleDeg = startAngle / Math.PI * 180
                const angleDiffDeg = angleDiff / Math.PI * 180
                const transitionDuration = 1500

                mainArcPath.transition().duration(transitionDuration).attrTween('d', function () {
                    return function (t) {
                        mainArc.endAngle(startAngle + angleDiff * t)
                        return mainArc();
                    }
                })
                end.transition().duration(transitionDuration).attrTween('transform', function () {
                    return function (t) {
                        return `translate(${anchura / 2},${altura / 2})` +
                            `rotate(${(startAngleDeg + angleDiffDeg * t)})` +
                            `translate(0,-${outerRadius - thickness / 2})`
                    }
                })
                percentLabel.transition().duration(transitionDuration).tween('bla', function () {
                    return function (t) {
                        //percentLabel.text(progressPercent+'%');
                        percentLabel.text((Math.round(startValue + (progressPercent - startValue) * t)) + '%');
                    }
                })
                value = progressPercent
            }
        }
    }

    // let chart = radialProgress('.char-barra-cirular')
    // chart.update(resutaldo_final * 100)

    let chart_especifico = radialProgress('.grafica-valor-espedifico', 100, 390, 105, 10, 25)
    chart_especifico.update(objeto_datos_evaluacion_graficas.resultado_final * 100)

    //respuesta_final_2
    console.log(objeto_datos_evaluacion_graficas_COMPLETA.resultado_fina)
    let chart_global = radialProgress('.grafica-valor-global', 100, 390, 105, 10, 25)
    chart_global.update(objeto_datos_evaluacion_graficas_COMPLETA.resultado_final * 100)

    // Dimensiones 
    for (i = 0; i < objeto_datos_evaluacion_graficas.dimensiones_resultados.length; i++) {
        if (objeto_datos_evaluacion_graficas.dimensiones_resultados[i].nom_dimension_evaluada == "Social") {
            let chart = radialProgress('.grafica-valor-dim-1', 100, 390, 105, 10, 25)
            chart.update(objeto_datos_evaluacion_graficas.dimensiones_resultados[i].resultado_dimension * 100)

        } else {

            let chart_2 = radialProgress('.grafica-valor-dim-2', 100, 390, 105, 10, 25)
            chart_2.update(objeto_datos_evaluacion_graficas.dimensiones_resultados[i].resultado_dimension * 100)
        }
    }



}
