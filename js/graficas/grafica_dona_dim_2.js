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
                    name: element.nombre,
                    value: element.nivel_1 * 100
                }
                objeto_temas.push(objeto)
            })
        })

        //console.log(objeto_temas)

        const ancho = 960,
            alto = 500,
            chartRadius = alto / 2 - 40;

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        let svg_nueva_dona = d3.select('.dona_nueva').append('svg')
            .attr('width', ancho)
            .attr('height', alto)
            .append('g')
            .attr('transform', 'translate(' + ancho / 2 + ',' + alto / 2 + ')');

        let tooltip = d3.select('.dona_nueva').append('div')
            .attr('class', 'tooltip');

        const PI = Math.PI,
            arcMinRadius = 10,
            arcPadding = 10,
            labelPadding = -5,
            numTicks = 10;


        // datos_donus_new = [
        //     { name: 'Derechos', value: '0.432' },
        //     { name: 'Practicas', value: '0.340' },
        //     { name: 'Trabajo', value: '0.6382' },
        //     { name: 'Mediambiente', value: '0.8398' },
        //     { name: 'Cuestiones', value: '0.8' }
        // ]

        graficar(objeto_temas)

        function graficar(data) {
            //console.log(data)
            let scale = d3.scaleLinear()
                .domain([0, 100])
                .range([0, 2 * PI]);

            let ticks = scale.ticks(numTicks).slice(0, -1);
            let keys = data.map((d, i) => d.name);
            //number of arcs
            const numArcs = keys.length;
            const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

            let arc = d3.arc()
                .innerRadius((d, i) => getInnerRadius(i))
                .outerRadius((d, i) => getOuterRadius(i))
                .startAngle(0)
                .endAngle((d, i) => scale(d))

            let radialAxis = svg_nueva_dona.append('g')
                .attr('class', 'r axis')
                .selectAll('g')
                .data(data)
                .enter().append('g');

            radialAxis.append('circle')
                .attr('r', (d, i) => getOuterRadius(i) + arcPadding);

            radialAxis.append('text')
                .attr('x', labelPadding)
                .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
                .text(d => d.name);

            let axialAxis = svg_nueva_dona.append('g')
                .attr('class', 'a axis')
                .selectAll('g')
                .data(ticks)
                .enter().append('g')
                .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

            axialAxis.append('line')
                .attr('x2', chartRadius);

            axialAxis.append('text')
                .attr('x', chartRadius + 10)
                .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
                .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
                .text(d => d);

            //data arcs
            let arcs = svg_nueva_dona.append('g')
                .attr('class', 'data')
                .selectAll('path')
                .data(data)
                .enter().append('path')
                .attr('class', 'arc')
                .style('fill', (d, i) => color(i))

            arcs.transition()
                .delay((d, i) => i * 200)
                .duration(1000)
                .attrTween('d', arcTween);

            arcs.on('mousemove', showTooltip)
            arcs.on('mouseout', hideTooltip)


            function arcTween(d, i) {
                let interpolate = d3.interpolate(0, d.value);
                return t => arc(interpolate(t), i);
            }

            function showTooltip(d) {
                tooltip.style('left', (d3.event.pageX + 10) + 'px')
                    .style('top', (d3.event.pageY - 25) + 'px')
                    .style('display', 'inline-block')
                    .html(d.value);
            }

            function hideTooltip() {
                tooltip.style('display', 'none');
            }

            function rad2deg(angle) {
                return angle * 180 / PI;
            }

            function getInnerRadius(index) {
                return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
            }

            function getOuterRadius(index) {
                return getInnerRadius(index) + arcWidth;
            }

        }

    }, 500)
})()

    // d3.csv('energy.csv', (error, data) => {
    //     console.log(data)
    //     let scale = d3.scaleLinear()
    //         .domain([0, 1])
    //         .range([0, 2 * PI]);

    //     let ticks = scale.ticks(numTicks).slice(0, -1);
    //     let keys = data.map((d, i) => d.name);
    //     //number of arcs
    //     const numArcs = keys.length;
    //     const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

    //     let arc = d3.arc()
    //         .innerRadius((d, i) => getInnerRadius(i))
    //         .outerRadius((d, i) => getOuterRadius(i))
    //         .startAngle(0)
    //         .endAngle((d, i) => scale(d))

    //     let radialAxis = svg.append('g')
    //         .attr('class', 'r axis')
    //         .selectAll('g')
    //         .data(data)
    //         .enter().append('g');

    //     radialAxis.append('circle')
    //         .attr('r', (d, i) => getOuterRadius(i) + arcPadding);

    //     radialAxis.append('text')
    //         .attr('x', labelPadding)
    //         .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
    //         .text(d => d.name);

    //     let axialAxis = svg.append('g')
    //         .attr('class', 'a axis')
    //         .selectAll('g')
    //         .data(ticks)
    //         .enter().append('g')
    //         .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

    //     axialAxis.append('line')
    //         .attr('x2', chartRadius);

    //     axialAxis.append('text')
    //         .attr('x', chartRadius + 10)
    //         .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
    //         .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
    //         .text(d => d);

    //     //data arcs
    //     let arcs = svg.append('g')
    //         .attr('class', 'data')
    //         .selectAll('path')
    //         .data(data)
    //         .enter().append('path')
    //         .attr('class', 'arc')
    //         .style('fill', (d, i) => color(i))

    //     arcs.transition()
    //         .delay((d, i) => i * 200)
    //         .duration(1000)
    //         .attrTween('d', arcTween);

    //     arcs.on('mousemove', showTooltip)
    //     arcs.on('mouseout', hideTooltip)


    //     function arcTween(d, i) {
    //         let interpolate = d3.interpolate(0, d.value);
    //         return t => arc(interpolate(t), i);
    //     }

    //     function showTooltip(d) {
    //         tooltip.style('left', (d3.event.pageX + 10) + 'px')
    //             .style('top', (d3.event.pageY - 25) + 'px')
    //             .style('display', 'inline-block')
    //             .html(d.value);
    //     }

    //     function hideTooltip() {
    //         tooltip.style('display', 'none');
    //     }

    //     function rad2deg(angle) {
    //         return angle * 180 / PI;
    //     }

    //     function getInnerRadius(index) {
    //         return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
    //     }

    //     function getOuterRadius(index) {
    //         return getInnerRadius(index) + arcWidth;
    //     }
    // });
