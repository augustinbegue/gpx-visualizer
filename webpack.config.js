var path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // Change to your "entry-point".
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: '[name].bundle.js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      { test: /\.(ts|js)x?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: "css-loader" },
      { test: /\.svg$/, use: "url-loader" },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/,
    }),
  ],
};
