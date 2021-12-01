import {countIncreases, parseInput} from "../day1";
import {data} from "../data";

describe('day1', function () {

    describe('parseInput', function () {
        it('should convert input to array of numbers', function () {
            expect(parseInput(data)).toHaveLength(2000);
        });
    });

    describe('countIncreases', function () {
        it('should return count of elements that are more than the previous', function () {
            const measurements = [1, 2, 3, 4, 4, 3, 6];

            expect(countIncreases(measurements)).toEqual(4);
        });
    });


    describe('problem 1', function () {

        it('should count number of increases in dataset', function () {
           const result = countIncreases(parseInput(data));
           expect(result).toEqual(1791);
        });

    });
});
