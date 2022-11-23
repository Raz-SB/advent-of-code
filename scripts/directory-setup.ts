import fs from "fs";
import tree from 'tree-node-cli';

export const setupNewDay = (basePath: string, year: string, day: string) => {
    const path = `${basePath}/${year}/${day}`;
    const testsPath = `${basePath}/${year}/${day}/__test__`;
    if (!fs.existsSync(testsPath)){
        fs.mkdirSync(testsPath, { recursive: true });
    }

    fs.writeFileSync(`${path}/problemSolver.ts`, '');
    fs.writeFileSync(`${path}/data.ts`, '');
    fs.writeFileSync(`${testsPath}/problemSolver.test.ts`, '');
    const fileTree = tree(path, { trailingSlash: true });
    console.log(fileTree);
}