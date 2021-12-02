import {splitLines} from "../../utils/dataReader";

type Position = {
    distance: number;
    depth: number;
    aim: number;
}

const moveForward = (currentPosition: Position, amount: number): Position => ({
    ...currentPosition,
    distance: currentPosition.distance + amount
})

const goDown = (currentPosition: Position, amount: number): Position => ({
    ...currentPosition,
    depth: currentPosition.depth + amount
})

const moveForwardUsingAim = (currentPosition: Position, amount: number): Position => ({
    ...currentPosition,
    distance: currentPosition.distance + amount,
    depth: currentPosition.depth + (currentPosition.aim * amount)
})

const goUp = (currentPosition: Position, amount: number): Position => ({
    ...currentPosition,
    depth: currentPosition.depth - amount
})

const aimUp = (currentPosition: Position, amount: number): Position => ({
    ...currentPosition,
    aim: currentPosition.aim - amount
})

const aimDown = (currentPosition: Position, amount: number): Position => ({
    ...currentPosition,
    aim: currentPosition.aim + amount
})

const commandsByDirection = {
    'forward': moveForward,
    'down': goDown,
    'up': goUp
}

const commandsUsingAim = {
    'forward': moveForwardUsingAim,
    'down': aimDown,
    'up': aimUp
}


export const handleCommand = (currentPosition: Position, command: string): Position => {
    const [direction, amount] = command.split(' ')
    return commandsByDirection[direction](currentPosition, Number.parseInt(amount));
}

export const handleCommandUsingAim = (currentPosition: Position, command: string): Position => {
    const [direction, amount] = command.split(' ')
    return commandsUsingAim[direction](currentPosition, Number.parseInt(amount));
}

export const solveProblem1 = (data: string): number => {
    const instructions = splitLines(data);
    const finalPosition =  instructions
        .reduce((prev, curr) => handleCommand(prev, curr), {distance: 0, depth: 0} as Position);
    return finalPosition.depth * finalPosition.distance
}

export const solveProblem2 = (data: string): number => {
    const instructions = splitLines(data);
    const finalPosition =  instructions.reduce((prev, curr) => handleCommandUsingAim(prev, curr), {distance: 0, depth: 0, aim: 0} as Position);
    return finalPosition.depth * finalPosition.distance
}
