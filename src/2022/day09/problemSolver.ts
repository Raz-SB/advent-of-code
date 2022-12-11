import {Grid, Point} from "../../utils/grid";

type Direction = 'U' | 'D' | 'L' | 'R';
type Movement = {
    direction: Direction
    distance: number
}

export const parseInput = (input: string): Movement[] => {
    return input.split('\n')
        .map(line => {
            const [direction, distance] = line.split(' ')
            return {
                direction: direction as Direction,
                distance: parseInt(distance)
            }
        })

}

export const areTouching = (point1: Point, point2: Point): boolean => {
    const touchingOnSameRow = point1.row === point2.row && Math.abs(point1.column - point2.column) <= 1
    const touchingOnSameColumn = point1.column === point2.column && Math.abs(point1.row - point2.row) <= 1
    const touchingDiagonally = Math.abs(point1.row - point2.row) <= 1 && Math.abs(point1.column - point2.column) <= 1
    return touchingOnSameColumn || touchingOnSameRow || touchingDiagonally

}

export const problem1 = (input: string): number => {
    const instructions = parseInput(input)
   const state = machine()
    instructions.forEach(instruction => {
        state.move(instruction)
    })

    return Object.keys(state.tail.pointsVisited).length
}


export const machine = () => {
    const head = {
        position: new Point(0, 0)
    }

    const tail: {
        position: Point,
        pointsVisited: Record<string, number>,
        closeDistance: (target: Point) => void
    } = {
        position: new Point(0, 0),
        pointsVisited: {[new Point(0, 0).toString()]: 1},
        closeDistance(target: Point): Point {
            const from = this.position;
            const newPosition = () => {
                const isOnSameRow = from.row === target.row
                if (isOnSameRow) {
                    const isTargetOnLeft = target.column < from.column
                    if (isTargetOnLeft) {
                        return new Point(from.row, target.column + 1)
                    }
                    return new Point(from.row, target.column - 1)
                }
                const isInSameColumn = from.column === target.column
                if (isInSameColumn) {
                    const isTargetIsAbove = target.row > from.row
                    if (isTargetIsAbove) {
                        return new Point(target.row - 1, from.column)
                    }
                    return new Point(target.row + 1, from.column)
                }
                const isUpAndLeft = target.row > from.row && target.column < from.column
                if (isUpAndLeft) {
                    // move one step diagonally to get closer
                    return new Point(from.row + 1, from.column -1)
                }
                const isUpAndRight = target.row > from.row && target.column > from.column
                if (isUpAndRight) {
                    return new Point(from.row + 1, from.column + 1)
                }
                const isDownAndLeft = target.row < from.row && target.column < from.column
                if (isDownAndLeft) {
                    return new Point(from.row - 1, from.column - 1)
                }
                // else is down and right
                const isDownAndRight = target.row < from.row && target.column > from.column
                if(isDownAndRight) {
                    return new Point(from.row - 1, from.column + 1)
                }

                throw new Error('Unable to figure out next move')
            }

            this.position = newPosition()
            this.pointsVisited[this.position.toString()] = (this.pointsVisited[this.position.toString()] || 0) + 1
        }
    }

    const movements: {
        [key in Direction]: (point: Point) => Point
    } = {
        U(point: Point): Point {
            return new Point(point.row + 1, point.column)
        },
        D(point: Point): Point {
            return new Point(point.row - 1, point.column)
        }, L(point: Point): Point {
            return new Point(point.row, point.column - 1)
        }, R(point: Point): Point {
            return new Point(point.row, point.column + 1)
        }
    }

    const move = (movement: Movement) => {
        for (let i = 0; i < movement.distance; i++) {
            head.position = movements[movement.direction](head.position)
            const pointsAreNoLongerTouching = !areTouching(head.position, tail.position)
            if (pointsAreNoLongerTouching) {
                tail.closeDistance(head.position)
            }
            // console.log({movement, step: i})
            // printState(6)
            // printTailMovements(6)
        }
    }

    const printState = (gridSize: number) => {
        const rows = Array(gridSize).fill('.').map((_, index) => Array(gridSize).fill('.'))
        const grid = new Grid(rows)

        grid.setCell(head.position, 'H')
        grid.setCell(tail.position, 'T')
        grid.setCell(new Point(0, 0), 's')

        const reversedGrid = new Grid(grid.rows.reverse())

        reversedGrid.print(' ')
    }

    const printTailMovements = (gridSize: number) =>{
        const rows = Array(gridSize).fill('.').map((_, index) => Array(gridSize).fill('.'))
        const grid = new Grid(rows)

        Object.keys(tail.pointsVisited).forEach(point => {
            grid.setCell(Point.fromString(point), '#')
        })
        grid.setCell(new Point(0, 0), 's')

        const reversedGrid = new Grid(grid.rows.reverse())

        reversedGrid.print(' ')
    }

    return {
        move,
        head,
        tail,
        printTailMovements
    }
}