import plain from './renderPlain';
import tree from './renderTree';
import json from './renderJSON';

const renders = { tree, plain, json };
export default format => renders[format];
