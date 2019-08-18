
require('./style');
import 'bootstrap';
const utils = require('@common/utils.js');

console.log(utils);

if(ENV === 'dev') {
  console.log('dev');
} else {
  console.log('production');
}