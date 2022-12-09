import fs from "fs";
import tree from 'tree-node-cli';
import {fetchInput} from "./fetch-input";

export const setupNewDay = async (basePath: string, year: string, day: string) => {
    const path = `${basePath}/${year}/day${day}`;
    const testsPath = `${basePath}/${year}/day${day}/__test__`;
    if (!fs.existsSync(testsPath)) {
        fs.mkdirSync(testsPath, {recursive: true});
    }

    fs.writeFileSync(`${path}/problemSolver.ts`, '');

    const sessionToken = '' // get your session token from the browser
    fetchInput(year, parseInt(day).toString(), sessionToken)
        .then(input => {
            fs.writeFileSync(`${path}/data.ts`, `export const data = \`${input}\``)
        })
    fs.writeFileSync(`${testsPath}/problemSolver.test.ts`, '');
    const fileTree = tree(path, {trailingSlash: true});
    console.log(fileTree);
}