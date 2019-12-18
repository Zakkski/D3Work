d3.json('./cars.json', (error, data) => {
    if(error) {
        console.error('unable to open data');
        return;
    }
    console.log(data);

    const commonMakes = data.reduce((acc, item) => {
        if(item.make_is_common == "1") {
            acc[item.make_id] = 1;
        }
        return acc;
    }, {});

    const makesPerCountry = data.reduce((acc, item) => {
        if(acc[item.make_country]) {
            acc[item.make_country]++
        } else {
            acc[item.make_country] = 1;
        }

        return acc;
    }, {})

    const makesPerCountrySplit = data.reduce((acc, item) => {
        if(acc[item.make_country]) {
            item.make_is_common === "1" 
              ? acc[item.make_country].common++ 
              : acc[item.make_country].uncommon++;
        } else {
            acc[item.make_country] = {
                common: 0,
                uncommon: 0
            };
            item.make_is_common === '1'
              ? acc[item.make_country].common++
              : acc[item.make_country].uncommon++;
        }

        return acc;
    }, {})

    // console.log(Object.keys(commonMakes).length);
    // console.log(makesPerCountry);
    // console.log(makesPerCountrySplit);
})