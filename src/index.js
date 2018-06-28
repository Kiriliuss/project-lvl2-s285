import fs from 'fs';
import path from 'path';
import buildAst from './builderAst';
import render from './renderers';
import parser from './parser';

const parse = (pathToFile) => {
  const file = fs.readFileSync(pathToFile, 'utf-8');
  const ext = path.extname(pathToFile).toLowerCase();
  return parser(ext)(file);
};
export default (pathToFile1, pathToFile2, type) => {
  const file1Parsed = parse(pathToFile1);
  const file2Parsed = parse(pathToFile2);
  const ast = buildAst(file1Parsed, file2Parsed);
  return render(ast, type);
};
