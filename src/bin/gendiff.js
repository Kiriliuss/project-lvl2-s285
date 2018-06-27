#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

program
  .version(version, '-v, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.info(genDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
