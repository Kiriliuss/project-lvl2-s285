import renderPlain from './renderPlain';
import renderTree from './renderTree';

const factoryRender = {
  tree: renderTree,
  plain: renderPlain,
};
export default (ast, type = 'tree') => factoryRender[type](ast);
