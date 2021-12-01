import {splitLines} from "../../utils/dataReader";

export const parseInput = (input: string): Array<number> =>
    splitLines(input).map(str => Number.parseInt(str))


export const threeples = (input: Array<number>): Array<Array<number>> => {
    return input.reduce((prev, curr, index) => {
        if (input.length - index > 2) {
            prev.push(input.slice(index, index + 3))
        }
        return prev
    }, []);
};

export const countIncreases = (input: Array<number>): number =>
    input.filter((val, index) => val > input[index - 1]).length
