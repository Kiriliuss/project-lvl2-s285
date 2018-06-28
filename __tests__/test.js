import fs from 'fs';
import path from 'path';
import genDiff from '../src';

describe('Test Difference Calculator for plain data!', () => {
  const buildFixturePath = fileName => path.join(__dirname, '__fixtures__/Plain', fileName);
  const expectedDiffPath = buildFixturePath('expected');
  const fileExpected = fs.readFileSync(expectedDiffPath, 'utf-8').trim();
  it('Two JSON', () => {
    const fixtures = ['before.json', 'after.json'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePath);
    expect(genDiff(file1Path, file2Path, 'tree')).toEqual(fileExpected);
  });
  it('Two YAML', () => {
    const fixtures = ['before.yml', 'after.yml'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePath);
    expect(genDiff(file1Path, file2Path, 'tree')).toEqual(fileExpected);
  });
  it('First JSON, second YAML', () => {
    const fixtures = ['before.json', 'after.yml'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePath);
    expect(genDiff(file1Path, file2Path, 'tree')).toEqual(fileExpected);
  });
  it('Two INI', () => {
    const fixtures = ['before.ini', 'after.ini'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePath);
    expect(genDiff(file1Path, file2Path, 'tree')).toEqual(fileExpected);
  });
});

describe('Test Difference Calculator for various data!', () => {
  const buildFixturePathTree = fileName => path.join(__dirname, '__fixtures__/Tree', fileName);
  const expectedDiffPath = buildFixturePathTree('expectedTree');
  const fileExpected = fs.readFileSync(expectedDiffPath, 'utf-8').trim();
  it('Two JSON tree', () => {
    const fixtures = ['beforeTree.json', 'afterTree.json'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePathTree);
    expect(genDiff(file1Path, file2Path, 'tree')).toEqual(fileExpected);
  });
  it('Two YAML tree', () => {
    const fixtures = ['beforeTree.yml', 'afterTree.yml'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePathTree);
    expect(genDiff(file1Path, file2Path, 'tree')).toEqual(fileExpected);
  });
  it('Two INI tree', () => {
    const fixtures = ['beforeTree.ini', 'afterTree.ini'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePathTree);
    expect(genDiff(file1Path, file2Path, 'tree')).toEqual(fileExpected);
  });
});

describe('Test Difference Calculator output format Plain!', () => {
  const buildFixturePathTree = fileName => path.join(__dirname, '__fixtures__/Tree', fileName);
  const expectedDiffPath = buildFixturePathTree('expectedPlain');
  const fileExpected = fs.readFileSync(expectedDiffPath, 'utf-8').trim();
  it('Two JSON tree in plain format', () => {
    const fixtures = ['beforeTree.json', 'afterTree.json'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePathTree);
    expect(genDiff(file1Path, file2Path, 'plain')).toEqual(fileExpected);
  });
  it('Two YAML tree in plain format', () => {
    const fixtures = ['beforeTree.yml', 'afterTree.yml'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePathTree);
    expect(genDiff(file1Path, file2Path, 'plain')).toEqual(fileExpected);
  });
  it('Two INI tree in plain format', () => {
    const fixtures = ['beforeTree.ini', 'afterTree.ini'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePathTree);
    expect(genDiff(file1Path, file2Path, 'plain')).toEqual(fileExpected);
  });
});

describe('Test Difference Calculator output format JSON!', () => {
  const buildFixturePathTree = fileName => path.join(__dirname, '__fixtures__/Tree', fileName);
  const expectedDiffPath = buildFixturePathTree('expectedJSON');
  const fileExpected = fs.readFileSync(expectedDiffPath, 'utf-8').trim();
  it('Two JSON tree in json format', () => {
    const fixtures = ['beforeTree.json', 'afterTree.json'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePathTree);
    expect(genDiff(file1Path, file2Path, 'json')).toEqual(fileExpected);
  });
  it('Two YAML tree in json format', () => {
    const fixtures = ['beforeTree.yml', 'afterTree.yml'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePathTree);
    expect(genDiff(file1Path, file2Path, 'json')).toEqual(fileExpected);
  });
  it('Two INI tree in json format', () => {
    const fixtures = ['beforeTree.ini', 'afterTree.ini'];
    const [file1Path, file2Path] = fixtures.map(buildFixturePathTree);
    expect(genDiff(file1Path, file2Path, 'json')).toEqual(fileExpected);
  });
});
