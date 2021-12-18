import {splitLines} from "../../utils/dataReader";
import {polymerTemplate} from "./data";

export const getPairs = (input: string): string[] =>  {
    return input.split('').reduce((prev, curr, index, originalArray) => {
        const nextChar =  originalArray[index+1]
        if (nextChar) {
            prev.push(curr + nextChar)
        }
        return prev
    }, [])
}

type InsertionRule = {
    pair: string;
    insert: string;
}
export const parseInsertionRules = (input: string) => {
    return splitLines(input)
        .map(eachLine => {
            const [pair, insert] = eachLine.split(' -> ')
            return { pair, insert }
        }).reduce((prev, curr) => ({ ...prev, [curr.pair]: curr.insert }), {})
}

type InsertionRules = { [p: string]: string };
export const insert = (polymerTemplate: string, insertionRules: InsertionRules): string =>  {
    let strings = getPairs(polymerTemplate)
        .map(eachPair => {
            const insert = insertionRules[eachPair]
            const [first, last] = eachPair.split('')
            return `${first}${insert}`
        });
    return strings.join('') + polymerTemplate.split('').reverse()[0]
}

export const insertRecursively = (polymerTemplate: string, insertionRules: InsertionRules, triesRemaining: number): string =>  {
    if (triesRemaining) {
        let strings = getPairs(polymerTemplate)
            .map(eachPair => {
                const insert = insertionRules[eachPair]
                const [first, last] = eachPair.split('')
                return `${first}${insert}`
            });
        const newString = strings.join('') + polymerTemplate.split('').reverse()[0]
        return insertRecursively(newString, insertionRules, --triesRemaining)
    }
    return polymerTemplate
}

export const problem1 = (polymerTemplate: string, insertionRules: InsertionRules): number => {
    const resultAfter10Tries = insertRecursively(polymerTemplate, insertionRules, 10)
    const lettersByOccurrence: { [k: string]: number } = resultAfter10Tries.split('')
        .reduce((prev, curr) => {
            prev[curr] = (prev[curr] || 0) + 1
            return prev
        }, {})

    const mostFrequentlyOccurringValue = Math.max(...Object.values(lettersByOccurrence))
    const leastFrequentlyOccurringValue = Math.min(...Object.values(lettersByOccurrence))
    // const [mostFrequentLetter] = Object.entries(lettersByOccurrence).find(([key, val]) => val === mostFrequentlyOccurringValue)
    // const [leastFrequentLetter] = Object.entries(lettersByOccurrence).find(([key, val]) => val === leastFrequentlyOccurringValue)
    return mostFrequentlyOccurringValue - leastFrequentlyOccurringValue;
}
