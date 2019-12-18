function buildChart(containerId) {
    const width = 1800;
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

    d3.json('./us-states.json', (error, geoJson) => {
        if(error) {
            console.error('failed to load data');
            return;
        }

        d3.csv('./NSRDB_StationsMeta.csv', (error, stations) => {
            if(error) {
                console.error('failed to load stations');
                return;
            }


            stations = prepStationsData(stations);

            draw(geoJson, stations)
        })
    })
    
    function draw(geoJson, stations) {
        const usaMap = d3.geoAlbersUsa()
            .scale(1200)
    
        const mapPath = d3.geoPath().projection(usaMap);
    
        g.selectAll('path')
            .data(geoJson.features)
            .enter()
            .append('path')
            .attr('d', mapPath)
            .style('fill', 'white')
            .style('stroke', 'black')
            .style('stroke-width', 1);

        console.log(stations);

        g.selectAll('circle')
         .data(stations)
         .enter()
         .append('circle')
         .attr('class', d => `class-${d.class}`)
         .attr('cx', d => {
           if(usaMap(d.loc)) {
               return usaMap(d.loc)[0];
           }
        })
            .attr('cy', d => {
                if (usaMap(d.loc)) {
                    return usaMap(d.loc)[1];
                }
            })
         .attr('r', 3)
         .attr('fill', 'black')
         .attr('stroke', 'none');
         
         const form = d3.select('form');
         form.on('change', function() {
             console.log(getFormValues());
             updateChart(stations, getFormValues())
         })

         function updateChart(data, values) {
            // data = data.filter(d => {
            //     return values.indexOf(d.class) > -1;
            // })
            // console.log(data);
            values.forEach(value => {
                g.selectAll(`circle.class-${value}`)
                .filter()
                 .transition()
                 .duration(500)
                 .attr('r', 0)
                 .remove();
            })

            // g.selectAll('circle')
            //  .data(data)
            //  .enter()
            // .append('circle')
            // .attr('cx', d => {
            //     if (usaMap(d.loc)) {
            //         return usaMap(d.loc)[0];
            //     }
            // })
            // .attr('cy', d => {
            //     if (usaMap(d.loc)) {
            //         return usaMap(d.loc)[1];
            //     }
            // })
            // .attr('r', 0)
            // .attr('fill', 'black')
            // .attr('stroke', 'none')
            // .transition()
            // .duration(500)
            // .attr('r', 3);
         }
    }



}

function prepStationsData(data) {
    return data.filter(d => {
        return d.latitude && d.longitude;
    }).map(d => {
        return {
            name: d.STATION,
            loc: [+d.longitude, +d.latitude],
            class: +d.CLASS
        }
    })
}

function getFormValues() {
    const inputs = document.querySelectorAll('input:checked');
    const values = [];
    inputs.forEach(x => values.push(+x.value));
    return values;
}


buildChart('#viz');