// https://insights.stackoverflow.com/survey/2018/#technology-most-loved-dreaded-and-wanted-languages


function grafica_bar_vertical() {
    //console.log(resutaldo_final)//resulatdo final
    //console.log(objeto_resp)//resulatdo dimensiones y otros

    var barColor = '#1FE250';//verde
    var highlightColor = "#ff8000";//naranja

    const objeto_dimensiones = [];
    let colores = ['#1FE250', '#ff8000']
    let num = 0;
    objeto_datos_evaluacion_graficas.dimensiones_resultados.forEach(datos_preguntas => {//recorremos DIMENSIONES
        //console.log(datos_preguntas.dimension)
        //console.log(datos_preguntas.nivel_2 * 100)
        const objeto = {
            language: datos_preguntas.nom_dimension_evaluada,
            value: (datos_preguntas.resultado_dimension * 100).toFixed(2),
            color: colores[num]
        }
        num = num + 1;
        objeto_dimensiones.push(objeto)

    })

    // console.log(objeto_dimensiones)

    // const sample = [
    //     {
    //         language: 'Social',
    //         value: 78.9,
    //         color: '#000000'
    //     },
    //     {
    //         language: 'Ambiental',
    //         value: 75.1,
    //         color: '#00a2ee'
    //     }
    // ];

    // console.log(sample)

    const svg_diim_bar = d3.select('#svg-bar');
    const svgContainer = d3.select('#grafica-bar-dim');

    const margin = 80;
    const width = 700 - 2 * margin;
    const height = 500 - 2 * margin;

    const chart_dimension = svg_diim_bar.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(objeto_dimensiones.map((s) => s.language))
        .padding(0.3)

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]);

    // vertical grid lines
    // const makeXLines = () => d3.axisBottom()
    //   .scale(xScale)

    const makeYLines = () => d3.axisLeft()
        .scale(yScale)

    chart_dimension.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    chart_dimension.append('g')
        .call(d3.axisLeft(yScale));

    // vertical grid lines
    // chart_dimension.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(makeXLines()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat('')
    //   )

    chart_dimension.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
        )

    const barGroups = chart_dimension.selectAll()
        .data(objeto_dimensiones)
        .enter()
        .append('g')

    barGroups
        .append('rect')
        .attr('class', 'barras_dim')
        .attr('x', (g) => xScale(g.language))
        .attr('y', (g) => yScale(g.value))
        .attr('height', (g) => height - yScale(g.value))
        .attr('width', xScale.bandwidth())
        .style("fill", d => {
            return d.language === d3.max(objeto_dimensiones, d => { return d.language; })
                ? highlightColor : barColor
        })
        .on('mouseenter', function (actual, i) {
            d3.selectAll('.value')
                .attr('opacity', 0)

            d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 0.6)
                .attr('x', (a) => xScale(a.language) - 5)
                .attr('width', xScale.bandwidth() + 10)

            const y = yScale(actual.value)

            line = chart_dimension.append('line')
                .attr('id', 'limit')
                .attr('x1', 0)
                .attr('y1', y)
                .attr('x2', width)
                .attr('y2', y)

            barGroups.append('text')
                .attr('class', 'divergence')
                .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
                .attr('y', (a) => yScale(a.value) + 30)
                .attr('fill', 'white')
                .attr('text-anchor', 'middle')
                .text((a, idx) => {
                    const divergence = (a.value - actual.value).toFixed(1)

                    let text = ''
                    if (divergence > 0) text += '+'
                    text += `${divergence}%`

                    return idx !== i ? text : '';
                })

        })
        .on('mouseleave', function () {
            d3.selectAll('.value')
                .attr('opacity', 1)

            d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (a) => xScale(a.language))
                .attr('width', xScale.bandwidth())

            chart_dimension.selectAll('#limit').remove()
            chart_dimension.selectAll('.divergence').remove()
        })

    barGroups
        .append('text')
        .attr('class', 'value')
        .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.value) + 30)
        .attr('text-anchor', 'middle')
        .text((a) => `${a.value}%`)

    svg_diim_bar
        .append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Porcentajes (%)')

    svg_diim_bar.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'middle')
        .text('Dimensiones')

    svg_diim_bar.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Comparativa de Dimensiones')

    svg_diim_bar.append('text')
        .attr('class', 'source')
        .attr('x', width - margin / 2)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'start')


}

// no se utilia en el DASHBOARD
function grafica_bar_vertical_dashboard() {
    //console.log(resutaldo_final)//resulatdo final
    //console.log(objeto_resp)//resulatdo dimensiones y otros

    var barColor = '#1FE250';//verde
    var highlightColor = "#ff8000";//naranja

    const objeto_dimensiones = [];
    let colores = ['#1FE250', '#ff8000']
    let num = 0;
    objeto_datos_evaluacion_graficas.dimensiones_resultados.forEach(datos_preguntas => {//recorremos DIMENSIONES
        //console.log(datos_preguntas.dimension)
        //console.log(datos_preguntas.nivel_2 * 100)
        const objeto = {
            language: datos_preguntas.nom_dimension_evaluada,
            value: (datos_preguntas.resultado_dimension * 100).toFixed(2),
            color: colores[num]
        }
        num = num + 1;
        objeto_dimensiones.push(objeto)

    })

    // console.log(objeto_dimensiones)

    // const sample = [
    //     {
    //         language: 'Social',
    //         value: 78.9,
    //         color: '#000000'
    //     },
    //     {
    //         language: 'Ambiental',
    //         value: 75.1,
    //         color: '#00a2ee'
    //     }
    // ];

    // console.log(sample)

    const svg_diim_bar = d3.select('#svg-bar-dashobaord');
    const svgContainer = d3.select('#grafica-bar-dim-dashobaord');

    const margin = 80;
    const width = 700 - 2 * margin;
    const height = 500 - 2 * margin;

    const chart_dimension = svg_diim_bar.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(objeto_dimensiones.map((s) => s.language))
        .padding(0.3)

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]);

    // vertical grid lines
    // const makeXLines = () => d3.axisBottom()
    //   .scale(xScale)

    const makeYLines = () => d3.axisLeft()
        .scale(yScale)

    chart_dimension.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    chart_dimension.append('g')
        .call(d3.axisLeft(yScale));

    // vertical grid lines
    // chart_dimension.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(makeXLines()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat('')
    //   )

    chart_dimension.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
        )

    const barGroups = chart_dimension.selectAll()
        .data(objeto_dimensiones)
        .enter()
        .append('g')

    barGroups
        .append('rect')
        .attr('class', 'barras_dim')
        .attr('x', (g) => xScale(g.language))
        .attr('y', (g) => yScale(g.value))
        .attr('height', (g) => height - yScale(g.value))
        .attr('width', xScale.bandwidth())
        .style("fill", d => {
            return d.language === d3.max(objeto_dimensiones, d => { return d.language; })
                ? highlightColor : barColor
        })
        .on('mouseenter', function (actual, i) {
            d3.selectAll('.value')
                .attr('opacity', 0)

            d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 0.6)
                .attr('x', (a) => xScale(a.language) - 5)
                .attr('width', xScale.bandwidth() + 10)

            const y = yScale(actual.value)

            line = chart_dimension.append('line')
                .attr('id', 'limit')
                .attr('x1', 0)
                .attr('y1', y)
                .attr('x2', width)
                .attr('y2', y)

            barGroups.append('text')
                .attr('class', 'divergence')
                .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
                .attr('y', (a) => yScale(a.value) + 30)
                .attr('fill', 'white')
                .attr('text-anchor', 'middle')
                .style("font-size", "20px")
                .text((a, idx) => {
                    const divergence = (a.value - actual.value).toFixed(1)

                    let text = ''
                    if (divergence > 0) text += '+'
                    text += `${divergence}%`

                    return idx !== i ? text : '';
                })

        })
        .on('mouseleave', function () {
            d3.selectAll('.value')
                .attr('opacity', 1)

            d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (a) => xScale(a.language))
                .attr('width', xScale.bandwidth())

            chart_dimension.selectAll('#limit').remove()
            chart_dimension.selectAll('.divergence').remove()
        })

    barGroups
        .append('text')
        .attr('class', 'value')
        .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.value) + 30)
        .attr('text-anchor', 'middle')
        .text((a) => `${a.value}%`)
        .style("font-size", "20px")

    svg_diim_bar
        .append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Porcentajes (%)')
        .style("font-size", "20px")

    svg_diim_bar.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'middle')
        .text('Dimensiones')
        .style("font-size", "20px")

    // svg_diim_bar.append('text')
    //     .attr('class', 'title')
    //     .attr('x', width / 2 + margin)
    //     .attr('y', 40)
    //     .attr('text-anchor', 'middle')
    //     .text('Comparativa de Dimensiones')

    svg_diim_bar.append('text')
        .attr('class', 'source')
        .attr('x', width - margin / 2)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'start')
        .style("font-size", "20px")


}


function grafica_bar_vertical_pdf(){
    //console.log(resutaldo_final)//resulatdo final
    //console.log(objeto_resp)//resulatdo dimensiones y otros

    const objeto_dimensiones = [];
    let colores = ['#000000', '#00a2ee']
    let num = 0;
    objeto_resp.forEach(datos_preguntas => {//recorremos DIMENSIONES
        //console.log(datos_preguntas.dimension)
        //console.log(datos_preguntas.nivel_2 * 100)
        const objeto = {
            language: datos_preguntas.dimension,
            value: datos_preguntas.nivel_2 * 100,
            color: colores[num]
        }
        num = num + 1;
        objeto_dimensiones.push(objeto)

    })

    //console.log(objeto_dimensiones)

    // const sample = [
    //     {
    //         language: 'Social',
    //         value: 78.9,
    //         color: '#000000'
    //     },
    //     {
    //         language: 'Ambiental',
    //         value: 75.1,
    //         color: '#00a2ee'
    //     }
    // ];

    // console.log(sample)

    const svg_diim_bar = d3.select('#svg-bar-pdf');
    const svgContainer = d3.select('#grafica-bar-dim-pdf');

    const margin = 80;
    const width = 700 - 2 * margin;
    const height = 500 - 2 * margin;

    const chart_dimension = svg_diim_bar.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(objeto_dimensiones.map((s) => s.language))
        .padding(0.3)

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]);

    // vertical grid lines
    // const makeXLines = () => d3.axisBottom()
    //   .scale(xScale)

    const makeYLines = () => d3.axisLeft()
        .scale(yScale)

    chart_dimension.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    chart_dimension.append('g')
        .call(d3.axisLeft(yScale));

    // vertical grid lines
    // chart_dimension.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(makeXLines()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat('')
    //   )

    chart_dimension.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
        )

    const barGroups = chart_dimension.selectAll()
        .data(objeto_dimensiones)
        .enter()
        .append('g')

    barGroups
        .append('rect')
        .attr('class', 'barras_dim')
        .attr('x', (g) => xScale(g.language))
        .attr('y', (g) => yScale(g.value))
        .attr('height', (g) => height - yScale(g.value))
        .attr('width', xScale.bandwidth())
        .on('mouseenter', function (actual, i) {
            d3.selectAll('.value')
                .attr('opacity', 0)

            d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 0.6)
                .attr('x', (a) => xScale(a.language) - 5)
                .attr('width', xScale.bandwidth() + 10)

            const y = yScale(actual.value)

            line = chart_dimension.append('line')
                .attr('id', 'limit')
                .attr('x1', 0)
                .attr('y1', y)
                .attr('x2', width)
                .attr('y2', y)

            barGroups.append('text')
                .attr('class', 'divergence')
                .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
                .attr('y', (a) => yScale(a.value) + 30)
                .attr('fill', 'white')
                .attr('text-anchor', 'middle')
                .text((a, idx) => {
                    const divergence = (a.value - actual.value).toFixed(1)

                    let text = ''
                    if (divergence > 0) text += '+'
                    text += `${divergence}%`

                    return idx !== i ? text : '';
                })

        })
        .on('mouseleave', function () {
            d3.selectAll('.value')
                .attr('opacity', 1)

            d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (a) => xScale(a.language))
                .attr('width', xScale.bandwidth())

            chart_dimension.selectAll('#limit').remove()
            chart_dimension.selectAll('.divergence').remove()
        })

    barGroups
        .append('text')
        .attr('class', 'value')
        .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.value) + 30)
        .attr('text-anchor', 'middle')
        .text((a) => `${a.value}%`)

    svg_diim_bar
        .append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Porcentajes (%)')

    svg_diim_bar.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'middle')
        .text('Dimensiones')

    svg_diim_bar.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Comparativa de Dimensiones')

    svg_diim_bar.append('text')
        .attr('class', 'source')
        .attr('x', width - margin / 2)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'start')

}