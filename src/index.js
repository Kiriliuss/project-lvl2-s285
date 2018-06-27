import fs from 'fs';
import path from 'path';
import parseOfExtType from './parser';
import astBuild from './astBuilder';
import render from './render';

const parse = (pathToFile) => {
  const file = fs.readFileSync(pathToFile, 'utf-8');
  const ext = path.extname(pathToFile).toLowerCase();
  return parseOfExtType(file, ext);
};
export default (pathToFile1, pathToFile2) => {
  const file1Parsed = parse(pathToFile1);
  const file2Parsed = parse(pathToFile2);
  const ast = astBuild(file1Parsed, file2Parsed);
  return render(ast);
};
