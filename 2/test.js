const {describe, it} = require('node:test');
const assert = require('node:assert/strict');

describe("AoCDay2 : Setup",() => {
    const sut = require('./main.js');

    it("parses input to gameConfig structure",() => {
        // arrange
        const input = "Game 60: 4 red, 9 green, 3 blue; 2 blue, 8 green, 6 red; 2 red, 8 green, 3 blue; 8 green, 2 red, 2 blue";
        const expected = { id:60, sets: [[4,9,3], [6,8,2], [2,8,3],[2,8,2]]};

        // act
        const result = sut.parseLineToGameConfig(input);

        // assert
        assert.deepEqual(result, expected);
    });
});

describe("AoCDay2Part1 : Logic",() => {
    const sut = require('./main.js');

    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    it("should return true if a game is possible based on input", () => {
        // arrange
        const testConfig = [12,13,14]; // RGB
        const gameConfig = { id:1, sets: [[4,0,3], [1,2,6], [0,2,0]]};

        // act
        const result = sut.isGamePossible(testConfig, gameConfig);

        // assert
        assert.equal(result, true);
    });

    // Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    it("should return false if a game is not possible based on input", () => {
        // arrange
        const testConfig = [12,13,14]; // RGB
        const gameConfig = { id:1, sets: [[20,8,6], [4,13,5], [1,5,0]]};

        // act
        const result = sut.isGamePossible(testConfig, gameConfig);

        // assert
        assert.equal(result, false);
    });
    
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    it("should return id of matching games if a game is possible based on input", () => {
        // arrange
        const testConfig = [12,13,14]; // RGB
        const gameConfig = { id:1, sets: [[4,0,3], [1,2,6], [0,2,0]]};

        // act
        const result = sut.possibleGameIdOrZero(testConfig, gameConfig);

        // assert
        assert.equal(result, 1);
    });
    
    // Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    it("should return 0 of matching games if a game is not possible based on input", () => {
        // arrange
        const testConfig = [12,13,14]; // RGB
        const gameConfig = { id:1, sets: [[20,8,6], [4,13,5], [1,5,0]]};

        // act
        const result = sut.possibleGameIdOrZero(testConfig, gameConfig);

        // assert
        assert.equal(result, 0);
    });
    
    it("should return a sum of matching game ids of possible games based on input", () => {
        // arrange
        const testConfig = [12,13,14]; // RGB
        const gameConfigs = [
                { id:1, sets: [[20,8,6], [4,13,5], [1,5,0]]},
                { id:2, sets: [[4,0,3], [1,2,6], [0,2,0]]},
                { id:3, sets: [[4,0,3], [1,2,6], [0,2,0]]}
            ];

        // act
        const result = sut.sumOfPossibleGameIds(testConfig, gameConfigs);

        // assert
        assert.equal(result, 5);
    });
});


describe("AoCDay2Part1 : Execute - demo data", () => {
    const demoData = `
    Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
    const sut = require('./main.js');
    const testConfig = [12,13,14];

    const actual = sut.AoCDay2Part1(demoData, testConfig);

    assert.equal(actual, 8);
});

describe("AoCDay2Part1 : Execute - input data", () => {
    const fs = require('fs');
    const data = fs.readFileSync('data.txt','utf-8');

    const sut = require('./main.js');
    const testConfig = [12,13,14];

    const actual = sut.AoCDay2Part1(data, testConfig);

    console.log(actual);
});

describe("AoCDay2Part2 : Logic", ()=> {
    const sut = require('./main.js');

    it("should get the min count possible", () => {
        const gameLine = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`;
        const gameConfig = sut.parseLineToGameConfig(gameLine);

        const actual = sut.minCubeCount(gameConfig);
        assert.deepEqual(actual, [4,2,6]);
    });
    
    it("should return a sum of the power for many games", () => {
        const data = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

        const entries = Array.isArray(data) ? data : data.split(/\r?\n/);
        const gameConfigs = entries.filter(e => e.trim().length > 0).map(sut.parseLineToGameConfig);

        const actual = sut.sumOfGamePowers(gameConfigs);
        assert.equal(actual, 2286);
    });
});

describe("AoCDay2Part2 : Execute - input data", () => {
    const fs = require('fs');
    const data = fs.readFileSync('data.txt','utf-8');

    const sut = require('./main.js');

    const actual = sut.AoCDay2Part2(data);

    console.log(actual);
});