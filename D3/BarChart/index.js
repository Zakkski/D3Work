const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = (data) => {
  const xValue = (d) => d.population;
  const yValue = (d) => d.country;
  const margin = {
    left: 100,
    right: 40,
    bottom: 20,
    top: 20,
  };
  innerWidth = width - margin.left - margin.right;
  innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);
  // xScale.domain() => returns domain values
  // xScale.range() => returns range values

  const xAxis = d3.axisBottom(xScale);

  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);
  // yScale.domain() => returns all country values
  // scaleBand domain maps onto range while calculating band sizes and padding (ordinalish)

  const yAxis = d3.axisLeft(yScale);

  // D3 Margin Convention, uses innerWidth and innerHeight
  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  g.append('g').call(yAxis);
  // Alternate call method
  // yAxis(g.append('g'));
  g.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`);

  g.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('y', (d) => yScale(yValue(d)))
    .attr('width', (d) => xScale(xValue(d)))
    .attr('height', yScale.bandwidth());
};

d3.csv('data.csv').then((data) => {
  data.forEach((d) => {
    d.population = +d.population * 1000;
  });

  render(data);
});
