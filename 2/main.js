exports.isGamePossible = (testConfig, gameConfig) => {
    return gameConfig.sets.filter(s => {
        return (s[0]<=testConfig[0] && 
               s[1]<=testConfig[1] &&
               s[2]<=testConfig[2])}).length == gameConfig.sets.length;
};

exports.possibleGameIdOrZero = (testConfig, gameConfig) => {
    return (this.isGamePossible(testConfig, gameConfig) ?
        gameConfig.id : 0);
};

exports.sumOfPossibleGameIds = (testConfig, gameConfigs) => {
    const values = gameConfigs.map(g => this.possibleGameIdOrZero(testConfig, g));
    return values.reduce((a,c)=>a+c);
};

exports.parseLineToGameConfig = (input) => {
    const data = input.split(':');

    // part 1
    const parsedId = parseInt(data[0].match(/(\d)+/)[0]);

    // part 2
    const parsedSets = data[1].split(';').map(s => {
        const red = s.match(/(\d+) red/) ? parseInt(s.match(/(\d+) red/)[1]) : 0;
        const green = s.match(/(\d+) green/) ? parseInt(s.match(/(\d+) green/)[1]) : 0;
        const blue = s.match(/(\d+) blue/) ? parseInt(s.match(/(\d+) blue/)[1]) : 0;
        return [red,green,blue];
    });

    return { id:parsedId, sets: parsedSets }
};

exports.AoCDay2Part1 = (data, testConfig) => {
    const entries = Array.isArray(data) ? data : data.split(/\r?\n/);

    const gameConfigs = entries.filter(e => e.trim().length > 0).map(this.parseLineToGameConfig);
    return this.sumOfPossibleGameIds(testConfig , gameConfigs);
};

exports.minCubeCount = (gameConfig) => {
    let minRed = 1, minGreen = 1, minBlue = 1;
    gameConfig.sets.forEach(s => {
        minRed = (s[0] > minRed ? s[0] : minRed);
        minGreen = (s[1] > minGreen ? s[1] : minGreen);
        minBlue = (s[2] > minBlue ? s[2] : minBlue);
    });

    return [minRed, minGreen, minBlue];
};

exports.gamePower = (gameConfig) => {
    const minCubeCount = this.minCubeCount(gameConfig);
    return minCubeCount[0] * minCubeCount[1] * minCubeCount[2];
};

exports.sumOfGamePowers = (gameConfigs) => {
    const values = gameConfigs.map(g => this.gamePower(g));
    return values.reduce((a,c)=>a+c);
};

exports.AoCDay2Part2 = (data) => {
    const entries = Array.isArray(data) ? data : data.split(/\r?\n/);

    const gameConfigs = entries.filter(e => e.trim().length > 0).map(this.parseLineToGameConfig);
    return this.sumOfGamePowers(gameConfigs);
};