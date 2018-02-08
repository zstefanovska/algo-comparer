import { BruteForceFibbonaci } from "./fibbonaci/fib-brute";
import { DynamicFibbonaci } from "./fibbonaci/fib-dynamic";
import { ProblemOptions, AlgorithmComparer, Analyzer } from "./comparer";

function run() {
    const options: ProblemOptions = {
        name: "Fibbonacci",
        metricNames: ["callCount"],
        inputs: (index) => index,
        inputLength: 40
    };

    const comparer = new AlgorithmComparer(options, new Analyzer());
    comparer.registerAlgorithm(new BruteForceFibbonaci());
    comparer.registerAlgorithm(new DynamicFibbonaci());

    comparer.runAlgorithms();

    comparer.displayResults();

    comparer.displayAnalysis();
}

run();
