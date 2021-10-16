import input from './input';

const NUMBER_OF_ROWS = 128;
const INITIAL_RANGE: Range = {min: 0, max: NUMBER_OF_ROWS - 1};

enum RowPartition {
    F = 'Front',
    B = 'Back'
}

enum SeatPartition {
    L = 'Left',
    R = 'Right'
}

type Range = {
    min: number
    max: number
}


const bisectFunctions = {
    'Front': (range: Range) => ({...range, max: Math.floor(range.max - (range.max - range.min) / 2)}),
    'Back': (range: Range) => ({...range, min: Math.ceil(range.min + ((range.max - range.min) / 2))})
}

const bisectRange = (instruction: RowPartition, range: Range): Range => {
    return bisectFunctions[instruction](range);
}

const parseInputAsCases: () => string[] = () => {
    return input.split('\n')
};

const figureOutWhichSeatItIs = (seatInstructions: SeatPartition[], INITIAL_RANGE: Range) => {
    // TODO: Implement
};

const figureOutRowAndSeat = ({rowInstructions, seatInstructions}) => {
    return ({
        row: figureOutRowRecursively(rowInstructions, INITIAL_RANGE),
        seat: figureOutWhichSeatItIs(seatInstructions, INITIAL_RANGE)
    });
};


export const solveProblem = () => {
    return parseInputAsCases()
        .map(parseOutInstructions)
        .map(figureOutRowAndSeat)
}

const parseOutInstructions = (input: string): { rowInstructions: RowPartition[], seatInstructions: SeatPartition[] } => {
    const rowMarkers = input.substring(0, 7);
    const seatMarkers = input.substring(7);

    return {
        rowInstructions: [...rowMarkers].map(eachRowMarker => RowPartition[eachRowMarker]),
        seatInstructions: [...seatMarkers].map(eachSeatMarker => SeatPartition[eachSeatMarker])
    }
};

const figureOutRowRecursively = (rowInstructions: RowPartition[], currentRange: Range) => {
    if (currentRange.min !== currentRange.max) {
        const [nextInstruction, ...restOfInstructions] = rowInstructions
        if (nextInstruction) {
            const newRange = bisectRange(nextInstruction, currentRange);
            return figureOutRowRecursively(restOfInstructions, newRange)
        } else {
            new Error('could not figure out exact row')
        }
    } else {
        return currentRange.min
    }
}

const figureOutRowIteratively = (rowInstructions: RowPartition[], range: Range) => {
    return rowInstructions.reduce((acc, curr) => bisectRange(curr, acc),
        range).min
}

export const figureOutWhichRowItIs = (input: string): number => {
    const {rowInstructions} = parseOutInstructions(input)
    return figureOutRowRecursively(rowInstructions, INITIAL_RANGE)
}
