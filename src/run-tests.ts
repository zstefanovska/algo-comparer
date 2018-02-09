import { ProblemOptions, AlgorithmComparer, Analyzer } from "./comparer";

function run() {
    const options: ProblemOptions = {
        name: "demo",
        metricNames: ["demoMetric"],
        inputs: (index) => index,
        inputLength: 20
    };

    const comparer = new AlgorithmComparer(options, new Analyzer());

    const linearAlgorithm = (() => {
        let demoMetric: number;

        return {
            name: "Linear metric",
            problemName: "demo",
            metrics: {
                demoMetric: () => demoMetric
            },
            run: (index: number) => {
                demoMetric = index;
                return index;
            },
            reset: () => { /* Empty block*/ }
        };
    })();

    const squareAlgorithm = (() => {
        let demoMetric: number;

        return {
            name: "Square metric",
            problemName: "demo",
            metrics: {
                demoMetric: () => demoMetric
            },
            run: (index: number) => {
                demoMetric = index * index;
                return index;
            },
            reset: () => { /* Empty block*/ }
        };
    })();

    const constantAlgorithm = (() => {
        let demoMetric: number;

        return {
            name: "Constant metric",
            problemName: "demo",
            metrics: {
                demoMetric: () => demoMetric
            },
            run: (index: number) => {
                demoMetric = 0;
                return index;
            },
            reset: () => { /* Empty block*/ }
        };
    })();

    const logarithmicAlgorithm = (() => {
        let demoMetric: number;

        return {
            name: "Logarithmic metric",
            problemName: "demo",
            metrics: {
                demoMetric: () => demoMetric
            },
            run: (index: number) => {
                const value = index * Math.pow(10, 20) + 10;
                demoMetric = Math.log(value);
                return index;
            },
            reset: () => { /* Empty block*/ }
        };
    })();


    const exponentialAlgorithm = (() => {
        let demoMetric: number;

        return {
            name: "Exponential metric",
            problemName: "demo",
            metrics: {
                demoMetric: () => demoMetric
            },
            run: (index: number) => {
                demoMetric = Math.exp(index);
                return index;
            },
            reset: () => { /* Empty block*/ }
        };
    })();


    const linLogAlgorithm = (() => {
        let demoMetric: number;

        return {
            name: "Linear Logarithmic metric",
            problemName: "demo",
            metrics: {
                demoMetric: () => demoMetric
            },
            run: (index: number) => {
                const value = index;
                demoMetric = value * Math.log(value);
                return index;
            },
            reset: () => { /* Empty block*/ }
        };
    })();


    comparer.registerAlgorithm(constantAlgorithm);
    comparer.registerAlgorithm(linearAlgorithm);
    comparer.registerAlgorithm(squareAlgorithm);
    comparer.registerAlgorithm(logarithmicAlgorithm);
    comparer.registerAlgorithm(exponentialAlgorithm);
    comparer.registerAlgorithm(linLogAlgorithm);

    comparer.runAlgorithms();

    // comparer.displayResults();

    comparer.displayAnalysis();
}

run();
