import {Grid, Point} from "../../utils/grid";

type DijkstraNode = {
    point: Point
    distance: number
}

export class ChitonGrid extends Grid<number> {
    private currentPoint: Point;
    private unvisitedNodes: DijkstraNode[]
    private destination: Point;

    constructor(rows: Array<Array<number>>) {
        super(rows);
        this.currentPoint = new Point(0, 0);
        this.destination = new Point(this.dimensions.rows - 1, this.dimensions.columns - 1)

        this.unvisitedNodes = rows.reduce((acc, row, rowIndex) => {
            const allPointsInRow: DijkstraNode[] = row
                .reduce((rowAcc, col, colIndex) => ([...rowAcc, {
                    point: new Point(rowIndex, colIndex),
                    distance: rowIndex === 0 && colIndex === 0 ? 0 : Number.MAX_VALUE
                }]), [] as DijkstraNode[]);
            return [...acc, ...allPointsInRow]
        }, [] as DijkstraNode[])

        // .filter(node => !(node.point.equals(new Point(0, 0))))

        // this.unvisitedNodes = rows.map((eachRow, rowIndex) => {
        //     return eachRow.map((eachCol, colIndex) => ({ point: new Point(rowIndex, colIndex), distance: Number.MAX_VALUE }))
        // });
    }

    private getUnvisitedNeighbors(point: Point): DijkstraNode[] {
        const neighbors = [this.getPointRight(point), this.getPointBelow(point)
            // , this.getPointAbove(point), this.getPointLeft(point)
        ]
            .filter(neighbor => neighbor.value !== undefined);

        return this.unvisitedNodes.filter(unvisited => neighbors.some(neighbor => neighbor.point.equals(unvisited.point)))
    }

    private possiblePathsExist(): boolean {
        return Math.min(...this.unvisitedNodes.map(node => node.distance)) !== Number.MAX_VALUE
    }

    private destinationHasNotBeenVisited(): boolean {
        return this.unvisitedNodes.some(node => node.point.equals(this.destination))
    }

    private nodeWithShortestTentativeDistance(): DijkstraNode {
        return this.unvisitedNodes
            .reduce((acc, node) => {
                if (node.distance < acc.distance) {
                    return node
                }
                return acc
            }, {distance: Number.MAX_VALUE} as any)
    }

    getLeastRiskyPath() {
        while (this.destinationHasNotBeenVisited()) {
            const unvisitedNeighbors = this.getUnvisitedNeighbors(this.currentPoint);
            this.unvisitedNodes = this.unvisitedNodes
                .map(unvisited => {
                    const neighborNode = unvisitedNeighbors.find(neighbor => neighbor.point.equals(unvisited.point))
                    if (neighborNode) {
                        const tentativeDistance = this.rows[this.currentPoint.row][this.currentPoint.column] + neighborNode.distance;
                        return {
                            ...unvisited,
                            distance: Math.min(unvisited.distance, tentativeDistance)
                        }
                    }
                    return unvisited
                })
                .filter(unvisited => unvisited.point.equals(this.currentPoint) === false)

            this.currentPoint = this.nodeWithShortestTentativeDistance().point
        }
        return this.unvisitedNodes.filter(node => node.distance < Number.MAX_VALUE)
            .reduce((acc, node) => {
                return acc + node.distance
            }, 0)
    }
}


function vertexWithShortestDistance(vertices: Point[], distances: Record<string, number>) {
    return vertices
        .reduce((acc, vertex) => {
            if (distances[vertex.toString()] < distances[acc.toString()]) {
                return vertex
            }
            return acc
        }, vertices[0])
}

//Dijkstra shortest path algorithm using Prim’s Algorithm in O(V2):
export const getShortestPath = (points: ChitonGrid, start: Point, destination: Point) => {
    const sptSet = []
    const allPoints = points.allPoints()

    let distances: Record<string, number> = allPoints.reduce((acc, point) => {
        const pointString = point.toString()
        return {
            ...acc,
            [pointString]: point.equals(start) ? 0 : Number.MAX_VALUE
        }
    }, {});

    while (!allPoints.every(point => sptSet.includes(point))) {
        const unvisitedVertices = allPoints.filter(point => !sptSet.includes(point))
        const currentVertex = vertexWithShortestDistance(unvisitedVertices, distances)
        sptSet.push(currentVertex)
        if(currentVertex.equals(destination)) {
            return distances[currentVertex.toString()]
        }
        const neighbors = points.getAdjacentPoints(currentVertex, false);
        neighbors.forEach(neighbor => {
            const neighborString = neighbor.point.toString()
            const currentVertexString = currentVertex.toString()
            const distanceToNeighbor = distances[currentVertexString] + points.rows[neighbor.point.row][neighbor.point.column]
            if (distanceToNeighbor < distances[neighborString]) {
                distances[neighborString] = distanceToNeighbor
            }
        })
    }
    console.log(distances)
    return distances[destination.toString()]
}

function stringToIntArray(eachRow: string) {
    return eachRow.split('').map(stringToInt);
}

export const parseData = (data: string): ChitonGrid => {
    const matrix = data.split('\n')
        .filter(eachLine => eachLine.length > 0)
        .map(stringToIntArray);
    return new ChitonGrid(matrix)
}

function stringToInt(eachCharacter: string) {
    return parseInt(eachCharacter);
}

const getCellValueFor

