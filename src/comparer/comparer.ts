import { ProblemOptions, Algorithm, InputFunction, NumberMap, AlgorithmResults } from "./models";

export class AlgorithmComparer {

    private algorithms: Algorithm[] = [];
    private problemName: string;
    private metrics: string[];
    private inputs: any[] | InputFunction<any>;

    private results: AlgorithmResults = {};

    constructor(private options: ProblemOptions) {
        this.problemName = options.name;
        this.metrics = options.metricNames.slice();
        this.inputs = options.inputs;
    }

    registerAlgorithm(algorithm: Algorithm) {
        if (!algorithm) {
            throw Error("The algorithm is not defined");
        }
        // check problem name
        if (algorithm.problemName !== this.problemName) {
            throw Error(`The algorithm ${algorithm.name} solves the problem ${algorithm.problemName}, instead of ${this.problemName}`);
        }
        if (!algorithm.metrics) {
            throw Error("The algorithm metrics are not defined");
        }
        // check available metrics
        let availableMetrics = Object.keys(algorithm.metrics);
        this.metrics.forEach(metric => {
            if (!availableMetrics.includes(metric)) {
                throw Error(`Metric ${metric} is not available on algorithm ${algorithm.name}`);
            }
        });

        // check name uniqueness
        if (this.results[algorithm.name]) {
            throw Error(`The algorithm ${algorithm.name} is already registered on problem ${this.problemName}`);
        }

        this.algorithms.push(algorithm);
        this.results[algorithm.name] = {
            runDetails: [],
            totals: {
                timeSpent: 0
            }
        };
    }

    getInput(index: number) {
        if (typeof this.inputs === "function") {
            return this.inputs(index);
        } else {
            return this.inputs[index];
        }
    }

    getInputLength() {
        const maxInputs = 100;
        if (this.options.inputLength)
            return this.options.inputLength;
        return (typeof this.inputs === "function") ? maxInputs : this.inputs.length;
    }

    runAlgorithms() {
        const inputLength = this.getInputLength();
        for (let index = 0; index < inputLength; index++) {
            const input = this.getInput(index);
            this.algorithms.forEach(algorithm => {
                algorithm.run(input);
                const metrics: NumberMap = {};
                this.metrics.forEach(metric => metrics[metric] = algorithm.metrics[metric]());
                this.results[algorithm.name].runDetails.push({ index, metrics });
            });
        }
    }

    displayResults() {
        Object.keys(this.results).forEach(algorithm => {
            console.log(algorithm);
            console.log(this.results[algorithm].totals);
            console.log(this.results[algorithm].runDetails);
        });
    }
}
