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
            console.log("IN1");
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
            console.log("IN2");
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
        // webpackConfig.plugins.push(
        //   new HardSourceWebpackPlugin()
        // );

        // Add the cache-loader to the rules array
        webpackConfig.module.rules.push(
          // {
          //   test: /\.svg$/,
          //   use: [
          //     {
          //       loader: 'svg-url-loader',
          //       options: {
          //         limit: 10000, // Any SVG files smaller than 10kb will be converted to a data URL
          //       },
          //     },
          //   ],
          // },
          // {
          //   test: /\.(css|scss)$/,
          //   use: ['style-loader', 'css-loader']
          // },
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