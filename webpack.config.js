var webpack = require('webpack');
const path = require('path');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//var jQuery = require('jquery');
//require('jquery-ui'); 
//require('jquery-ui-dist/jquery-ui.js');

module.exports = (env, options) => {
    const config = {
        //entry: ['./jsInterop/jsInterop.ts'],
        entry: {
            main: "./app/main.ts"
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                        },
                    ],
                }
            ]
        },
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, './'),
            publicPath: path.resolve(__dirname, '/dist/'),
            hot: true,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            // alias: {
            //     'jquery-ui': 'jquery-ui-dist/jquery-ui.js',
            //     modules: path.join(__dirname, "node_modules"),
            // }
        },
        output: {
            filename: '[name].js'
        },
        // plugins: [
        //     new webpack.ProvidePlugin({
        //         '$': 'jquery',
        //         'jQuery': 'jquery',
        //         'window.jQuery': 'jquery'
        //     })
        // ],
    };

    //if (options.mode === 'development') {
        config.output.path = path.resolve(__dirname, './dist');
    //} else {
    //    //production
    //    config.output.path = path.resolve(__dirname, './docs/dist');
    //    config.plugins = [
    //        new CopyWebpackPlugin([{ from: './index.html', to: '../' }]),
    //    ];
        //config.optimization = {
        //    minimizer: [
        //        new UglifyJsPlugin({
        //            cache: true,
        //            parallel: true,
        //            uglifyOptions: {
        //                compress: true,
        //                ecma: 5,
        //                mangle: true
        //            },
        //            sourceMap: true
        //        })
        //    ]
        //}
    //}

    return config;
};
