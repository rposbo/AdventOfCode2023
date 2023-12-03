exports.parseInputToArrayOfArrays = (data) => {
    const lines = Array.isArray(data) ? data : data.split(/\r?\n/);
    return lines.map(l => Array.from(l.trim()));
};

exports.part1Pattern = /[^\d\.]/;
exports.part2Pattern = /[\*]/;

exports.calculateHitBoxAroundPattern = (data, pattern) => {
    let hitboxes = [];

    for (var y=0; y<data.length; y++) {
        for (var x=0; x<data[y].length; x++) {
            let cell = data[y][x];
            if (cell.match(pattern)!=null) {
                
                let hitbox = [];
                // line above
                hitbox.push([y-1,x-1]);
                hitbox.push([y-1,x]);
                hitbox.push([y-1,x+1]);

                // same line
                hitbox.push([y,x-1]);
                hitbox.push([y,x]);
                hitbox.push([y,x+1]);

                // line below
                hitbox.push([y+1,x-1]);
                hitbox.push([y+1,x]);
                hitbox.push([y+1,x+1]);

                let hit = {id: `${y}${x}`, cells: hitbox}
                hitboxes.push(hit);
            }
        }
    }
    return hitboxes;
};

exports.getLocationsOfNumbers = (data) => {
    const lines = Array.isArray(data) ? data : data.split(/\r?\n/);
    let numberLocations = [];

    for(var y=0; y<lines.length; y++) {
        let l = lines[y].trim();
        let foundNum = false;
        let numFound = '';
        let numFoundAt = [];

        for(var x=0; x<l.length; x++) {
            // is a num
            if (l.charAt(x).match(/\d/)!=null) {
                numFound += l.charAt(x).match(/\d/)[0];
                foundNum = true;
                numFoundAt.push([y,x]);
            }

            // not a num, or last char
            if (l.charAt(x).match(/\d/) == null || x+1 == l.length) {
                if (foundNum) {
                    let numberLocation = {};
                    numberLocation["number"] = parseInt(numFound);
                    numberLocation["locations"] = numFoundAt;
                    numberLocations.push(numberLocation);

                    // reset
                    foundNum = false;
                    numFoundAt = [];
                    numFound = '';
                }
            }
        }
    }

    return numberLocations;
};

exports.numbersInHitboxes = (numberLocations, symbolHitboxes) => {
    let numberHits = [];

    for(var i=0; i<numberLocations.length; i++) {
        let numberFound = false;
        for (var j=0; j<numberLocations[i].locations.length; j++) {
            let numberLocation = numberLocations[i].locations[j];

            for(var k in symbolHitboxes) {
                for (var l=0; l< symbolHitboxes[k].cells.length; l++) {
                    if (JSON.stringify(symbolHitboxes[k].cells[l]) == JSON.stringify(numberLocation)) {                    
                        numberHits.push(numberLocations[i].number);
                        numberFound = true;
                        break;
                    }
                }
            }

            if (numberFound){break;}
        }
    }
    return numberHits;
};

exports.AoCDay3Part1 = (data) => {
    const parsedInputData = this.parseInputToArrayOfArrays(data);
    const hitboxes = this.calculateHitBoxAroundPattern(parsedInputData, this.part1Pattern);
    const numberLocations = this.getLocationsOfNumbers(data);
    const matchingNumbers = this.numbersInHitboxes(numberLocations, hitboxes);

    const sum = matchingNumbers.reduce((a,c) => a+c);
    return sum;
};

exports.numbersInHitboxesPart2 = (numberLocations, asteriskHitboxes) => {
    let numberHits = {};

    for(var i=0; i<numberLocations.length; i++) {
        let numberFound = false;
        for (var j=0; j<numberLocations[i].locations.length; j++) {
            let numberLocation = numberLocations[i].locations[j];

            for(var k in asteriskHitboxes) {
                for (var l=0; l< asteriskHitboxes[k].cells.length; l++) {
                    if (JSON.stringify(asteriskHitboxes[k].cells[l]) == JSON.stringify(numberLocation)) {
                        if (!numberHits[asteriskHitboxes[k].id]) {numberHits[asteriskHitboxes[k].id] = []}
                        numberHits[asteriskHitboxes[k].id].push(numberLocations[i].number);
                        numberFound = true;
                        break;
                    }
                }
            }

            if (numberFound){break;}
        }
    }

    let parsedNumberHits = [];
    for (var n in numberHits) {
        parsedNumberHits.push({id: n, numbers: numberHits[n]})
    }
    return parsedNumberHits;
};

exports.productsOfOverlappingNumbers = (numberLocations) => {
    let products = numberLocations.filter(n => n.numbers.length==2)
        .map(n => n.numbers[0]*n.numbers[1]);

    return products.reduce((a,c) => a+c);
}

exports.AoCDay3Part2 = (data) => {
    const parsedInputData = this.parseInputToArrayOfArrays(data);
    const hitboxes = this.calculateHitBoxAroundPattern(parsedInputData, this.part2Pattern);
    const numberLocations = this.getLocationsOfNumbers(data);
    const matchingNumbers = this.numbersInHitboxesPart2(numberLocations, hitboxes);
    const products = this.productsOfOverlappingNumbers(matchingNumbers);

    return products;
};
