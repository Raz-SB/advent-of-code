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

    equals(other: Point): boolean {
        return this.row === other.row && this.column === other.column
    }

    toString(): string {
        return `(${this.row},${this.column})`
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

    allPoints(): Point[] {
        let ts = this.rows.reduce((prev, row, rowIndex) => {
            const points = row.map((_, columnIndex) => new Point(rowIndex, columnIndex))
            return [...prev, ...points]
        }, []);
        return ts as Point[];
    }

    getPointValue(point: Point): T {
        return this.rows[point.row][point.column]
    }

    getAdjacentPoints(point: Point, includeDiagonallyAdjacentCells = true): PointAndValue<T>[] {
        let adjacentCells;

        let laterallyAdjacent = [
            this.getPointAbove(point),
            this.getPointRight(point),
            this.getPointBelow(point),
            this.getPointLeft(point),
        ];

        adjacentCells = [...laterallyAdjacent];

        if (includeDiagonallyAdjacentCells) {
            const diagonallyAdjacent = [this.getPointAboveLeft,
                this.getPointAboveRight, this.getPointBelowRight, this.getPointBelowLeft].map(fn => fn(point));
            adjacentCells = [...adjacentCells, diagonallyAdjacent ];
        }

        return adjacentCells.filter(x => x.value !== undefined)
    }

    getPointAbove(point: Point) {
        let row = point.row - 1;
        let column = point.column;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointAboveRight(point: Point) {
        let row = point.row -1;
        let column = point.column + 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointRight(point: Point) {
        let row = point.row;
        let column = point.column + 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointBelowRight(point: Point) {
        let row = point.row +1; let column = point.column + 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointBelow(point: Point) {
        let row = point.row + 1;
        let column = point.column;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointBelowLeft(point: Point) {
        let row = point.row + 1;
        let column = point.column -1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointLeft(point: Point) {
        let row = point.row;
        let column = point.column - 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointAboveLeft(point: Point) {
        let row = point.row - 1;
        let column = point.column - 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    setCell(point: Point, value: T) {
      this.rows[point.row][point.column] = value
    }

    print(separator = ',') {
        const text = this.rows.map(eachRow => eachRow.join(separator)).join('\n')
        console.log(text)
    }

    public get allCells(): Array<T> {
        return this.rows.reduce((prev, curr) => [...prev, ...curr ], [])
    }
}
