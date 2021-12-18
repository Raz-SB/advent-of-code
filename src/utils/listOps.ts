export const sum = (nums: Array<number>) => {
    return nums.reduce((prev, curr) => prev + curr, 0);
}

export const fillArray  = (length: number) => Array(length).fill(null).map((_,index) => index)

export const fillRange = (min: number, max: number) => Array(++max - min)
    .fill(null)
    .map((_, i) => min+i)
