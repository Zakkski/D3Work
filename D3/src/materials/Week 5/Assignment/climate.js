function buildChart(containerId) {
    const width = 4000;
    const height = 800;

    const margin = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(containerId)
                  .append('svg')
                  .attr('height', height)
                  .attr('width', width);

    const g = svg.append('g')
                 .attr('transform', `translate(${margin.left},${margin.top})`);

    d3.json('./climate.json', (error, data) => {
        if(error) {
            console.error('failed to load data');
            return;
        }

        data.forEach(d => {
            d.year = +d.year;
            d.temp = +d.temp;
        })

        const x = d3.scaleBand()
                    .domain(
                        data.map(d => d.year)
                    )
                    .range([0, innerWidth])
                    .padding(0.2);

        const y = d3.scaleLinear()
                    .domain([-0.5, 1])
                    .range([0, innerHeight]);

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        g.append('g')
         .attr('class', 'x-axis')
         .attr('transform', `translate(0,${innerHeight})`)
         .call(xAxis);

        g.append('g')
         .attr('class', 'y-axis')
         .attr('transform', 'translate(0,0)')
         .call(yAxis);

        line = d3.line().x(d => x(d.year))
                 .y(d => y(d.temp));

        g.append('path')
         .datum(data)
         .attr('class', 'temp-line')
         .attr('fill', 'none')
         .attr('stroke', 'steelblue')
         .attr('stroke-width', 1.5)
         .attr('d', line);

        g.selectAll('.temp-point')
         .data(data)
         .enter()
         .append('circle')
         .attr('class', 'temp-point')
         .attr('fill', 'steelblue')
         .attr('stroke', 'black')
         .attr('stroke-width', 1.0)
         .attr('cx', d => x(d.year))
         .attr('cy', d => y(d.temp))
         .attr('r', 3);

        g.append('text')
         .attr('class', 'x-axis-label')
         .attr('x', 200)
         .attr('y', innerHeight + 30)
         .attr('text-anchor', 'middle')
         .attr('dominant-baseline', 'hanging')
         .text('Years of Temperature Data');

        g.append('text')
         .attr('class', 'y-axis-label')
         .attr('x', -30)
         .attr('y', innerHeight / 2)
         .attr('transform', 'rotate(-90,70,450)')
         .text('Temperature Deviation from Mean');
    })
}

buildChart('#viz');