import {splitLines} from "../../utils/dataReader";
import {fillArray} from "../../utils/listOps";

export type Point = {
    x: number
    y: number
}

export const point = (x: number, y: number): Point => ({x, y})
export const line = (x1: number, y1: number, x2: number, y2: number): Line => ({
    a: {x: x1, y: y1},
    b: {x: x2, y: y2}
})

export type Line = {
    a: Point
    b: Point
}

export const isVertical = (line: Line): boolean => line.a.x === line.b.x

export const isHorizontal = (line: Line): boolean => line.a.y === line.b.y

export const isInBetween = (someValue: number, otherValues: number[]) =>
    [someValue, ...otherValues]
        .sort((a, b) => a - b)[1] === someValue

export const isPointOnLine = (point: Point, line: Line): boolean => {
    return (isHorizontal(line)
            && point.y === line.a.y
            && isInBetween(point.x, [line.a.x, line.b.x]))
        || (isVertical(line)
            && point.x === line.a.x
            && isInBetween(point.y, [line.a.y, line.b.y]))
}

export const parseInput = (data: string): Array<Line> => {
    const rawLines = splitLines(data)
    return rawLines.map(eachLine => {
        const [rawPointA, rawPointB] = eachLine.split(' -> ')
        const [x1, y1] = rawPointA.split(',').map(x => Number.parseInt(x))
        const [x2, y2] = rawPointB.split(',').map(x => Number.parseInt(x))
        return line(x1, y1, x2, y2)
    })
}

export const countOverlaps = (point: Point, lines: Array<Line>): number =>
    lines.reduce((prev, line) => isPointOnLine(point, line) ? prev + 1 : prev, 0)

export const solveTheDamnThing = (allHorizontalOrVerticalLines: Array<Line>) => {

    // const maxX = Math.max(...allHorizontalOrVerticalLines.reduce((prev, curr) => {
    //     return [...prev, curr.a.x, curr.b.x]
    // }, [])) + 1
    // const maxY = Math.max(...allHorizontalOrVerticalLines.reduce((prev, curr) => {
    //     return [...prev, curr.a.y, curr.b.y]
    // }, [])) + 1
    //
    const maxX = 1000
    const maxY = 1000
    //
    const doesPointHave2OrMoreOverlaps = (p: Point, lines: Array<Line>): boolean => {
        const pointsWithOverlaps = {}
        let linesRemaining = allHorizontalOrVerticalLines.length;
        let overlaps = 0;
        while (linesRemaining && overlaps < 2) {
            if (isPointOnLine(p, allHorizontalOrVerticalLines[--linesRemaining])) {
                overlaps++
                let pointKey = `${p.x}:${p.y}`;
                pointsWithOverlaps[pointKey] = (pointsWithOverlaps[pointKey] || 0) + 1
            }

            if (overlaps == 2) {
                return true
            }
        }
        return false;
    }

    let points = fillArray(maxX)
        .reduce((pointsArray, x) => [...pointsArray, ...fillArray(maxY).map(y => point(x, y))], [] as Array<Point>);
    let filter = points
        .filter(pt => countOverlaps(pt, allHorizontalOrVerticalLines) >= 2);

    // let pointMap = filter.reduce((prev, curr) => {
    //     let pointKey = `${curr.x}:${curr.y}`;
    //     prev[pointKey] =  (prev[pointKey] || 0) + 1
    //     return prev
    // }, {});
    // console.log(pointMap)
    return filter.length
};

export const solveProblem1 = (data: string): number => {
    const allHorizontalOrVerticalLines = parseInput(data)
    .filter(line => isVertical(line) || isHorizontal(line));
    return solveTheDamnThing(allHorizontalOrVerticalLines);

// return allPoints.reduce((overlappingPoints, pt) => {
//     const hasMoreThan2Overlaps = allHorizontalOrVerticalLines.reduce((overlapCount, line) => {
//         if (overlapCount < 2) {
//             if (isPointOnLine(pt, line)) {
//                 return overlapCount + 1
//             }
//         }
//         return overlapCount
//     }, 0)
//     if (hasMoreThan2Overlaps) {
//         return [...overlappingPoints, pt]
//     } else return overlappingPoints
// }, []).length

// return allPoints.map(pt => {
//     const overlaps = allHorizontalOrVerticalLines.filter(eachLine => isPointOnLine(pt, eachLine)).length
//     console.log("point %o overlaps %d times", pt, overlaps)
//     return {point: pt, overlaps}
// }).filter(pt => pt.overlaps >= 2).length
}
