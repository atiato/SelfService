var path = require('path');
var webpack = require('webpack');

var config = {
    cache: true,
    devtool: 'source-map',
    entry: {
        polyfills: './src/polyfills',
        vendor: './src/vendor',
        main: './src/main'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        loaders: [
            { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader'] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.html/, loader: 'raw-loader' },
            { test: /\.css$/, loader: 'to-string-loader!css-loader' },
        ]
    },

    plugins: [
        //new webpack.optimize.UglifyJsPlugin()
        new webpack.optimize.CommonsChunkPlugin({ name: ['polyfills', 'vendor', 'main'].reverse(), minChunks: Infinity }),
    ],

    resolve: {
        extensions: ['', '.ts', '.js', '.json'],
        modulesDirectories: ['node_modules']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },

    node: {
        global: true,
        process: true,
        Buffer: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false,
        clearTimeout: true,
        setTimeout: true
    }
};
module.exports = config;