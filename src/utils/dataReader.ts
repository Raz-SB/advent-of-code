import fs from 'fs';

const splitLines = (content: string): Array<string> => content.split('\n').filter(x => x);

export const readFile = (fileName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(data)
        })
    });
}

export const readLines = (fileName: string): Promise<string[]> => {
    return readFile(fileName).then(splitLines)
}
