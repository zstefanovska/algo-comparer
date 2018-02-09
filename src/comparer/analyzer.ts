import { IAnalyzer, Complexity } from "./models";


export class Analyzer implements IAnalyzer {

    analyzeMetrics(metrics: number[]): Complexity {
        if (this.checkConstant(metrics))
            return Complexity.Constant;
        if (this.checkLinear(metrics))
            return Complexity.Linear;
        if (this.checkSquare(metrics))
            return Complexity.Square;
        if (this.checkCube(metrics))
            return Complexity.Cube;
        if (this.checkLogarithmic(metrics)) {
            return Complexity.Logarithmic;
        }
        if (this.checkExponential(metrics))
            return Complexity.Exponential;
        if (this.checkLinLog(metrics))
            return Complexity.LinearLog;

        return Complexity.Unknown;
    }

    checkLogarithmic(metrics: number[]): boolean {
        return this.checkLinear(metrics.map(value => Math.exp(value)));
    }

    checkExponential(metrics: number[]): boolean {
        return this.checkLinear(metrics.map(value => Math.log(value)));
    }

    checkLinLog(metrics: number[]) {
        metrics = metrics
            .map((value, index) => value / index)
            .map(value => Math.exp(value));
        return this.checkLinear(metrics);
    }

    forwardRunningAverage(source: number[]) {
        let value = 0;
        return source.map((item, index) => {
            if (index === 0) {
                value = item;
                return item;
            }
            value = (value * index + item) / (index + 1);
            return value;
        });
    }

    backwardRunningAverage(source: number[]) {
        return this.forwardRunningAverage(source.reverse()).reverse();
    }

    checkConstant(metrics: number[]): boolean {
        // const bra = this.backwardRunningAverage(metrics);
        // const fra = this.forwardRunningAverage(metrics);
        // const averages = fra.map((value, index) => (value + bra[index]) / 2);
        const values = this.cutExtremes(metrics, 10);
        const range = this.getRange(values);
        const min = Math.min(...values);
        return range < min * 0.08;
    }

    checkLinear(metrics: number[]): boolean {
        let deltas = this.getDeltas(metrics);
        return this.checkConstant(deltas);
    }

    checkSquare(metrics: number[]): boolean {
        let deltas = this.getDeltas(metrics);
        return this.checkLinear(deltas);
    }

    checkCube(metrics: number[]): boolean {
        let deltas = this.getDeltas(metrics);
        return this.checkSquare(deltas);
    }


    getDeltas(source: number[]) {
        return source.map((item, index) => {
            if (index === 0)
                return undefined;
            return item - source[index - 1];
        }).filter(item => !!item).map(item => <number>item);
    }

    private getRange(input: number[]): number {
        return Math.max(...input) - Math.min(...input);
    }

    /**
     * Filters out the extreme values of a number array
     *
     * @private
     * @param {number[]} input The values to process
     * @param {number} threshold The value (in percentages) to cut off
     * @memberof Analyzer
     */
    private cutExtremes(input: number[], threshold: number): number[] {
        const cutCount = (threshold / 100 * input.length) | 0;
        if (cutCount === 0) {
            return input;
        }
        const values = input.slice().sort((a, b) => a - b);
        const extremes = [...values.slice(0, cutCount), ...values.slice(-cutCount)];
        const result = input.filter(value => !extremes.includes(value));
        return result;
    }

}
