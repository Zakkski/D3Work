function buildChart(selectorId) {
    const width = 1200;
    const height = 700;

    const margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 100
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(selectorId)
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width);

    const g = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.csv('./air_quality.csv', (error, data) => {
        if(error) {
            console.error('failed to read data');
            return;
        }

        data.forEach(d => {
            d.Emissions = d.Emissions.replace(/,/, "");
            d.Emissions = +d.Emissions;
        })

        const x = d3.scaleBand()
                    .domain(
                        data.map(d => d.State)
                    )
                    .range([0, innerWidth])
                    .padding(0.2);

        const y = d3.scaleLinear()
                    .domain([0, 200000])
                    .range([innerHeight, 0]);

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        g.append('g')
         .attr('class', 'x-axis')
         .attr('transform', 'translate(0,' + innerHeight + ')')
         .call(xAxis);

        g.append('g')
         .attr('class', 'y-axis')
         .attr('transform', 'translate(0,0)')
         .call(yAxis);

        g.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.State))
        .attr('y', d => y(d.Emissions))
        .attr('width', x.bandwidth())
        .attr('height', d => innerHeight - y(d.Emissions))
        .attr('fill', 'steelblue')
        .attr('stroke', 'none');

        g.append('text')
        .attr('class', 'x-axis-label')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + 30)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'hanging')
        .text('State');

        g.append('text')
        .attr('class', 'x-axis-label')
        .attr('x', -30)
        .attr('y', innerHeight / 2)
        .attr('transform', 'rotate(-90,-30,' + innerHeight / 2 + ') translate(0,-30)')
        .text('Emissions in PPM');

        const radios = d3.selectAll('input');
        radios.on('change', function() {
            const selection = this.value;
            updateChart(selection, data)
        })

        function updateChart(selection, data) {
            let newData;
            if (selection === 'asc') {
                newData = data.sort((a, b) => {
                    if (a.Emissions < b.Emissions) {
                        return -1;
                    }
                    if (a.Emissions > b.Emissions) {
                        return 1;
                    }
                    return 0;
                })
            } else if (selection === 'desc') {
                newData = data.sort((a, b) => {
                    if (a.Emissions < b.Emissions) {
                        return 1;
                    }
                    if (a.Emissions > b.Emissions) {
                        return -1
                    }
                    return 0;
                })
            } else if (selection === 'state') {
                newData = data.sort((a, b) => {
                    if (a.State < b.State) {
                        return -1;
                    }
                    if (a.State > b.State) {
                        return 1;
                    }
                    return 0;
                })
            }
            g.selectAll('.bar')
                .data(newData)
                .transition()
                .duration(500)
                .attr('y', d => y(d.Emissions))
                .attr('height', d => innerHeight - y(d.Emissions));

            x.domain(newData.map(d => d.State))
            svg.select('.x-axis').call(xAxis);
        }
    })

}


buildChart('#viz');