export type NumberMap = { [key: string]: number };

export type Metric = () => number;
export type MetricMap = { [key: string]: Metric };
export type MetricValuesMap = {
    runTime: number,
    [key: string]: number
};

export type InputFunction<T> = (index: number) => T;

export interface ProblemOptions {
    name: string;
    metricNames: string[];
    inputs: any[] | InputFunction<any>;
    inputLength?: number;
}

export interface Algorithm {
    name: string;
    problemName: string;
    metrics: MetricMap;
    run(input: any): any;
    reset(): void;
}

export type RunDetail = {
    index: number;
    metrics: MetricValuesMap
};

export type RunDetails = RunDetail[];

export interface TotalMetrics {
    timeSpent: number;
}

export interface AlgorithmResult {
    totals: TotalMetrics;
    runDetails: RunDetails;
}

export type AlgorithmResults = { [key: string]: AlgorithmResult };

export enum Complexity {
    Constant = "constant",
    Linear = "linear",
    Square = "square",
    Logarithmic = "logarithmic",
    Exponential = "exponential",
    LinearLog = "linear-log",
    Unknown = "unknown"
}

export interface IAnalyzer {
    analyzeMetrics(metrics: number[]): Complexity;
}
