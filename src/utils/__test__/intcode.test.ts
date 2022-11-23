import {Program} from "../intcode";

describe('parse instruction', function () {
    function verify({input, expectation}: { input: number[], expectation: number[] }) {
        describe(`given ${input}`, function () {
            it(`should result in ${expectation}`, function () {
                const intCode = new Program(input)
                const result = intCode.process()

                expect(result).toEqual(expectation);
            });
        });
    }

    [
        {
            input: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
            expectation: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
        },
        {
            input: [1, 1, 1, 4, 99, 5, 6, 0, 99],
            expectation: [30, 1, 1, 4, 2, 5, 6, 0, 99]
        },
        {
            input: [2, 4, 4, 5, 99, 0]
        , expectation: [2, 4, 4, 5, 99, 9801] }
    ].map(verify)
})
