import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseOfExtType from './parser';

const parse = (pathToFile) => {
  const file = fs.readFileSync(pathToFile, 'utf-8');
  const ext = path.extname(pathToFile).toLowerCase();
  return parseOfExtType(file, ext);
};
export default (pathToFile1, pathToFile2) => {
  const file1Parsed = parse(pathToFile1);
  const file2Parsed = parse(pathToFile2);
  const unionKeys = _.union(_.keys(file1Parsed), _.keys(file2Parsed));
  const result = unionKeys.map((key) => {
    if (file1Parsed[key] === file2Parsed[key]) {
      return `  ${key}: ${file1Parsed[key]}`;
    }
    if (_.has(file1Parsed, key) && !_.has(file2Parsed, key)) {
      return `- ${key}: ${file1Parsed[key]}`;
    }
    if (!_.has(file1Parsed, key) && _.has(file2Parsed, key)) {
      return `+ ${key}: ${file2Parsed[key]}`;
    }
    return `- ${key}: ${file1Parsed[key]}\n  + ${key}: ${file2Parsed[key]}`;
  });
  return `{\n  ${result.join('\n  ')}\n}`;
};
