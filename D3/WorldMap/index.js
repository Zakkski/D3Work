const svg = d3.select('svg');

// d3-geo-projections package has even more projections
const projection = d3.geoNaturalEarth1();
// const projection = d3.geoMercator();
// const projection = d3.geoOrthographic();
const pathGenerator = d3.geoPath().projection(projection);

const g = svg.append('g');

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

// svg.call(d3.zoom().on('zoom', () => {
//     g.attr('transform', event.transform);
// }));

// links to topojson data, topojson package is for converting from topo to geojson
// d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json', data => {
//     console.log(data);
// })
d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json').then(data => {
    const countries = topojson.feature(data, data.objects.countries);

    g.selectAll('path')
        .data(countries.features)
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
        // Below is the same because it only takes 'd'
        //  .attr('d', d => pathGenerator(d))
})
// Promise.all([
//     d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
//     d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
// ]).then(([tsv, topoJSONdata])) => {
