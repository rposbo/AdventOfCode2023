const {it, describe} = require('node:test');
const assert = require('node:assert/strict');

describe("Advent of Code Day 1", () => {
    const sut = require('./main.js');

    it("Extracts numbers as words using test data set: 1abc2", () => {
        // arrange
        const data = `1abc2`;

        // act
        const result = sut.calculateCalibrationValue(data);

        // assert
        assert.equal(result,12);
        
    });
    
    it("Extracts numbers as words using test data set", () => {
        // arrange
        const data = ['1abc2','pqr3stu8vwx','a1b2c3d4e5f','treb7uchet'];

        // act
        const results = data.map(r => sut.calculateCalibrationValue(r));

        // assert
        assert.equal(results[0], 12);
        assert.equal(results[1], 38);
        assert.equal(results[2], 15);
        assert.equal(results[3], 77);
        
    });

    it("Extracts numbers as words using test data set: fhccktwonenrj", () => {
        // arrange
        const data = `fhccktwonenrj`;

        // act
        const result = sut.calculateCalibrationValue(data);

        // assert
        assert.equal(result,21);
        
    });

    it("Extracts numbers as words using test data set: bcmqn9onecnrzhsrsgzggzhtskjeightbz6khfhccktwonenrj", () => {
        // arrange
        const data = `bcmqn9onecnrzhsrsgzggzhtskjeightbz6khfhccktwonenrj`;

        // act
        const result = sut.calculateCalibrationValue(data);

        // assert
        assert.equal(result,91);
        
    });

    it("Extracts numbers as words using test data set and calculcates total", () => {
        // arrange
        const data = ['1abc2','pqr3stu8vwx','a1b2c3d4e5f','treb7uchet'];

        // act
        const result = sut.AoCDay1(data);

        // assert
        assert.equal(result, 142);
        
    });

    it("Extracts numbers as words using full data set", () => {
        // arrange
        const fs = require('fs');
        const data = fs.readFileSync('data.txt','utf-8');

        // act
        const result = sut.AoCDay1(data);

        // assert?
        console.log(result);

    });
});