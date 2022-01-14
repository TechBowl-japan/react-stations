const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const outputPath = path.resolve(__dirname, './dist')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  /**
   * NOTE: https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-706840237
   */
  target: 'web',
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: outputPath,
    filename: './bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './public'),
      watch: true,
    },
    client: {
      overlay: true,
    },
    hot: isDevelopment,
    historyApiFallback: true,
    compress: true,
    liveReload: isDevelopment,
    port: 3000,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
  ].filter(Boolean),
}
