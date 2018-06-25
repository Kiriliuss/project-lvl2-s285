#!/usr/bin/env node
import program from 'commander';
import genDiff from '../genDiff';
import { version } from '../../package.json';

program
  .version(version, '-v, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.info(genDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
