import ENV from './env';
import RadioKitApi from 'radiokit-api';

const RadioKit
  = window.data // legacy
  = new RadioKitApi.Data.Interface(ENV);

export default RadioKit;
