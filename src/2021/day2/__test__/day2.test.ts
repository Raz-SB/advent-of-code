import {solveProblem1, solveProblem2} from "../day2";
import {data} from "../data";

describe('Day 2', function () {
    describe('solve problem 1', function () {
        it('should calculate final position and multiply depth and distance', function () {
            const result = solveProblem1(data);

            expect(result).toEqual(2039256);
        });

    });

    describe('solve problem 2', function () {
        it('should calculate final position and multiply depth and distance', function () {
            const result = solveProblem2(data);

            expect(result).toEqual(1856459736);
        });
    });
});

