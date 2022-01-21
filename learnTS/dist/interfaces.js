"use strict";
class SuperHeroes {
    constructor(name, score) {
        this.name = name;
        this.score = score;
        this.name = name;
        this.score = score;
        this.scores = [];
        this.superHeros = [];
    }
    addScores(score) {
        this.scores.push(score);
        return this;
    }
    addHeroes(name) {
        this.superHeros.push(name);
        return this;
    }
}
const Thor = new SuperHeroes('Thor', 200);
const Hulk = new SuperHeroes('Hulk', 200);
Thor.addHeroes('Hulk')
    .addScores(600)
    .addScores(800)
    .addHeroes('SpiderMan')
    .addHeroes('IronMan');
const strongest = Thor.superHeros.filter(strong => strong === 'Hulk');
console.log(Thor.scores);
console.log(Thor.superHeros);
console.log(strongest);
Thor.superHeros.sort();
console.log(Thor.superHeros.sort());
console.log(Thor);
//# sourceMappingURL=interfaces.js.map