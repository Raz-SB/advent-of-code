export function hex2bin(hex: string): string {
    return (parseInt(hex, 16).toString(2));
}

export function binaryToNumber(string: string): number {
    return parseInt(string, 2);
}