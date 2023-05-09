const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = {
  // ... rest of webpack config
  plugins: [
    new FilterWarningsPlugin({
      exclude: /any-warnings-matching-this-will-be-hidden/,
    }),
  ],
};
