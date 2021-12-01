import {countIncreases, parseInput, threeples} from "../day1";
import {data} from "../data";
import {sum} from "../../../utils/listOps";

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

    describe('extract threeples', function () {

        it('should group input by 3s', function () {
            const measurements = [1, 2, 3, 4, 5, 6, 7];
            expect(threeples(measurements)).toEqual([
                [1, 2, 3],
                [2, 3, 4],
                [3, 4, 5],
                [4, 5, 6],
                [5, 6, 7]
            ])
        });
    });


    describe('problem 1', function () {
        it('should count number of increases in dataset', function () {
            const result = countIncreases(parseInput(data));
            expect(result).toEqual(1195);
        });
    });

    describe('problem 2', function () {
        it('should count number of increases across threeples', function () {
            const result = countIncreases(threeples(parseInput(data)).reduce((prev, curr) => [...prev, sum(curr)], []))
            expect(result).toEqual(1235);
        });

    });
});
