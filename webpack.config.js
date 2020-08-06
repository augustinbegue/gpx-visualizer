var path = require('path');

module.exports = {
    // Change to your "entry-point".
    entry: './src/',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.(ts|js)x?$/, exclude: /node_modules/, loader: 'babel-loader', },
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.svg$/, use: 'url-loader' },
        ],
    }
};