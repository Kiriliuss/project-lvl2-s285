import _ from 'lodash';

const astTypes = [
  {
    check: (before, after, key) => (before[key] === after[key]),
    value: before => ({ type: 'equal', value: before }),
  },
  {
    check: (before, after, key) => (_.has(before, key) && !_.has(after, key)),
    value: before => ({ type: 'deleted', value: before }),
  },
  {
    check: (before, after, key) => (!_.has(before, key) && _.has(after, key)),
    value: (before, after) => ({ type: 'added', value: after }),
  },
  {
    check: (before, after, key) => ((_.has(before, key) && _.has(after, key))
      && (before[key]) !== after[key]) && !(_.isObject(before[key]) && _.isObject(after[key])),
    value: (before, after) => ({ type: 'changed', newValue: after, oldValue: before }),
  },
  {
    check: (before, after, key) => ((_.has(before, key) && _.has(after, key))
      && (_.isObject(before[key]) && _.isObject(after[key]))),
    value: (before, after, func) => ({ type: 'children', value: func(before, after) }),
  },
];
const astBuild = (before, after) => {
  const unionKeys = _.union(_.keys(before), _.keys(after));
  return unionKeys.map((key) => {
    const { value } = _.find(astTypes, type => type.check(before, after, key));
    const astNode = value(before[key], after[key], astBuild);
    return { ...astNode, key };
  });
};
export default astBuild;
