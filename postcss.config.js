const postcss = require('postcss');
const postcssCached = require('postcss-cached');
const autoprefixer = require('autoprefixer');

module.exports = postcss([
  postcssCached(),
  autoprefixer()
]);