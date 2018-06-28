import plain from './renderPlain';
import tree from './renderTree';
import json from './renderJSON';

const methodsRender = { tree, plain, json };
export default (ast, method) => methodsRender[method](ast);
