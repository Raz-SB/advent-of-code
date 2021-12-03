import {fillArray} from "../../utils/listOps";
import {splitLines} from "../../utils/dataReader";

type DiagnosticReport = {
    gamma: number
    epsilon: number
}


const getPowerConsumption = (report: DiagnosticReport) => report.epsilon * report.gamma;

const getBitsByPosition = (data: Array<string>, position: number): Array<1 | 0> => {
    return data.map(eachString => Number.parseInt(eachString[position]) as 1 | 0)
}

const getMostCommonBit = (bits: Array<1 | 0>): 1 | 0 => {
    return bits.filter(bit => bit === 0).length > bits.length / 2
        ? 0 : 1
}

const getLeastCommonBit = (bits: Array<1 | 0>): 1 | 0 => {
    return bits.filter(bit => bit === 0).length > bits.length / 2
        ? 1 : 0
}

const gammaRate = (bits: Array<string>): number => {
    const bitString = fillArray(bits[0].length)
        .map(index => getMostCommonBit(getBitsByPosition(bits, index)))
        .join('')

    return Number.parseInt(bitString, 2)
}

const epsilonRate = (bits: Array<string>): number => {
    const bitString = fillArray(bits[0].length)
        .map(index => getLeastCommonBit(getBitsByPosition(bits, index)))
        .join('')

    return Number.parseInt(bitString, 2)
}

const solveProblem1 = (data: string): number => {
    const rawDiagnostics =  splitLines(data)
    const dianosticReport = {
        gamma: gammaRate(rawDiagnostics),
        epsilon: epsilonRate(rawDiagnostics)
    }
    return getPowerConsumption(dianosticReport)
}

export {DiagnosticReport, getBitsByPosition, getMostCommonBit, gammaRate, epsilonRate, solveProblem1}
