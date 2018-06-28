import plain from './renderPlain';
import tree from './renderTree';
import json from './renderJSON';

const factoryRender = { tree, plain, json };
export default (ast, type) => factoryRender[type](ast);
