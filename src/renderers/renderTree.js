import _ from 'lodash';

const tab = point => '  '.repeat(point);

const render = (ast, level = 0) => {
  const stringify = (value) => {
    if (!_.isObject(value)) {
      return `${value}`;
    }
    return `{\n${Object.keys(value).map(el => `${tab(level + 1)}      ${el}: ${value[el]}`).join('\n')}\n${tab(level + 1)}  }`;
  };
  const treeConstructor = {
    equal: node => `${tab(level + 1)}  ${node.key}: ${stringify(node.value)}`,
    deleted: node => `${tab(level + 1)}- ${node.key}: ${stringify(node.value)}`,
    added: node => `${tab(level + 1)}+ ${node.key}: ${stringify(node.value)}`,
    changed: node => [`${tab(level + 1)}- ${node.key}: ${stringify(node.oldValue)}`, `${tab(level + 1)}+ ${node.key}: ${stringify(node.newValue)}`],
    children: (node, astFunc) => {
      const newlevel = level + 2;
      const result = `${tab(newlevel)}${node.key}: {\n${astFunc(node.value, newlevel)}\n${tab(newlevel)}}`;
      return result;
    },
  };
  const tree = ast.reduce((acc, node) => {
    const diffNode = treeConstructor[node.type];
    return [...acc, diffNode(node, render)];
  }, []);
  return _.flatten(tree).join('\n');
};
export default ast => `{\n${render(ast)}\n}`;
