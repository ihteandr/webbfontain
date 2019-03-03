

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let scriptName = 'bundle.js';
if (process.env.NODE_ENV === 'production') {
    scriptName = 'bundle.min.js';
}
let devtool = 'eval-source-map';

let plugins = [
];
plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './public/index.html',
    scriptName,
    rootPath: '/',
    inject: false,
}));
plugins.push(new webpack.EnvironmentPlugin([
    'NODE_ENV', 'BUILD_TIMESTAMP',
]));
let cacheDirectory = true;
let optimization;
if (process.env.NODE_ENV === 'production') {
    cacheDirectory = false;
    const compressSettings = {
        sourceMap: true,
        terserOptions: {
            ecma: 6,
        },
    };
    optimization = {
        minimizer: [
            new TerserPlugin(compressSettings),
        ],
    };
    devtool = 'source-map';
} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}
const babelPresets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-flow'),
    [require.resolve('@babel/preset-env'), {
        targets: {
            chrome: 60,
        },
        modules: false,
    }],
];
plugins = plugins;

const rules = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: require.resolve('babel-loader'),
            options: {
                cacheDirectory,
                presets: babelPresets,
                plugins: [
                    [
                        require.resolve('@babel/plugin-proposal-object-rest-spread'), { useBuiltIns: true },
                    ],
                    require.resolve('@babel/plugin-proposal-class-properties'),
                ],
            },
        },
    },
    {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        loaders: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
        ],
    },
    {
        test: /\.scss$/,
        loaders: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
            require.resolve('sass-loader'),
        ],
    },
    {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        use: [
            {
                loader: require.resolve('url-loader'),
                options: {
                    limit: 1000000,
                    name: '/fonts/[name].[ext]',
                },
            },
        ],
    },
    {
        test: /(\.png)/,
        use: [
            {
                loader: require.resolve('url-loader'),
                options: {
                    limit: 1000000,
                    name: 'graphics/[name].[ext]',
                },
            },
        ],
    },
    {
        test: /\.jpg$/,
        use: [
            {
                loader: require.resolve('file-loader'),
                options: {
                    limit: 1000000,
                    name: 'graphics/[name].[ext]',
                },
            },
        ],
    },
];


rules.push({
    enforce: 'pre',
    test: /\.jsx?$/,
    loader: require.resolve('eslint-loader'),
    exclude: /node_modules/,
    options: {
        emitError: true,
        fix: true,
        emitWarning: true,
        configFile: `${__dirname}/.eslintrc`,
    },
});
const options = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './app/index.js',
    target: 'web',
    output: {
        path: __dirname + '/../dst',
        filename: scriptName,
        libraryTarget: 'var',
    },
    devtool,
    module: {
        strictExportPresence: true,
        rules,
    },
    resolve: {
        modules: [
            'node_modules',
            './',
        ],
        extensions: ['.json', '.js'],
    },
    resolveLoader: {
        modules: ['node_modules'],
    },
    plugins,
    optimization,
    performance: {
        hints: false,
    },
};
module.exports = options;
