import {handleCommand, solveProblem1, solveProblem2} from "../day2";
import {data} from "../data";

describe('Day 2', function () {

    describe('parsing input', function () {

        it('should handle forward command', function () {

            const input = 'forward 3'
            const startPosition = {
                distance: 3,
                depth: 5,
                aim: 0
            }

            const endPosition = handleCommand(startPosition, input);

            expect(endPosition).toEqual({
                distance: 6,
                depth: 5,
                aim: 0,
            })
        });

    });

    it('should handle down command', function () {

        const input = 'down 3'
        const startPosition = {
            distance: 3,
            depth: 5,
            aim: 0
        }

        const endPosition = handleCommand(startPosition, input);

        expect(endPosition).toEqual({
            distance: 3,
            depth: 8,
            aim: 0,
        })
    });

    it('should handle up command', function () {

        const input = 'up 3'
        const startPosition = {
            distance: 3,
            depth: 5,
            aim: 0
        }

        const endPosition = handleCommand(startPosition, input);

        expect(endPosition).toEqual({
            distance: 3,
            depth: 2,
            aim: 0
        })
    });

    describe('solve problem 1', function () {
        it('should calculate final position and multiply depth and distance', function () {
            const result = solveProblem1(data);

            expect(result).toEqual(2039256);
        });

    });

    describe('solve problem 2', function () {
        it('should calculate final position and multiply depth and distance', function () {
            const result = solveProblem2(data);

            expect(result).toEqual(2039256);
        });
    });
});

