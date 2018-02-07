import { NumberMap } from "comparer";

export class DynamicFibbonaci {

    private callCount: number = 0;
    private cache: NumberMap = {
        0: 1,
        1: 1
    };

    public name: string = "dynamicFibbonaci";
    public problemName: string = "Fibbonacci";
    public metrics = {
        callCount: () => this.callCount
    };

    public reset() {
        this.callCount = 0;
        this.cache = {
            0: 1,
            1: 1
        };
    }

    public run(value: number) {
        return this.fibbonaci(value);
    }

    public fibbonaci(value: number) {
        this.callCount += 1;
        if (value < 0) {
            throw Error("Invalid for negative numbers");
        }
        if ((value | 0) !== value) {
            throw Error("Invalid for non-integer numbers");
        }

        if (!this.cache[value]) {
            this.cache[value] = this.fibbonaci(value - 1) + this.fibbonaci(value - 2);
        }

        return this.cache[value];
    }
}

