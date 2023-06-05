const TerserPlugin = require("terser-webpack-plugin");
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const path = require('path');

const isProd = process.env.NODE_ENV === "production";

module.exports ={
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
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

        webpackConfig.plugins.push( new FilterWarningsPlugin({
          exclude:
            /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
          })
        );
        webpackConfig.plugins.push( new ReactRefreshWebpackPlugin );

        const sassRegex = /\.(scss|sass)$/i;
        const sassModuleRegex = /\.module\.(scss|sass)$/i;

        // Find the existing rule for .scss files
        const sassLoaderIndex = webpackConfig.module.rules.findIndex(
          rule => String(rule.test) === String(sassRegex)
        );

        // If the rule exists, add the sass-loader to it
        if (sassLoaderIndex !== -1) {
            webpackConfig.module.rules[sassLoaderIndex].use.push({
            loader: 'sass-loader',
            options: {
                sassOptions: {
                includePaths: [path.resolve(__dirname, 'src/assets/styles')]
                }
            }
            });
        }

        // Find the existing rule for .module.scss files
        const sassModuleLoaderIndex = webpackConfig.module.rules.findIndex(
            rule => String(rule.test) === String(sassModuleRegex)
        );

        // If the rule exists, add the sass-loader to it
        if (sassModuleLoaderIndex !== -1) {
            webpackConfig.module.rules[sassModuleLoaderIndex].use.push({
            loader: 'sass-loader',
            options: {
                sassOptions: {
                includePaths: [path.resolve(__dirname, 'src/assets/styles')]
                }
            }
            });
        }

        // Find the existing rule for .scss files
        const scssLoaderIndex = webpackConfig.module.rules.findIndex(
            rule => String(rule.test) === String(/\.(scss|sass)$/)
        );

        // If the rule exists, replace the sass-loader with postcss-loader
        if (scssLoaderIndex !== -1) {
            const sassRule = webpackConfig.module.rules[scssLoaderIndex];
            sassRule.use = [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                postcssOptions: {
                    config: path.resolve(__dirname, 'postcss.config.js')
                }
                }
            },
            {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                      includePaths: ['src/assets/styles']
                  }
                }
            }
            ];
        }

        // Add cache-loader for .jsx files
        const jsxRuleIndex = webpackConfig.module.rules.findIndex(
            rule => String(rule.test) === String(/\.(js|jsx)$/i)
        );

        if (jsxRuleIndex !== -1) {
            const jsxRule = webpackConfig.module.rules[jsxRuleIndex];
            jsxRule.use.unshift({
            loader: 'cache-loader',
            options: {
                cacheDirectory: path.resolve('.cache-loader')
            }
            });

            // Disable babel-loader for .jsx files when using cache-loader
            jsxRule.use = jsxRule.use.filter(loader => loader.loader !== 'babel-loader');
        }

        webpackConfig.module.rules.push(
            {
                test: /\.(js|mjs|ts|tsx)$/,
                use: [
                {
                    loader: 'cache-loader',
                    options: {
                    cacheDirectory: path.resolve('.cache-loader'),
                    },
                },
                'babel-loader'],
                include: path.resolve('src'),
            },
            // Other rules...
        );

        return webpackConfig;
      },
  },
};