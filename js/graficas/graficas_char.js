
function grafica_radar() {
    //console.log(resutaldo_final)//resulatdo final
    //console.log(objeto_resp)//resulatdo dimensiones y otros

    let nombre_temas = []
    //let valores_temas = []
    let valores_temas = []
    let valores_temas_ambientales = []
    objeto_datos_evaluacion_graficas.dimensiones_resultados.forEach(datos_preguntas => {//recorremos DIMENSIONES
        datos_preguntas.temas_resultados.forEach(element => {//recorremos TEMAS
            nombre_temas.push(element.nom_tema_evaluado)//guardamos los nombres de los temas

            if(element.resultado_tema_formula !=-1){
                const object = {
                    x: element.nom_tema_evaluado,
                    value: (element.resultado_tema_formula * 100).toFixed(2)
                }
                valores_temas.push(object)//guardamos los valores de los temas SOCIALES
            }else{
                const object = {
                    x: element.nom_tema_evaluado,
                    value: 0
                }
                valores_temas.push(object)//guardamos los valores de los temas SOCIALES
            }
            
            
        })
    })

    // console.log(valores_temas_ambientales)
    // console.log(valores_temas)
    //Grafica RADAR
    // var ctx = document.getElementById('marksChart_1').getContext('2d');
    // var myChart = new Chart(ctx, {
    //     //type: 'line',
    //     //type: 'bar',
    //     type: 'radar',
    //     data: {
    //         labels: nombre_temas,
    //         datasets: [{
    //             label: 'Social',
    //             data: valores_temas,
    //             backgroundColor: "rgba(148, 194, 235,0.2)",
    //             borderColor: "#42a5f5",
    //             //fill:false
    //         }, {
    //             label: 'Ambiental',
    //             data: valores_temas_ambientales,
    //             backgroundColor: "rgba(26,129,102,0.2)",
    //             borderColor: "#3cba9f",
    //             //fill:false
    //         }]
    //     }
    // });
    anychart.onDocumentReady(function () {
        // our data from bulbapedia
        var data1 = [
            { x: "HP", value: 39 },
            { x: "Attack", value: 52 },
            { x: "Defense", value: 43 },
            { x: "Special Attack", value: 0 },
            { x: "Special Defense", value: 50 },
            { x: "Speed", value: 65 },
        ];

        var data2 = [
            { x: "HP", value: 0 },
            { x: "Attack", value: 0 },
            { x: "Defense", value: 0 },
            { x: "Special Attack", value: 65 },
            { x: "Special Defense", value: 0 },
            { x: "Speed", value: 0 },
        ];

        // var data3 = [
        // 	{ x: "HP", value: 44 },
        // 	{ x: "Attack", value: 48 },
        // 	{ x: "Defense", value: 65 },
        // 	{ x: "Special Attack", value: 50 },
        // 	{ x: "Special Defense", value: 64 },
        // 	{ x: "Speed", value: 43 },
        // ];

        // create radar chart
        var chart = anychart.radar();
        // set chart yScale settings
        chart.yScale()
            .minimum(1)
            .maximum(100)
            .ticks({ 'interval': 20 });

        // create first series
        chart.area(valores_temas).name('RSE').markers(true).fill("blue", 0.3).stroke("blue")
        // create second series
        // chart.area(valores_temas_ambientales).name('Ambeintal').markers(true).fill("#1FE250", 0.3).stroke("#1FE250")
        // create third series
        // chart.area(data3).name('Squirtle').markers(true).fill("#5BC0EB", 0.3).stroke("#5BC0EB")

        // set chart title
        chart.title("Comparativa de Temas")
            // set legend
            .legend(true);

        // color alternating cells
        // chart.yGrid().palette(["gray 0.1", "gray 0.2"]);
        chart.yGrid().palette(["#fff", "#f1f5f9"]);

        // set container id for the chart
        chart.container('grafica_radar');
        // initiate chart drawing
        chart.draw();

    });


}

function grafica_radar_dashboard() {
    //console.log(resutaldo_final)//resulatdo final
    //console.log(objeto_resp)//resulatdo dimensiones y otros

    let nombre_temas = []
    //let valores_temas = []
    let valores_temas = []
    let valores_temas_ambientales = []
    objeto_datos_evaluacion_graficas.dimensiones_resultados.forEach(datos_preguntas => {//recorremos DIMENSIONES
        datos_preguntas.temas_resultados.forEach(element => {//recorremos TEMAS
            nombre_temas.push(element.nom_tema_evaluado)//guardamos los nombres de los temas
            if(element.resultado_tema_formula !=-1){
                const object = {
                    x: element.nom_tema_evaluado,
                    value: (element.resultado_tema_formula * 100).toFixed(2)
                }
                valores_temas.push(object)//guardamos los valores de los temas SOCIALES
            }else{
                const object = {
                    x: element.nom_tema_evaluado,
                    value: 0
                }
                valores_temas.push(object)//guardamos los valores de los temas SOCIALES
            }
        })
    })

    // console.log(valores_temas_ambientales)
    // console.log(valores_temas)
    //Grafica RADAR
    // var ctx = document.getElementById('marksChart_1').getContext('2d');
    // var myChart = new Chart(ctx, {
    //     //type: 'line',
    //     //type: 'bar',
    //     type: 'radar',
    //     data: {
    //         labels: nombre_temas,
    //         datasets: [{
    //             label: 'Social',
    //             data: valores_temas,
    //             backgroundColor: "rgba(148, 194, 235,0.2)",
    //             borderColor: "#42a5f5",
    //             //fill:false
    //         }, {
    //             label: 'Ambiental',
    //             data: valores_temas_ambientales,
    //             backgroundColor: "rgba(26,129,102,0.2)",
    //             borderColor: "#3cba9f",
    //             //fill:false
    //         }]
    //     }
    // });
    anychart.onDocumentReady(function () {
        // our data from bulbapedia
        var data1 = [
            { x: "HP", value: 39 },
            { x: "Attack", value: 52 },
            { x: "Defense", value: 43 },
            { x: "Special Attack", value: 0 },
            { x: "Special Defense", value: 50 },
            { x: "Speed", value: 65 },
        ];

        var data2 = [
            { x: "HP", value: 0 },
            { x: "Attack", value: 0 },
            { x: "Defense", value: 0 },
            { x: "Special Attack", value: 65 },
            { x: "Special Defense", value: 0 },
            { x: "Speed", value: 0 },
        ];

        // var data3 = [
        // 	{ x: "HP", value: 44 },
        // 	{ x: "Attack", value: 48 },
        // 	{ x: "Defense", value: 65 },
        // 	{ x: "Special Attack", value: 50 },
        // 	{ x: "Special Defense", value: 64 },
        // 	{ x: "Speed", value: 43 },
        // ];

        // create radar chart
        var chart = anychart.radar();
        // set chart yScale settings
        chart.yScale()
            .minimum(1)
            .maximum(100)
            .ticks({ 'interval': 20 });

        // create first series
        chart.area(valores_temas).name('RSE').markers(true).fill("blue", 0.3).stroke("blue")
        // create second series
        // chart.area(valores_temas_ambientales).name('Ambeintal').markers(true).fill("#1FE250", 0.3).stroke("#1FE250")
        // create third series
        // chart.area(data3).name('Squirtle').markers(true).fill("#5BC0EB", 0.3).stroke("#5BC0EB")

        // set chart title
        chart.title("Comparativa de Temas")
            // set legend
            .legend(true);

        // color alternating cells
        // chart.yGrid().palette(["gray 0.1", "gray 0.2"]);
        chart.yGrid().palette(["#fff", "#f1f5f9"]);

        // set container id for the chart
        chart.container('grafica-radar-dashboard');
        // initiate chart drawing
        chart.draw();

    });


}

// function grafica_radar_pdf(){
//         //console.log(resutaldo_final)//resulatdo final
//         //console.log(objeto_resp)//resulatdo dimensiones y otros

//         let nombre_temas = []
//         //let valores_temas = []
//         let valores_temas_sociales = []
//         let valores_temas_ambientales = []
//         objeto_resp.forEach(datos_preguntas => {//recorremos DIMENSIONES
//             //console.log(datos_preguntas.dimension)
//             //Ambiental

//             datos_preguntas.temas.forEach(element => {//recorremos TEMAS
//                 nombre_temas.push(element.nombre)//guardamos los nombres de los temas
//                 if (datos_preguntas.dimension == 'Social') {
//                     //console.log(element.nombre)
//                     //console.log(element.nivel_1)
//                     const object = {
//                         x: element.nombre, value: (element.nivel_1 * 100)
//                     }
//                     valores_temas_sociales.push(object)//guardamos los valores de los temas SOCIALES
//                 } else {
//                     const object = {
//                         x: element.nombre, value: 0
//                     }
//                     valores_temas_sociales.push(object)//guardamos cero en caso de que no se un tema SOCIAL
//                 }

//                 if (datos_preguntas.dimension == 'Ambiental') {
//                     const object = {
//                         x: element.nombre, value: (element.nivel_1 * 100)
//                     }
//                     valores_temas_ambientales.push(object)//guardamos los valors de los temas AMBIENTALES
//                 } else {
//                     const object = {
//                         x: element.nombre, value: 0
//                     }
//                     valores_temas_ambientales.push(object)//guardamos cero en caso de que no se un tema AMBIENTAL
//                 }
//             })


//         })

//         // console.log(valores_temas_ambientales)
//         // console.log(valores_temas_sociales)
//         //Grafica RADAR
//         // var ctx = document.getElementById('marksChart_1').getContext('2d');
//         // var myChart = new Chart(ctx, {
//         //     //type: 'line',
//         //     //type: 'bar',
//         //     type: 'radar',
//         //     data: {
//         //         labels: nombre_temas,
//         //         datasets: [{
//         //             label: 'Social',
//         //             data: valores_temas_sociales,
//         //             backgroundColor: "rgba(148, 194, 235,0.2)",
//         //             borderColor: "#42a5f5",
//         //             //fill:false
//         //         }, {
//         //             label: 'Ambiental',
//         //             data: valores_temas_ambientales,
//         //             backgroundColor: "rgba(26,129,102,0.2)",
//         //             borderColor: "#3cba9f",
//         //             //fill:false
//         //         }]
//         //     }
//         // });
//         anychart.onDocumentReady(function () {
//             // our data from bulbapedia
//             var data1 = [
//                 { x: "HP", value: 39 },
//                 { x: "Attack", value: 52 },
//                 { x: "Defense", value: 43 },
//                 { x: "Special Attack", value: 0 },
//                 { x: "Special Defense", value: 50 },
//                 { x: "Speed", value: 65 },
//             ];

//             var data2 = [
//                 { x: "HP", value: 0 },
//                 { x: "Attack", value: 0 },
//                 { x: "Defense", value: 0 },
//                 { x: "Special Attack", value: 65 },
//                 { x: "Special Defense", value: 0 },
//                 { x: "Speed", value: 0 },
//             ];

//             // var data3 = [
//             // 	{ x: "HP", value: 44 },
//             // 	{ x: "Attack", value: 48 },
//             // 	{ x: "Defense", value: 65 },
//             // 	{ x: "Special Attack", value: 50 },
//             // 	{ x: "Special Defense", value: 64 },
//             // 	{ x: "Speed", value: 43 },
//             // ];

//             // create radar chart
//             var chart = anychart.radar();
//             // set chart yScale settings
//             chart.yScale()
//                 .minimum(1)
//                 .maximum(100)
//                 .ticks({ 'interval': 20 });

//             // create first series
//             chart.area(valores_temas_sociales).name('Social').markers(true).fill("blue", 0.3).stroke("blue")
//             // create second series
//             chart.area(valores_temas_ambientales).name('Ambeintal').markers(true).fill("green", 0.3).stroke("green")
//             // create third series
//             // chart.area(data3).name('Squirtle').markers(true).fill("#5BC0EB", 0.3).stroke("#5BC0EB")

//             // set chart title
//             chart.title("Comparativa de Temas")
//                 // set legend
//                 .legend(true);

//             // color alternating cells
//             // chart.yGrid().palette(["gray 0.1", "gray 0.2"]);
//             chart.yGrid().palette(["#fff", "#f1f5f9"]);

//             // set container id for the chart
//             chart.container('grafica_radar-pdf');
//             // initiate chart drawing
//             chart.draw();

//         });
// }