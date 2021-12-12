import {splitLines} from "../../utils/dataReader";
import {each} from "lodash";
import {sum} from "../../utils/listOps";

const charSets = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}

const scores = {
    /**
     * ): 3 points.
     ]: 57 points.
     }: 1197 points.
     >: 25137 points.
     */

    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}
export const validateLine = (line: string) => {
    const expectedClosingChars = []
    for (let char of line.split('')) {
        if (char in charSets) {
            expectedClosingChars.push(charSets[char])
        } else if (char !== expectedClosingChars.pop()) {
            return [char]
        }
    }
    return []
}

export const scoreSyntaxErrors = (input: string): number => {
    return sum(splitLines(input)
        .map(eachLine => validateLine(eachLine))
        .reduce((prev, curr) => [...prev, ...curr], [])
        .map(eachIllegalChar => scores[eachIllegalChar]))
}
