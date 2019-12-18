function buildChart(containerId) {
    const width = 1500;
    const height = 500;

    const margin = {
        top: 50,
        bottom: 50,
        left: 100,
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

    d3.json('./population.json', (error, data) => {
        if(error) {
            console.error('failed to load data');
            return;
        }

        const parseDate = d3.utcParse("%B-%Y");
        const dateFormat = d3.timeFormat("%Y");
        data.forEach(d => {
            d.pop = +d.pop;
            d.year = +dateFormat(parseDate(d.year));
        })

        data = data.filter(d => {
            return d.pop != null;
        })

        console.log(data);

        const x = d3.scaleBand()
                    .domain(
                        data.map(d => d.year).reverse()
                    )
                    .range([0, innerWidth])
                    .padding(0.2);

        const y = d3.scaleLinear()
                    .domain(d3.extent(data, d => d.pop).reverse())
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

        const line = d3.line()
                     .x(d => x(d.year))
                     .y(d => y(d.pop))
                     .curve(d3.curveLinear);

    const countries = ['China', 'India'];
    const colors = ['purple', 'steelblue'];
    
    const colorScale = d3.scaleOrdinal().domain(countries).range(colors);
    
    const groups = g.selectAll('.country')
    .data(countries)
    .enter()
    .append('g')
    .attr('class', 'country');
    
    groups.append('path')
    .datum(d => {
        return data.filter(r => {
            return r.country == d;
        })
    })
    .attr('class', 'pop-line')
    .attr('fill', 'none')
    .attr('stroke', d => {
        return colorScale(d[0].country)
    })
    .attr('stroke-width', 1.5)
    .attr('d', line);
    
})

}

buildChart('#viz');