const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');


const path = require('path');

const isProd = process.env.NODE_ENV === "production";

module.exports ={
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
        const smp = new SpeedMeasurePlugin({outputFormat: "human", outputTarget: './measur.txt'});

        if (isProd) {
          // Use terser-webpack-plugin for minification
          webpackConfig.optimization.minimizer = [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ];
        } else {
          webpackConfig.optimization =  {
            minimize: false,
            minimizer: [],
            runtimeChunk: false,
            splitChunks: {
              chunks(chunk) {
                return false
              },
            },
          }
        }

        // Remove the ReactRefreshPlugin from the plugins array
        webpackConfig.plugins = webpackConfig.plugins.filter(
          (plugin) => plugin.constructor.name !== 'ReactRefreshPlugin'
        );
        webpackConfig.plugins.push( new FilterWarningsPlugin({
          exclude:
            /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
          })
        );

        // Add the cache-loader to the rules array
        webpackConfig.module.rules.push(
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            use: [
              {
                loader: 'cache-loader',
                options: {
                  cacheDirectory: path.resolve('.cache-loader'),
                },
              },
              'babel-loader',
            ],
          },
          // Other rules...
        );
        
        const newConfig = smp.wrap(webpackConfig);
        return newConfig;
      },
  },
};