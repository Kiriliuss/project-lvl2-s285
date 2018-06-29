import fs from 'fs';
import path from 'path';
import buildAst from './builderAst';
import getRender from './renderers';
import getParser from './parser';

const parse = (pathToFile) => {
  const file = fs.readFileSync(pathToFile, 'utf-8');
  const ext = path.extname(pathToFile).toLowerCase();
  return getParser(ext)(file);
};
export default (pathToFile1, pathToFile2, type) => {
  const file1Parsed = parse(pathToFile1);
  const file2Parsed = parse(pathToFile2);
  const ast = buildAst(file1Parsed, file2Parsed);
  return getRender(type)(ast);
};
