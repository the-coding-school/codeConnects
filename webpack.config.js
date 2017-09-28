const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const noop = function () {}; //eslint-disable-line no-empty-function

module.exports = function({
    debug = false
}){
    return {
        entry: "./index.tsx",
        context: __dirname + "/src",
        output: {
            filename: "bundle.js",
            path: __dirname + "/dist"
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"],
            modules: [
                path.resolve('./src'),
                path.resolve('node_modules/')
            ]
        },

        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
            ]
        },

        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            (!debug ? new UglifyJSPlugin() : noop)
        ]
    };
};
