import {splitLines} from "../../utils/dataReader";
import {Grid, Point} from "../../utils/grid";
import {fillArray} from "../../utils/listOps";

type GridContents = '#' | '.'
export const toPoints = (input: string) => {
    let coords = splitLines(input).map(str => {
        const [y, x] = str.split(',').map(each => Number.parseInt(each))
        return new Point(x, y)
    });
    return coords
}

const dimensions = (points: Point[]): Point => new Point(Math.max(...points.map(pt => pt.row)) + 1,
    Math.max(...points.map(pt => pt.column)) + 1)

export const toGrid =  (points: Point[]): Grid<GridContents> => {
    const dims = dimensions(points)
    let gridRows = fillArray(dims.row).map(() => fillArray(dims.column).map(() => '.' as '.'));
    let grid = new Grid<GridContents>(gridRows);
    points.forEach(pt => grid.setCell(pt, '#'))
    return grid
}