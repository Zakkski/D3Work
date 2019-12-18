d3.json('./pokemon.json', (error, data) => {
    if(error) {
        console.error('unable to load data');
        return;
    }

    function cleanInput(input) {
        return input.split(' ')[0];
    }

    const avgWeight = d3.mean(data.map(x => {
        return +cleanInput(x.weight);
    }));

    const avgHeight = d3.mean(data.map(x => {
        return +cleanInput(x.height);
    }));

    console.log(avgWeight);
    console.log(avgHeight);
})