export enum Complexity {
    Constant = "constant",
    Linear = "linear",
    Square = "square",
    Logarithmic = "logarithmic",
    Exponential = "exponential",
    LinearLog = "linear-log",
    Unknown = "unknown"
}

export class Analyzer {

    analyzeMetrics(metrics: number[]) {
        if (this.checkConstant(metrics))
            return Complexity.Constant;
        if (this.checkLinear(metrics))
            return Complexity.Linear;
        if (this.checkSquare(metrics))
            return Complexity.Square;
        if (this.checkExponential(metrics))
            return Complexity.Exponential;
        return Complexity.Unknown;
    }

    checkExponential(metrics: number[]): boolean {
        return this.checkLinear(metrics.map(value => Math.log(value)));
    }

    checkConstant(metrics: number[]): boolean {
        const values = this.cutExtremes(metrics, 10);
        const range = this.getRange(values);
        const min = Math.min(...values);
        // allow 50% of leaway
        return range < min * 0.5;
    }

    checkLinear(metrics: number[]): boolean {
        let deltas = metrics.map((item, index) => {
            if (index === 0)
                return undefined;
            return item - metrics[index - 1];
        }).filter(item => !!item).map(item => <number>item);
        return this.checkConstant(deltas);
    }

    checkSquare(metrics: number[]): boolean {
        let deltas = metrics.map((item, index) => {
            if (index === 0)
                return undefined;
            return item - metrics[index - 1];
        }).filter(item => !!item).map(item => <number>item);

        return this.checkLinear(deltas);
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
