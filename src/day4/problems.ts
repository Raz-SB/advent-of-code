import { readFile } from '../utils/dataReader';

export type PassportInfo = {
    hgt: string
    ecl: string
    eyr: string
    hcl: string
    byr: string
    pid: string
    iyr: string
    cid?: string
}
export const parsePassportInfo = (input: string): PassportInfo => {
    return input.replace(new RegExp('\n', 'g'), ' ').split(' ').map(eachAttribute => {
        const [key, val] = eachAttribute.split(':')
        return {[key]: val}
    }).reduce((acc, curr) => ({...acc, ...curr}), {} as PassportInfo) as PassportInfo
}

export const validatePassport = (passportInfo: Partial<PassportInfo>): boolean => {
    const requiredFields = ['hgt', 'ecl', 'eyr', 'hcl', 'byr', 'pid', 'iyr'];
    const keysFromPassportInfo = Object.keys(passportInfo);
    let b = requiredFields.every(requiredField => keysFromPassportInfo.includes(requiredField));
    return b
}

const parseCases = (input: string): Array<string>  => input.split('\n\n')

export const problem1 = () => {
    readFile('src/day4/datafile.txt')
        .then(parseCases)
        .then(cases => cases.map(eachCase => parsePassportInfo(eachCase)))
        .then(passports => passports.filter(validatePassport))
        .then(validPassports => validPassports.length)
        .then(numberOfValidPassports => {
            console.log(`Valid Passports: `, numberOfValidPassports)
            return numberOfValidPassports
        })
}

