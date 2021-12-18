import {toGrid, toPoints} from "../day13";
import {Point} from "../../../utils/grid";

describe('Day 13', function () {
    const testData = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0`
    it('should parse input', function () {
        const result = toPoints(testData)
        expect(result).toHaveLength(18)
        expect(result).toContainEqual(new Point(6,12))
        expect(result).toContainEqual(new Point(3,4))
        expect(result).toContainEqual(new Point(8,4))
    });

    describe('toGrid', function () {
        it('should create grid from coordinates', function () {
            const result = toGrid(toPoints(testData))
            result.print(' ')
            expect(result.rows).toHaveLength(15)
            expect(result.columns).toHaveLength(11)
        });

    });

});