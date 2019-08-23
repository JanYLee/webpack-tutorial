import source from './source';

console.log(source);
if(module.hot) {
  module.hot.accept('./source', () => {
    const src = require('./source.js');
    console.log(src);
  })
}