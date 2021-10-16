import { figureOutWhichRowItIs, solveProblem } from '../problemSolver';

describe('day 5', () => {
    describe('figuring out row', () => {
        it('should figure it out', () => {
            const result = figureOutWhichRowItIs('FBFBBFFRLR')
            expect(result).toEqual(44);
        });
    });
});
