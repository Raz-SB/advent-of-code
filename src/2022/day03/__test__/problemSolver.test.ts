import {decodeChar, parseInput, problem1} from "../problemSolver";
import {data} from "../data";

describe('day 03', function () {
    describe('decode char', function () {
        it('should decode a to 1', function () {
            expect(decodeChar('a')).toEqual(1)
        })
        it('should decode z to 26', function () {
            expect(decodeChar('z')).toEqual(26)
        })

        it('should decode A to 27', function () {
            expect(decodeChar('A')).toEqual(27)
        })

        it('should decode Z to 52', function () {
            expect(decodeChar('Z')).toEqual(52)
        })
    });

    const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

    describe('parse input', function () {
        describe('given input', function () {
            it('should have 6 rucksacks', function () {
                const result = parseInput(input)
                expect(result).toHaveLength(6)
            });

            describe('first sack', function () {

                it('should split contents across compartments', function () {
                    const [firstSack] = parseInput(input)
                    const [ firstCompartmentFromFirstSack, secondCompartmentFromFirstSack ] = firstSack.compartments
                    expect(firstCompartmentFromFirstSack.contents).toEqual('vJrwpWtwJgWr')
                    expect(secondCompartmentFromFirstSack.contents).toEqual('hcsFMMfFFhFp')
                });

                describe('common items', function () {
                    it('should find p as common item', function () {
                        const [firstSack] = parseInput(input)
                        expect(firstSack.commonItems()).toEqual(['p'])
                    })

                    it('should sum priorities for each item', function () {
                        const [firstSack] = parseInput(input)
                        const commonItemPriorities = firstSack.commonItemPriorityTotal()
                        expect(commonItemPriorities).toEqual(16)
                    });
                });
            });
        });
    });

    describe('solve problem 1', function () {
        it('should solve for test data', function () {
            const result = problem1(input)
            expect(result).toEqual(157)
        });

        it('should solve for large data set', function () {
            const result = problem1(data)
            expect(result).toEqual(157)
        });
    });
});