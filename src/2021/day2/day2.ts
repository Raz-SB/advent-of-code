import {splitLines} from "../../utils/dataReader";

type Command = 'forward' | 'up' | 'down'

type Position = {
    distance: number;
    depth: number;
    aim: number;
}

type CommandHandlers = {
    [command in Command]: (startPosition: Position, amount) => Position
}

const moveForward = (useAim: boolean) => (currentPosition: Position, amount: number): Position => ({
    ...(currentPosition),
    distance: currentPosition.distance + amount,
    depth: useAim ? currentPosition.depth + (currentPosition.aim * amount) : currentPosition.depth
})

const goDown = (useAim: boolean) => (currentPosition: Position, amount: number): Position => ({
    ...(currentPosition),
    aim: useAim ? currentPosition.aim + amount : currentPosition.aim,
    depth: useAim ? currentPosition.depth : currentPosition.depth + amount
})

const goUp = (useAim: boolean) => (currentPosition: Position, amount: number): Position => ({
    ...(currentPosition),
    aim: useAim ? currentPosition.aim - amount : currentPosition.aim,
    depth: useAim ? currentPosition.depth : currentPosition.depth - amount
})

const commandHandlers = (useAim?: boolean): CommandHandlers => ({
    'forward': moveForward(useAim),
    'down': goDown(useAim),
    'up': goUp(useAim)
})

export const solveProblem1 = (data: string): number => solveProblem(data, commandHandlers())

export const solveProblem2 = (data: string): number => solveProblem(data, commandHandlers(true))

const solveProblem = (data: string, commandHandlers: CommandHandlers) => {
    const instructions = splitLines(data);
    const finalPosition = instructions
        .map(instruction => {
            const [command, amountAsString] = instruction.split(' ')
            return {commandHandler: commandHandlers[command], amount: Number.parseInt(amountAsString)}
        }).reduce((prev, curr) => curr.commandHandler(prev, curr.amount), {distance: 0, depth: 0, aim: 0} as Position);
    return finalPosition.depth * finalPosition.distance
}
