function getDecadeColor(year) {
    let num = Math.floor(((year % 1000) % 100) / 10);
    if(num === 0) {
        return '#00A800';
    }

    return '#00A' + num.toString() + num.toString() + '0';
}

function buildChart(containerId) {
    const width = 600;
    const height = 2500;

    const margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(containerId)
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width);

    const g = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.json('./climate.json', (error, data) => {
        if (error){
            console.error('failed to read data');
            return;
        }

        
        data.forEach(d => {
            d.year = +d.year;
            d.temp = +d.temp;
        })

        const x = d3.scaleLinear()
                    .domain([-0.5, 1])
                    .range([0, innerWidth]);

        const y = d3.scaleBand()
                    .domain(
                        data.map(d => d.year)
                    )
                    .range([0, innerHeight])
                    .padding(0.2);
        
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
         .attr('x', 1)
         .attr('y', d => y(d.year))
         .attr('width', d => x(d.temp))
         .attr('height', y.bandwidth())
         .attr('fill', d => {
             return getDecadeColor(d.year);
         })
         .attr('stroke', 'none');
    })

    g.append('text')
     .attr('class', 'x-axis-label')
     .attr('x', innerWidth / 2)
     .attr('y', innerHeight + 30)
     .attr('text-anchor', 'middle')
     .attr('dominant-baseline', 'hanging')
     .text('Temperature');

     g.append('text')
        .attr('class', 'y-axis-label')
        .attr('x', -30)
        .attr('y', innerHeight / 2)
        .attr('transform', 'rotate(-90,-30,' + innerHeight / 2 + ')')
        .text('Years of tracked data');

    const inputs = d3.selectAll('input')
                     .on('click', () => {
                        //  if (this.attr('name') === 'state') {
                        //      console.log('state sort');
                        //  }
                        console.log(this);
                     });
    console.log(inputs);
}

buildChart('#viz');
