const svg = d3.select('svg');

const choroplethMapG = svg.append('g');

const colorLegendG = svg.append('g')
    .attr('transform', `translate(30,300)`);

// const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const colorScale = d3.scaleOrdinal();
// switching these changes whole viz with this structure
// const colorValue = d => d.properties.income_grp;
const colorValue = d => d.properties.economy;

let selectedColorValue;
let features;

loadAndProcessData().then(countries => {
    features = countries.features;
    render();
})

const onClick = d => {
    selectedColorValue = d;
    render();
}

const render = () => {
    colorScale.domain(features.map(colorValue))
        .domain(colorScale.domain().sort().reverse())
        .range(d3.schemeSpectral[colorScale.domain().length]);

    colorLegendG.call(colorLegend, {
        colorScale,
        circleRadius: 8,
        spacing: 20,
        textOffset: 12,
        backgroundRectWidth: 235,
        onClick,
        selectedColorValue
    });

    // passes object that call is on as the first argument
    choroplethMapG.call(choroplethMap, {
        features,
        colorScale,
        colorValue,
        selectedColorValue
    });

}




// Order of setting up the filter function
// 1. What do you interact with and what does it send
// in this case the color legend and it passes the text value
// 2. What part of the state changes?
// in this case the selectedValue var
// 3. What needs to be rendered based on the state change?
// in this case the selectedValue filters out which countries to change