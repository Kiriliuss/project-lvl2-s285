import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';

const buildFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);
const expectedDiffPath = buildFixturePath('expected');
const fileExpected = fs.readFileSync(expectedDiffPath, 'utf-8').trim();

describe('Test Difference Calculator!', () => {
  it('Two JSON', () => {
    const fixtures = ['before.json', 'after.json'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePath);
    expect(genDiff(file1Path, file2Path)).toEqual(fileExpected);
  });
  it('Two YAML', () => {
    const fixtures = ['before.yml', 'after.yml'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePath);
    expect(genDiff(file1Path, file2Path)).toEqual(fileExpected);
  });
  it('First JSON, second YAML', () => {
    const fixtures = ['before.json', 'after.yml'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePath);
    expect(genDiff(file1Path, file2Path)).toEqual(fileExpected);
  });
});
