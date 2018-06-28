import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  return `{${Object.keys(value).map(el => `${el}: ${value[el]}`)}}`;
};
const treeConstructor = {
  equal: node => ({ [`${node.key}: ${stringify(node.value)}`]: 'unchanged' }),
  deleted: node => ({ [`${node.key}: ${stringify(node.value)}`]: 'deleted' }),
  added: node => ({ [`${node.key}: ${stringify(node.value)}`]: 'added' }),
  changed: node => ({ [`${node.key}: ${stringify(node.oldValue)}`]: 'old value', [`${node.key}: ${stringify(node.newValue)}`]: 'new value' }),
  children: (node, astFunc) => ({ [node.key]: astFunc(node.value) }),
};
const render = ast => ast.reduce((acc, node) => {
  const diffNode = treeConstructor[node.type];
  return { ...acc, ...diffNode(node, render) };
}, {});

export default ast => JSON.stringify(render(ast), null, 4);
