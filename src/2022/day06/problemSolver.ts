export function hasRepeatedCharacters(testInput: string | string[]) {
    const arr = Array.isArray(testInput) ? testInput : testInput.split('')
    const uniqueChars = new Set(arr)
    return uniqueChars.size !== testInput.length
}

export const findFirstPositionWherePreviousNCharactersWereUnique = (numberOfChars: number, testInput: string): number => {
    return testInput.split('')
        .reduce((acc, curr, index, array) => {
            if(acc === -1 && index > numberOfChars -1) {
                const previous4Chars = array.slice(index - numberOfChars, index)
                if (!hasRepeatedCharacters(previous4Chars)) {
                    return index
                }
            }
            return acc
        }, -1);
}

export const problem1 = (data: string) => findFirstPositionWherePreviousNCharactersWereUnique(4, data)
export const problem2 = (data: string) => findFirstPositionWherePreviousNCharactersWereUnique(14, data)

