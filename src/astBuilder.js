import _ from 'lodash';

const astTypes = [
  {
    type: 'equal',
    check: (before, after, key) => (before[key] === after[key]),
    value: (before, after, key) => before[key],
  },
  {
    type: 'deleted',
    check: (before, after, key) => (_.has(before, key) && !_.has(after, key)),
    value: (before, after, key) => before[key],
  },
  {
    type: 'added',
    check: (before, after, key) => (!_.has(before, key) && _.has(after, key)),
    value: (before, after, key) => after[key],
  },
  {
    type: 'changed',
    check: (before, after, key) => ((_.has(before, key) && _.has(after, key))
      && (before[key]) !== after[key])
      && !(before[key] instanceof Object && after[key] instanceof Object),
    value: (before, after, key) => ({ newValue: after[key], oldValue: before[key] }),
  },
  {
    type: 'children',
    check: (before, after, key) => ((_.has(before, key) && _.has(after, key))
      && (before[key] instanceof Object && after[key] instanceof Object)),
    value: (before, after, key, func) => (func(before[key], after[key])),
  },
];
const astBild = (before, after) => {
  const unionKeys = _.union(_.keys(before), _.keys(after));
  return unionKeys.map((key) => {
    const [astNode] = astTypes.filter(el => el.check(before, after, key));
    const { type, value } = astNode;
    const astValue = value(before, after, key, astBild);
    return { key, type, astValue };
  });
};
export default astBild;
