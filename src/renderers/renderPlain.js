import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  return 'complex value';
};
const render = (ast, keyParent) => {
  const treeConstructor = {
    deleted: node => `Property '${node.key}' was removed`,
    added: node => `Property '${node.key}' was added with value: '${stringify(node.value)}'`,
    changed: node => `Property '${node.key}' was updated. From '${stringify(node.oldValue)}' to '${stringify(node.newValue)}'`,
    children: (node, astFunc) => {
      const newKeyParent = node.key;
      const result = astFunc(node.value, newKeyParent);
      return result;
    },
  };
  const astFiltredEqual = ast.filter(node => node.type !== 'equal');
  const tree = astFiltredEqual.reduce((acc, node) => {
    const diffNode = treeConstructor[node.type];
    if (!keyParent) {
      return [...acc, diffNode(node, render)];
    }
    const newKey = `${keyParent}.${node.key}`;
    const newNode = { ...node, key: newKey };
    return [...acc, diffNode(newNode, render)];
  }, []);
  return tree.join('\n');
};
export default render;
