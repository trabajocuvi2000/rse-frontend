(async function () {
  //llamamos a la funcion para que aplique el algoritmo
  await getAlgoritmo()

  setTimeout(() => {
    //console.log(resutaldo_final)//resulatdo final
    //console.log(objeto_resp)//resulatdo dimensiones y otros

    const objeto_temas = [];
    objeto_resp.forEach(datos_preguntas => {//recorremos DIMENSIONES
      datos_preguntas.temas.forEach(element => {//recorremos TEMAS
        //console.log(element.nombre)
        //console.log(element.nivel_1)
        const objeto = {
          key: element.nombre,
          value: element.nivel_1 * 100
        }
        objeto_temas.push(objeto)
      })
    })

    // data
    var data = {
      "key": "Languages",
      "values": objeto_temas
    };

    var chart = d3.ez.chart.polarAreaChart().colors(d3.schemeCategory10);
    var title = d3.ez.component.title().mainText("Temas Evaluados").subText("Temas de RSE, Sociales y Ambientales");


    // Create chart base
    var myChart = d3.ez.base()
      .width(950)//750
      .height(600)//400
      .chart(chart)
      .title(title)


    d3.select("#chartholder")
      .datum(data)
      .call(myChart);


  }, 8000)
})()