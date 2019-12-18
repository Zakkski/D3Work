const svg = d3.select('svg');

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

const g = svg.append('g');

const colorLegendG = svg.append('g')
    .attr('transform', `translate(30,300)`);

svg.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform);
}));

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

// const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const colorScale = d3.scaleOrdinal();
// switching these changes whole viz with this structure
// const colorValue = d => d.properties.income_grp;
const colorValue = d => d.properties.economy;


loadAndProcessData().then(countries => {

    // colorScale.domain(countries.features.map(colorValue));
    // the reason to separate this is that the above domain function removes duplicates
    // and if we were to sort above we would also be sorting the duplicates
    // colorScale.domain(colorScale.domain().sort());
    // better way below 
    colorScale.domain(countries.features.map(colorValue))
              .domain(colorScale.domain().sort().reverse())
              .range(d3.schemeSpectral[colorScale.domain().length]);

    colorLegendG.call(colorLegend, {
        colorScale,
        circleRadius: 8,
        spacing: 20,
        textOffset: 12,
        backgroundRectWidth: 235
    });

    g.selectAll('path')
        .data(countries.features)
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
        .attr('fill', d => colorScale(colorValue(d)))
        .append('title')
        .text(d => `${d.properties.name}: ${colorValue(d)}`);
})
