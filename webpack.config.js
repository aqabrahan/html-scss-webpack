const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: ["./src/app.js", "./src/scss/style.scss"],
  /* output: {
    path: path.resolve(__dirname, "build/theme"),
    filename: "js/[name].js"
  }, */
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader?-url"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      /* {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }, */
    ]
  },
  //remove comments from JS files
  optimization: {
    minimizer: [
      /* new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }), */
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        }
      })
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
  ]
};