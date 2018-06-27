import fs from 'fs';
import path from 'path';
import { safeLoad } from 'js-yaml';
import ini from 'ini';
import astBuild from './astBuilder';
import render from './renderers';

const exts = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
  '.ini': ini.parse,
};
const parse = (pathToFile) => {
  const file = fs.readFileSync(pathToFile, 'utf-8');
  const ext = path.extname(pathToFile).toLowerCase();
  return exts[ext](file);
};
export default (pathToFile1, pathToFile2, type) => {
  const file1Parsed = parse(pathToFile1);
  const file2Parsed = parse(pathToFile2);
  const ast = astBuild(file1Parsed, file2Parsed);
  return render(ast, type);
};
