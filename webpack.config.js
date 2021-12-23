const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const ImageminPlugin = require('imagemin-webpack-plugin').default
const glob = require('glob')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'assets'),
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'assets/dist'),
  },
  entry: [
    path.join(__dirname, 'assets/src/index.js'),
    path.join(__dirname, 'assets/src/style/index.scss'),
  ],
  plugins: [
    new CleanWebpackPlugin({}),
    new ImageminPlugin({
      externalImages: {
        context: '',
        sources: glob.sync(
          'assets/src/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ),
        destination: 'assets/dist/images',
        fileName: '[name].[ext]',
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'main.bundle.css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [require('@babel/preset-env')],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
}
