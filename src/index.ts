import { BruteForce } from "./fibbonaci/fib-brute";
import { Dynamic } from "./fibbonaci/fib-dynamic";
import { ProblemOptions, AlgorithmComparer } from "./comparer";

function run() {
    const options: ProblemOptions = {
        name: "Fibbonacci",
        metricNames: ["callCount"],
        inputs: (index) => index,
        inputLength: 40
    };

    const comparer = new AlgorithmComparer(options);
    comparer.registerAlgorithm(new BruteForce());
    comparer.registerAlgorithm(new Dynamic());

    comparer.runAlgorithms();

    comparer.displayResults();
}

run();
