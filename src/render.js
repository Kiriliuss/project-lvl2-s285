const tab = iter => '  '.repeat(iter);
let it = 0;

const stringify = value => ((value instanceof Object)
  ? `{\n${Object.keys(value).map(el => `${tab(it + 1)}      ${el}: ${value[el]}`).join('\n')}\n${tab(it + 1)}  }`
  : `${value}`);

const treeConstructor = {
  equal: (key, astValue) => `${tab(it + 1)}  ${key}: ${stringify(astValue)}`,
  deleted: (key, astValue) => `${tab(it + 1)}- ${key}: ${stringify(astValue)}`,
  added: (key, astValue) => `${tab(it + 1)}+ ${key}: ${stringify(astValue)}`,
  changed: (key, astValue) => `${tab(it + 1)}- ${key}: ${stringify(astValue.oldValue)}\n${tab(it + 1)}+ ${key}: ${stringify(astValue.newValue)}`,
  children: (key, astValue, astFunc) => {
    it += 2;
    const result = `${tab(it)}${key}: {\n${astFunc(astValue)}\n${tab(it)}}`;
    it -= 2;
    return result;
  },
};

const render = ast => ast.reduce((acc, node) => {
  const diffNode = treeConstructor[node.type];
  return acc.concat(diffNode(node.key, node.astValue, render));
}, []).join('\n');

export default ast => `{\n${render(ast)}\n}`;
