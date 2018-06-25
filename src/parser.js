import fs from 'fs';
import path from 'path';
import { safeLoad } from 'js-yaml';

const extParse = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
};
export default (pathToFile) => {
  const ext = path.extname(pathToFile).toLowerCase();
  const file = fs.readFileSync(pathToFile, 'utf-8');
  return extParse[ext](file);
};
