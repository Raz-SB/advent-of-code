import {scoreSyntaxErrors, validateLine} from "../day10";
import exp from "constants";
import {data} from "../data";

describe('Day 10', function () {
    describe('validation', function () {
        describe('valid lines', function () {

            //([]), {()()()}, <([{}])>, [<>({}){}[([])<>]], and even (((((((((())))))))))
            const cases = ['()', '([])', '{()()()}', '<([{}])>', '[<>({}){}[([])<>]]', '(((((((((())))))))))']


            const testValidLine = (testCase: string) => {
                it(`should return empty array for valid line: ${testCase}`, function () {
                    const validationErrors = validateLine(testCase)
                    expect(validationErrors).toHaveLength(0)
                });
            }

            cases.forEach((testCase) => testValidLine(testCase))
        });

        describe('finding corrupted lines', function () {
            const cases = ['(]', '{()()()>', '(((()))}', '<([]){()}[{}])'];
            const testInvalidLIne = (testCase: string) => {
                it(`should detect invalid lines: ${testCase}`, function () {
                    const validationErrors = validateLine(testCase)
                    expect(validationErrors).toHaveLength(1)
                });
            }

            cases.forEach(testCase => testInvalidLIne(testCase))
        });
    });

    describe('solving problem 1', function () {
        describe('for small data set', function () {
            const testData = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

            it('should score invalid chars for small dataset', function () {
                const expectedResult = 26397
                const actualScore = scoreSyntaxErrors(testData)
                expect(actualScore).toEqual(expectedResult)
            });

            it('should score for large dataset', function () {
                const expectedResult = 168417
                const actualScore = scoreSyntaxErrors(data)
                expect(actualScore).toEqual(expectedResult)
            });
        });
    });
});
