const {describe, it} = require('node:test');
const assert = require('node:assert/strict');

describe("AoC Day 3 : Part 1 - Logic", () => {
    const sut = require('./main.js');
    const part1Pattern = sut.part1Pattern;

    it("Parses input to array of arrays",() => {
        // arrange
        const input = `467..114..
        ...*......
        ..35..633.
        ......#...`;

        const expected = [
            ['4','6','7','.','.','1','1','4','.','.'],
            ['.','.','.','*','.','.','.','.','.','.'],
            ['.','.','3','5','.','.','6','3','3','.'],
            ['.','.','.','.','.','.','#','.','.','.']
        ];

        // act
        const actual = sut.parseInputToArrayOfArrays(input);

        // assert
        assert.deepEqual(actual, expected);
    });

    it("calculates hitbox around symbols", () => {
        const input = [
            ['4','6','7','.','.','1','1','4','.','.'],
            ['.','.','.','*','.','.','.','.','.','.'],
            ['.','.','3','5','.','.','6','3','3','.'],
            ['.','.','.','.','.','.','#','.','.','.']
        ];

        const expected = [
            {id: "13", cells: [[0,2],[0,3],[0,4],
                               [1,2],[1,3],[1,4],
                               [2,2],[2,3],[2,4]]},
            {id: "36", cells:                   [[2,5],[2,6],[2,7],
                                                 [3,5],[3,6],[3,7],
                                                 [4,5],[4,6],[4,7]]} // there is no line 5, but it doens't matter
        ];

        const actual = sut.calculateHitBoxAroundPattern(input,part1Pattern);

        assert.deepEqual(actual, expected);
     });
    
    it("calculates locations of numbers", () => {
        const input = `467..114..
        ...*......
        ..35..633.
        ......#...`;

        const expected = [
            { "number":467,"locations": [[0,0],[0,1],[0,2]]},
            { "number": 114, "locations": [[0,5],[0,6],[0,7]]},
            { "number": 35, "locations": [[2,2],[2,3]]},
            { "number": 633, "locations": [[2,6],[2,7],[2,8]]},
        ];

        const actual = sut.getLocationsOfNumbers(input);

        assert.deepEqual(actual, expected);
    });

    it("returns numbers with overlapping symbol hitboxes", () => {
        const numberLocations = [
            { "number":467,"locations": [[0,0],[0,1],[0,2]]},
            { "number": 114, "locations": [[0,5],[0,6],[0,7]]},
            { "number": 35, "locations": [[2,2],[2,3]]},
            { "number": 633, "locations": [[2,6],[2,7],[2,8]]},
        ];

        const symbolHitboxes = [
            {id: "13", cells: [[0,2],[0,3],[0,4],
                               [1,2],[1,3],[1,4],
                               [2,2],[2,3],[2,4]]},
            {id: "36", cells:                   [[2,5],[2,6],[2,7],
                                                 [3,5],[3,6],[3,7],
                                                 [4,5],[4,6],[4,7]]} // there is no line 5, but it doens't matter
        ];

        const expected = [467, 35, 633];

        const actual = sut.numbersInHitboxes(numberLocations, symbolHitboxes);

        assert.deepEqual(actual, expected);
    });
    
    it("returns numbers with overlapping symbol hitboxes from raw demo data", () => {
        const rawData = `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`;

        const parsedData = sut.parseInputToArrayOfArrays(rawData);

        const symbolHitboxes = sut.calculateHitBoxAroundPattern(parsedData,part1Pattern);
        const numberLocations = sut.getLocationsOfNumbers(rawData);

        const expected = [467, 35, 633, 617, 592, 755, 664, 598];

        const actual = sut.numbersInHitboxes(numberLocations, symbolHitboxes);

        assert.deepEqual(actual, expected);
    });
    
    it("returns numbers with overlapping symbol hitboxes from raw demo data from reddit", () => {
        const rawData = 
        `12.......*..
        +.........34
        .......-12..
        ..78........
        ..*....60...
        78.........9
        .5.....23..$
        8...90*12...
        ............
        2.2......12.
        .*.........*
        1.1..503+.56`;

        const parsedData = sut.parseInputToArrayOfArrays(rawData);

        const symbolHitboxes = sut.calculateHitBoxAroundPattern(parsedData,part1Pattern);
        const numberLocations = sut.getLocationsOfNumbers(rawData);
        
        const expected = [12, 34, 12, 78, 78, 9, 23, 90, 12, 2, 2, 12, 1, 1, 503, 56];

        const actual = sut.numbersInHitboxes(numberLocations, symbolHitboxes);

        assert.deepEqual(actual, expected);
    });
});

describe("AoC Day 3 : Part 1 - Execute", () => {
    const sut = require('./main.js');

    it("calculates the sum of the matching numbers from demo data", () => {
        const rawData = `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`;
        

        const actual = sut.AoCDay3Part1(rawData);

        assert.equal(actual, 4361);
    });

    it("calculates the sum of matching numbers", () => {
        const fs = require('fs');
        //const data = fs.readFileSync('data.txt','utf-8');

        //const actual = sut.AoCDay3Part1(data);

        //console.log(actual);

    });
});

describe("AoC Day 3 : Part 2 - Logic", () => {
    
    const sut = require('./main.js');
    const part2Pattern = sut.part2Pattern;

    it("calculates hitbox around asterisks", () => {
        const input = [
            ['4','6','7','.','.','1','1','4','.','.'],
            ['.','.','.','*','.','.','.','.','.','.'],
            ['.','.','3','5','.','.','6','3','3','.'],
            ['.','.','.','.','.','.','#','.','.','.']
        ];

        const expected = [
            {id: "13", cells: [
            [0,2],[0,3],[0,4],
            [1,2],[1,3],[1,4],
            [2,2],[2,3],[2,4]]}
        ];

        const actual = sut.calculateHitBoxAroundPattern(input, part2Pattern);

        assert.deepEqual(actual, expected);
    });

    it("counts the overlapping numbers for asterisks", () => {
        const rawData = `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`;

        const expected = [
            {id: "13", numbers: [467,35]},
            {id: "43", numbers: [617]},
            {id: "85", numbers: [755, 598]}
        ];

        const parsedData = sut.parseInputToArrayOfArrays(rawData);
        const asteriskHitboxes = sut.calculateHitBoxAroundPattern(parsedData,part2Pattern);
        const numberLocations = sut.getLocationsOfNumbers(rawData);

        const actual = sut.numbersInHitboxesPart2(numberLocations, asteriskHitboxes);

        assert.deepEqual(actual, expected);
    });
    
    it("calculates the products for the overlapping numbers for asterisks", () => {
        const input = [
            {id: "13", numbers: [467,35]}        
        ];

        const actual = sut.productsOfOverlappingNumbers(input);
        assert.deepEqual(actual, 16345);
    });

    it("calculates the products for multiple overlapping numbers for asterisks", () => {
        const input = [
            {id: "13", numbers: [467,35]},
            {id: "85", numbers: [755, 598]}
        ];

        const actual = sut.productsOfOverlappingNumbers(input);
        assert.deepEqual(actual, 467835);
    });
    
    it("calculates the products for the overlapping numbers for asterisks, ignoring one number hits", () => {
        const input = [
            {id: "13", numbers: [467,35]},
            {id: "43", numbers: [617]},
            {id: "85", numbers: [755, 598]}
        ];

        const actual = sut.productsOfOverlappingNumbers(input);
        assert.deepEqual(actual, 467835);
    });
});

describe("AoC Day 3 : Part 2 - Execute", () => {
    const sut = require('./main.js');

    it("calculates the product of the matching numbers from demo data", () => {
        const rawData = `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`;
        

        const actual = sut.AoCDay3Part2(rawData);

        assert.equal(actual, 467835);
    });

    it("calculates the sum of matching numbers", () => {
        const fs = require('fs');
        const data = fs.readFileSync('data.txt','utf-8');

        const actual = sut.AoCDay3Part2(data);

        console.log(actual);
    });
});