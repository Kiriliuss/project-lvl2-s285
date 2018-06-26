import { safeLoad } from 'js-yaml';

const exts = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
};
export default (file, ext) => exts[ext](file);
