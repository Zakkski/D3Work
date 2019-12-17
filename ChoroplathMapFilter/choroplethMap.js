const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

const choroplethMap = (selection, props) => {
    const {
        features,
        colorScale,
        colorValue,
        selectedColorValue
    } = props;

    // used to maintain relationship between selection(svg) and g
    const gUpdate = selection.selectAll('g').data([null]);
    const gEnter = gUpdate.enter().append('g');
    const g = gUpdate.merge(gEnter);

    // Logic here makes sure the sphere isn't called on every invokation just instantiation
    // because gEnter will return one value on the first time and then 0 every time after that
    gEnter
     .append('path')
     .attr('class', 'sphere')
     .attr('d', pathGenerator({ type: 'Sphere' }))
     .merge(gUpdate.select('.sphere'))
     .attr('opacity', selectedColorValue ? 0.4 : 1);
    
    selection.call(d3.zoom().on('zoom', () => {
        g.attr('transform', d3.event.transform);
    }));

    // second argument in data is the key argument which matches the element 
    // to the data as opposed to just a stack of elements that line up
    const countryPaths = g.selectAll('.country')
                          .data(features);

    // need to use merge selection for updating countries
    const countryPathsEnter = countryPaths.enter().append('path')
        .attr('class', 'country');
        

    countryPaths
        .merge(countryPathsEnter)
        .attr('d', pathGenerator)
        .attr('fill', d => colorScale(colorValue(d)))
        .attr('opacity', d => 
            (selectedColorValue === colorValue(d) || !selectedColorValue) ? 1 : 0.2
    ).classed('highlighted', d => selectedColorValue === colorValue(d) && selectedColorValue)

    countryPathsEnter
        .append('title')
        .text(d => `${d.properties.name}: ${colorValue(d)}`);
};
