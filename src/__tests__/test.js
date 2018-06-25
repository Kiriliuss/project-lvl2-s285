import fs from 'fs';
import path from 'path';
import genDiff from '../genDiff';

const buildFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);

describe('Test Difference Calculator!', () => {
  it('Two JSON', () => {
    const expectedDiffPath = buildFixturePath('expected');
    const fileExpected = fs.readFileSync(expectedDiffPath, 'utf-8').trim();
    const fixtures = ['before.json', 'after.json'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePath);;
    expect(genDiff(file1Path, file2Path)).toEqual(fileExpected);
  });
});
