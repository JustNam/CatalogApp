import devConfig from './dev';
import localConfig from './local';
import prodConfig from './prod';

let config = null;
switch (process.env.REACT_APP_ENV) {
  case 'dev':
    config = devConfig;
    break;
  case 'prod':
    config = prodConfig;
    break;
  default:
    config = localConfig;
}
export default Object.freeze(Object.assign({}, config));