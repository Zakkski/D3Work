const colorLegend = (selection, props) => {
    // Destructure Props into variables
    const {
        colorScale,
        circleRadius,
        spacing,
        textOffset,
        backgroundRectWidth,
        onClick,
        selectedColorValue
    } = props;

    const background = selection.selectAll('rect')
        .data([null]);
    const n = colorScale.domain().length;

    background.enter().append('rect')
        .merge(background)
        .attr('rx', circleRadius)
        .attr('x', -circleRadius * 2)
        .attr('y', -circleRadius * 2)
        .attr('width', backgroundRectWidth)
        .attr('height', spacing * n + circleRadius * 2)
        .attr('fill', 'white')
        .attr('opacity', .5);

    const groups = selection.selectAll('g')
        .data(colorScale.domain());
    
    const groupsEnter = groups
        .enter().append('g')
        .attr('class', 'tick');
    
    groupsEnter
        .merge(groups)
        .attr('transform', (d, i) => `translate(0, ${i * spacing})`)
        .attr('opacity', d => 
            (!selectedColorValue || d === selectedColorValue ? 1 : 0.2))
        .on('click', d => onClick(
            d === selectedColorValue ? null : d
        ));

    groups.exit().remove();
    groupsEnter.append('circle')
        .merge(groups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', colorScale);

    groupsEnter.append('text')
        .merge(groups.select('text'))
        .text(d => d)
        .attr('dy', '0.32em')
        .attr('x', textOffset);
}