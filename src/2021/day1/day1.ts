import {splitLines} from "../../utils/dataReader";

export const parseInput = (input: string): Array<number> => {
   return splitLines(input).map(str => Number.parseInt(str));
}

export const countIncreases = (input: Array<number>): number => {
   return input.filter((val, index) => val > input[index -1]).length;
}
