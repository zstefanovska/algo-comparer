import { Algorithm } from "comparer";


export class BruteForceFibbonaci implements Algorithm {

    private callCount: number = 0;

    public name: string = "bruteForceFibbonaci";
    public problemName: string = "Fibbonacci";
    public metrics = {
        callCount: () => this.callCount
    };

    public reset() {
        this.callCount = 0;
    }

    public run(value: number) {
        return this.fibbonaci(value);
    }

    public fibbonaci(value: number): number {
        this.callCount += 1;
        if (value < 0) {
            throw Error("Invalid for negative numbers");
        }
        if ((value | 0) !== value) {
            throw Error("Invalid for non-integer numbers");
        }

        if ([1, 0].includes(value)) {
            return 1;
        }

        return this.fibbonaci(value - 1) + this.fibbonaci(value - 2);
    }
}

