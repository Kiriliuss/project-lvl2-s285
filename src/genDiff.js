import _ from 'lodash';
import fs from 'fs';

export default (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf-8');
  const file2 = fs.readFileSync(pathToFile2, 'utf-8');
  const file1Parse = JSON.parse(file1);
  const file2Parse = JSON.parse(file2);
  const merge = { ...file1Parse, ...file2Parse };
  const result = Object.keys(merge).reduce((acc, key) => {
    if (_.has(file1Parse, key) && _.has(file2Parse, key) && (file1Parse[key] !== file2Parse[key])) {
      acc.push(`- ${key}: ${file1Parse[key]}`);
      acc.push(`+ ${key}: ${file2Parse[key]}`);
      return acc;
    }
    if (_.has(file1Parse, key) && !_.has(file2Parse, key)) {
      return acc.concat(`- ${key}: ${file1Parse[key]}`);
    }
    if (!_.has(file1Parse, key) && _.has(file2Parse, key)) {
      return acc.concat(`+ ${key}: ${file2Parse[key]}`);
    }
    return acc.concat(`  ${key}: ${file1Parse[key]}`);
  }, []);
  return `{\n  ${result.join('\n  ')}\n}`;
};
