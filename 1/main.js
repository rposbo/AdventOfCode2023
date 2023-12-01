exports.AoCDay1 = (data => {
    let totalCalibrationValue = 0;

    const entries = Array.isArray(data) ? data : data.split(/\r?\n/);

    entries.forEach(e => {
        totalCalibrationValue += this.calculateCalibrationValue(e);
    });

    return totalCalibrationValue;
});

exports.mapWordToNumber = (word) => {
    // word to numeric value mapping
    const numbersAsWords = {"one":1,"two":2,"three":3,"four":4,"five":5,"six":6,"seven":7,"eight":8,"nine":9};
    return numbersAsWords[word];
};

exports.calculateCalibrationValue = (e) => {
    let firstDigit = null;
    let lastDigit = null;

    // go through each char in case of overlaps, which a regex misses
    for (let idx in e) {
        if (this.numberMatch(idx, e) && firstDigit == null) {firstDigit = this.numberMatch(idx, e);}
        if (this.numberMatch(idx, e)) {lastDigit = this.numberMatch(idx, e);}
    }

    // the value for this line is "first""last" as a number
    let calibrationValue = parseInt(''+firstDigit+lastDigit);
    return calibrationValue;
};

exports.numberMatch = (idx, word) => {
    idx = parseInt(idx);
    if (parseInt(word[idx])) return parseInt(word[idx]);
    if (['one','two','six'].includes(word.slice(idx, idx+3))) {  return this.mapWordToNumber(word.slice(idx, idx+3)) }
    if (['four','five','nine'].includes(word.slice(idx, idx+4))) { return this.mapWordToNumber(word.slice(idx, idx+4)) }
    if (['three','seven','eight'].includes(word.slice(idx, idx+5))) { return this.mapWordToNumber(word.slice(idx, idx+5)) }
}