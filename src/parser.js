import { safeLoad } from 'js-yaml';
import ini from 'ini';

const parseMethods = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
  '.ini': ini.parse,
};
export default method => parseMethods[method];
