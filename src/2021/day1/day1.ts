import {splitLines} from "../../utils/dataReader";

export const parseInput = (input: string): Array<number> =>
    splitLines(input).map(str => Number.parseInt(str))


export const threeples = (input: Array<number>): Array<Array<number>> =>
    Array(input.length - 2)
        .fill(null)
        .map((_, index) => input.slice(index, index + 3));

export const countIncreases = (input: Array<number>): number =>
    input.filter((val, index) => val > input[index - 1]).length
