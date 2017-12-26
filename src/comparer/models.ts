export type NumberMap = { [key: string]: number };

export type Metric = () => number;
export type MetricMap = { [key: string]: Metric };

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

