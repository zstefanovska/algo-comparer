import { Analyzer } from "./comparer/analyzer";


const analyzer = new Analyzer();

const metrics = Array(50).fill(undefined).map((_, index) => index);

console.log(analyzer.checkConstant(metrics));
console.log(analyzer.checkLinear(metrics));
console.log(analyzer.checkSquare(metrics));
