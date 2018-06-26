import { safeLoad } from 'js-yaml';
import ini from 'ini';

const exts = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
  '.ini': ini.parse,
};
export default (file, ext) => exts[ext](file);
