

function grafica_barra_horizontal() {
    const data = [];
    objeto_datos_evaluacion_graficas.dimensiones_resultados.forEach(datos_preguntas => {//recorremos DIMENSIONES
        const objeto = {
            player: datos_preguntas.nom_dimension_evaluada,
            points: (datos_preguntas.resultado_dimension * 100).toFixed(2)
        }
        data.push(objeto)

    })
    
    // const data = [
    //     { player: 'Social', points: objeto_resp[0].nivel_2 * 100 },
    //     { player: 'Ambiental', points: objeto_resp[1].nivel_2 * 100 }
    // ]

    // const data = [
    //     { player: 'Social', points: 45 },
    //     { player: 'Ambiental', points: 65 }
    // ]

    const margin = { top: 50, right: 50, bottom: 80, left: 75 }
    const height = 200
    const width = 500
    var greyColor = "#898989";
    var barColor = '#1FE250';//verde
    var highlightColor = "#ff8000";//naranja


    const svg = d3.select('#grafica-horizontal')
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Create X and Y scales. ScaleBand for bars.
    const x = d3.scaleLinear()
        .domain([0, 100])
        .rangeRound([0, width])
        .nice()

    const y = d3.scaleBand()
        .domain(data.map(d => d.player))
        .range([height, 0])
        .padding(0.1)

    // Add our X and Y axis onto the SVG
    const xAxis = svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))

    const yAxis = svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(y))

    // Create our bars
    const bars = svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .style("display", d => { return d.player === null ? "none" : null; })
        .style("fill", d => {
            return d.player === d3.max(data, d => { return d.player; })
                ? highlightColor : barColor
        })
        .attr('x', 0)
        .attr('y', d => y(d.player))
        .attr('height', y.bandwidth())
        .attr('width', x(0))

    // Attach even listeners
    bars.on('mouseover', function () {
        d3.selectAll('.player')
            .attr('opacity', 0)

        d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 0.6)
    })

    bars.on('mouseout', function () {
        d3.selectAll('.player')
            .attr('opacity', 1)

        d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
    })

    // Animate bars
    bars.transition().duration(2000)
        .attr('width', d => x(d.points))
        .ease(d3.easeCubic)

    // Append Text to bars displayiing the points
    const text = svg.selectAll('.points')
        .data(data)
        .enter().append('text')
        .attr('x', d => x(d.points))
        .attr('y', d => y(d.player))
        .attr('dx', -20)
        .attr('dy', (y.bandwidth() / 2) + 5)
        .text(d => d.points)
        .style('text-anchor', 'middle')
        .style('fill', '#CAE3FA')
        .style('font-family', 'Arial')

    // Add title to the chart
    const title = svg.append('text')
        .attr('class', 'titulo-bar-horizontal')
        .attr('x', width / 2)
        .attr('y', -15)
        .style('text-anchor', 'middle')
        .text('Comparativa Dimensiones')
        .style('font-family', 'Arial')
        .style('fill', '#000')

}


function grafica_barra_horixzontal_dashboard() {
    const data = [];
    objeto_datos_evaluacion_graficas.dimensiones_resultados.forEach(datos_preguntas => {//recorremos DIMENSIONES
        const objeto = {
            player: datos_preguntas.nom_dimension_evaluada,
            points: (datos_preguntas.resultado_dimension * 100).toFixed(2)
        }
        data.push(objeto)

    })

    const margin = { top: 50, right: 50, bottom: 80, left: 75 }
    const height = 140 /*estaba 200*/
    const width = 350 /* estaba 360*/
    var greyColor = "#898989";
    var barColor = '#1FE250';//verde
    var highlightColor = "#ff8000";//naranja


    const svg = d3.select('#grafica-var-horizontal-dashboard')
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Create X and Y scales. ScaleBand for bars.
    const x = d3.scaleLinear()
        .domain([0, 100])
        .rangeRound([0, width])
        .nice()

    const y = d3.scaleBand()
        .domain(data.map(d => d.player))
        .range([height, 0])
        .padding(0.1)

    // Add our X and Y axis onto the SVG
    const xAxis = svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))

    const yAxis = svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(y))

    // Create our bars
    const bars = svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .style("display", d => { return d.player === null ? "none" : null; })
        .style("fill", d => {
            return d.player === d3.max(data, d => { return d.player; })
                ? highlightColor : barColor
        })
        .attr('x', 0)
        .attr('y', d => y(d.player))
        .attr('height', y.bandwidth())
        .attr('width', x(0))

    // Attach even listeners
    bars.on('mouseover', function () {
        d3.selectAll('.player')
            .attr('opacity', 0)

        d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 0.6)
    })

    bars.on('mouseout', function () {
        d3.selectAll('.player')
            .attr('opacity', 1)

        d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
    })

    // Animate bars
    bars.transition().duration(2000)
        .attr('width', d => x(d.points))
        .ease(d3.easeCubic)

    // Append Text to bars displayiing the points
    const text = svg.selectAll('.points')
        .data(data)
        .enter().append('text')
        .attr('x', d => x(d.points))
        .attr('y', d => y(d.player))
        .attr('dx', -20)
        .attr('dy', (y.bandwidth() / 2) + 5)
        .text(d => d.points)
        .style('text-anchor', 'middle')
        .style('fill', '#CAE3FA')
        .style('font-family', 'Arial')

    // Add title to the chart
    // const title = svg.append('text')
    //     .attr('class', 'titulo-bar-horizontal')
    //     .attr('x', width / 2)
    //     .attr('y', -15)
    //     .style('text-anchor', 'middle')
    //     .text('Comparativa Dimensiones')
    //     .style('font-family', 'Arial')
    //     .style('fill', '#000')

}