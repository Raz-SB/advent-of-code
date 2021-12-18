import {fillArray} from "./listOps";

export class Point {
    constructor(private _row: number, private _column: number) {
    }

    public get row() {
        return this._row
    }

    public get column() {
        return this._column
    }
}

type PointAndValue<T> = {
    point: Point
    value: T
}

export class Grid<T> {
    private _rows: Array<Array<T>>
    private _dimensions: { rows: number, columns: number }

    constructor(rows: Array<Array<T>>) {
        const rowLengths = rows.map(everyRow => everyRow.length)
        if (Math.min(...rowLengths) !== Math.max(...rowLengths)) {
            throw new Error('Invalid grid size: each row must have same size')
        }
        this._rows = rows
        this._dimensions = {rows: rows.length, columns: rowLengths[0]}
    }

    public get dimensions() {
        return this._dimensions
    }

    public get rows() {
        return this._rows
    }

    public get columns() {
        return fillArray(this.dimensions.columns)
            .map(eachColumnIndex => {
            this.rows.map(eachRow => eachRow[eachColumnIndex])
        })
    }

    getAdjacentPoints(point: Point): PointAndValue<T>[] {
        return [
           this.getPointAbove(point),
           this.getPointAboveRight(point),
           this.getPointRight(point),
           this.getPointBelowRight(point),
           this.getPointBelow(point),
           this.getPointBelowLeft(point),
           this.getPointLeft(point),
           this.getPointAboveLeft(point)
        ].filter(x => x.value !== undefined)
    }

    private getPointAbove(point: Point) {
        let row = point.row - 1;
        let column = point.column;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    private getPointAboveRight(point: Point) {
        let row = point.row -1;
        let column = point.column + 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    private getPointRight(point: Point) {
        let row = point.row;
        let column = point.column + 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    private getPointBelowRight(point: Point) {
        let row = point.row +1; let column = point.column + 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    private getPointBelow(point: Point) {
        let row = point.row + 1;
        let column = point.column;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    private getPointBelowLeft(point: Point) {
        let row = point.row + 1;
        let column = point.column -1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    private getPointLeft(point: Point) {
        let row = point.row;
        let column = point.column - 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    private getPointAboveLeft(point: Point) {
        let row = point.row - 1;
        let column = point.column - 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    print() {
        const text = this.rows.join('\n')
        console.log(text)
    }

    public get allCells(): Array<T> {
        return this.rows.reduce((prev, curr) => [...prev, ...curr ], [])
    }
}
