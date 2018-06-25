import _ from 'lodash';
import parser from './parser';

export default (pathToFile1, pathToFile2) => {
  const file1Parse = parser(pathToFile1);
  const file2Parse = parser(pathToFile2);
  const mergeFiles = { ...file1Parse, ...file2Parse };
  const result = Object.keys(mergeFiles).map((key) => {
    if (_.has(file1Parse, key) && _.has(file2Parse, key) && (file1Parse[key] !== file2Parse[key])) {
      return `- ${key}: ${file1Parse[key]}\n  + ${key}: ${file2Parse[key]}`;
    }
    if (_.has(file1Parse, key) && !_.has(file2Parse, key)) {
      return `- ${key}: ${file1Parse[key]}`;
    }
    if (!_.has(file1Parse, key) && _.has(file2Parse, key)) {
      return `+ ${key}: ${file2Parse[key]}`;
    }
    return `  ${key}: ${file1Parse[key]}`;
  });
  return `{\n  ${result.join('\n  ')}\n}`;
};
