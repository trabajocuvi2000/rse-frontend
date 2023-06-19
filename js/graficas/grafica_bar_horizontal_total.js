

//llamamos a la funcion para que aplique el algoritmo


//console.log(resutaldo_final)//resulatdo final
//console.log(objeto_resp)//resulatdo dimensiones y otros

function graficar_barra_horizontal(variable, valor,ancho,altura) {
  var data = [
    { "legend_value": "E", "value": (valor * 100).toFixed(2), "label": "test5" }
  ];
  for (var i = 0; i < data.length; i++) {
    data[i]["legend_value"] = String.fromCharCode(65 + i)
  }
  //console.log(data)
  // set the dimensions and margins of the graph
  var margin_bar_hori = { top: 20, right: 20, bottom: 20, left: 40 },
    width_bar_hori = ancho - margin_bar_hori.left - margin_bar_hori.right,
    height_bar_hori = altura - margin_bar_hori.top - margin_bar_hori.bottom;

  // set the ranges
  var y = d3.scaleBand()
    .range([height_bar_hori, 0])
    .padding(0.1);

  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width_bar_hori / 2]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin_bar_hori
  var svg = d3.select(variable).append("svg")
    .attr("width", "100%")//width_bar_hori + margin_bar_hori.left + margin_bar_hori.right
    .attr("height", height_bar_hori + margin_bar_hori.top + margin_bar_hori.bottom)
    .append("g")

    .attr("transform",
      "translate(" + margin_bar_hori.left + "," + margin_bar_hori.top + ")");

  // format the data
  data.forEach(function (d) {
    d.value = +d.value;
  });

  // Scale the range of the data in the domains
  y.domain(data.map(function (d) { return d.legend_value; }));
  //y.domain([0, d3.max(data, function(d) { return d.value; })]);


  var bar_height = Math.min(Math.ceil((height_bar_hori / data.length) - data.length * 1), 45);
  // append the rectangles for the bar chart
  var bars = svg.selectAll(".bar")
    .data(data)
    .enter()

  // This is for the lightgray bars in the background. Same code, just longer width and a fixed color
  bars.append("path")
    .attr("class", "bar")
    //.attr("x", function(d) { return x(d.value); })
    .attr("width", function (d) { return x(d.value); })
    .attr("y", function (d) { return y(d.legend_value); })
    .attr("height", y.bandwidth())
    .attr("fill", 'lightgray')
    .attr("d", function (d) {
      //console.log("y.bandwidth()", y.bandwidth())
      rightRoundedRect(0, Math.floor(y(d.legend_value)), width_bar_hori / 2, y.bandwidth(), y.bandwidth() / 2)
      return rightRoundedRect(0, Math.floor(y(d.legend_value)) + (y.bandwidth() / 2) - (15 / 2), width_bar_hori / 2, 15, 9);
    });

  // This is your original code for the bars
  bars.append("path")
    .attr("class", "bar")
    //.attr("x", function(d) { return x(d.value); })
    .attr("width", function (d) { return x(d.value); })
    .attr("y", function (d) { return y(d.legend_value); })
    .attr("height", y.bandwidth())
    .attr("fill",
      function (d) {
        if (d.value > 0.8 * 100) {
          return "#056DFF";
        }
        return "#056DFF";/*#6345B5*/
      })
    .attr("d", function (d) {
      //console.log("y.bandwidth()", y.bandwidth())
      rightRoundedRect(0, Math.floor(y(d.legend_value)), x(d.value), y.bandwidth(), y.bandwidth() / 2)
      return rightRoundedRect(0, Math.floor(y(d.legend_value)) + (y.bandwidth() / 2) - (15 / 2), x(d.value), 15, 9);
    });

  function rightRoundedRect(x, y, width_bar_hori, height_bar_hori, radius) {
    return `M ${x},${y}
    h ${width_bar_hori - radius}
    q ${radius},0 ${radius},${radius}
    v ${height_bar_hori - (2 * radius)}
    q 0,${radius} -${radius},${radius}
    h -${width_bar_hori - radius}
    z`
  }

  bars.append("text")
    .attr("class", "legend_value")
    //y position of the legend_value is halfway down the bar
    .attr("y", function (d) {
      return Math.floor(y(d.legend_value)/*+y.bandwidth()/data.length*/) + Math.ceil(bar_height / 2);
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", 0)
    .style("font-size", function (d) {

      return 10;
    })
    .style("font-family", "sans-serif")
    .style('fill', '#fff')/*#DCDCDC*/

    .text(function (d) {
      return d.value;
    })
  //.style("text-anchor", "middle");
  // add the y Axis
  svg.append("g")
    .call(d3.axisLeft(y).tickSize(0));

  // get rid of this code, it's only there so you can see where the line is with regards to the x-axis
  svg.append("g")
    .attr("transform", `translate(0, ${height_bar_hori})`)
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  svg.append("line")
    .attr("class", "avgValue")
    .attr("x1", valor * (width_bar_hori / 2))
    .attr("y1", "0")
    .attr("x2", valor * (width_bar_hori / 2))
    .attr("y2", height_bar_hori)
    .attr("stroke", "purple")
    .attr("stroke-width", "1")
    .style("stroke-dasharray", ("10,4"))

  svg.append("line")
    .attr("class", "maxValue")
    .attr("x1", width_bar_hori / 2)
    .attr("y1", "0")
    .attr("x2", width_bar_hori / 2)
    .attr("y2", height_bar_hori)
    .attr("stroke", "blue")
    .attr("stroke-width", "1")
    .style("stroke-dasharray", ("10,4"))


}


function graficar_barras() {
  // graficar_barra_horizontal('.chart-container',resutaldo_final)
  graficar_barra_horizontal('.chart-container-espcifico', objeto_datos_evaluacion_graficas.resultado_final, 820,80)
  graficar_barra_horizontal('.chart-container-global', objeto_datos_evaluacion_graficas_COMPLETA.resultado_final,500,80) // falta el valor global
}