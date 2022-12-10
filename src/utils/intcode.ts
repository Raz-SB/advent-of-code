export enum OPS_CODES {
    ADD = 1,
    MULTIPLY = 2,
    HALT = 99
}

export class Program {

    private _state: number

    constructor(private instructions: Array<number>) {
    }

    public get state() {
        return this._state;
    }

    process(): Array<number> {
        let index = 0;
        while(index < this.instructions.length) {
            const opCode = this.instructions[index];
            if(opCode === OPS_CODES.HALT) {
                index = this.instructions.length + 1;
            }
            if (opCode === OPS_CODES.ADD) {
                const [firstOperandLocation, secondOperandLocation, resultLocation] = this.instructions.slice(index + 1, index + 4);
                const firstOperand = this.instructions[firstOperandLocation];
                const secondOperand = this.instructions[secondOperandLocation];
                this.instructions[resultLocation] = firstOperand + secondOperand;
                index = index + 4;
            }
            if (opCode === OPS_CODES.MULTIPLY) {
                const [firstOperandLocation, secondOperandLocation, resultLocation] = this.instructions.slice(index + 1, index + 4);
                const firstOperand = this.instructions[firstOperandLocation];
                const secondOperand = this.instructions[secondOperandLocation];
                this.instructions[resultLocation] = firstOperand * secondOperand;
                index = index + 4;
            }
        }
        return this.instructions
    }
}