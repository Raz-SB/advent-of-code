export const decodeChar = (char: string): number => {
    const charCode = char.charCodeAt(0)
    return charCode > 96 ? charCode - 96 : charCode - 38
}

const splitInHalf = (input: string): Array<string> => {
    const half = Math.floor(input.length / 2)
    return [input.slice(0, half), input.slice(half)]
}

class Compartment {
    constructor(public readonly contents: string) {
    }
}

export class Rucksack {
    private readonly _compartments: Compartment[] = [];
    constructor(contents: string) {
        const [firstHalf, secondHalf] = splitInHalf(contents)
        this._compartments = [new Compartment(firstHalf), new Compartment(secondHalf)]
    }

    get compartments(): Compartment[] {
        return this._compartments
    }

    // Returns items common to each compartment
    commonItems(): string[] {
        const [firstCompartment, secondCompartment] = this.compartments
        const firstCompartmentItems = firstCompartment.contents.split('')
        const secondCompartmentItems = secondCompartment.contents.split('')
        return firstCompartmentItems.filter(item => secondCompartmentItems.includes(item))
            .reduce((uniqueItems, item) => uniqueItems.includes(item) ? uniqueItems : [...uniqueItems, item], [])
    }

    commonItemPriorityTotal(): number {
        return this.commonItems().reduce((total, item) => total + decodeChar(item), 0)
    }
}

export const parseInput = (input: string): Rucksack[] => {
    return input.split('\n')
        .map(line => new Rucksack(line))
}

export const problem1 = (input: string): number => {
    const rucksacks = parseInput(input)
    return rucksacks.reduce((total, rucksack) => total + rucksack.commonItemPriorityTotal(), 0)
}