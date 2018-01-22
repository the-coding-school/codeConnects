const path = require('path');

//Used to inject scripts and css files into index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//Paths for development
const paths = {
  DIST: path.resolve(__dirname, 'client/dist'),
  SRC: path.resolve(__dirname, 'client/src'),
  JS: path.resolve(__dirname, 'client/src/js'),
};

// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
  },
    //Use HTML generation
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
      new ExtractTextPlugin('style.bundle.css'), //Bundle all CSS here
  ],
//Use babel loader for js and jsx
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
	{
	    test: /\.css$/,
	    loader:ExtractTextPlugin.extract({
		use: 'css-loader',
	    }),
	},
	{
	    test: /\.(png|jpg|gif)$/,
	    use: [
		'file-loader',
	    ],
	},
  {
    test: /\.scss$/,
           use: [{
               loader: "style-loader" // creates style nodes from JS strings
           }, {
               loader: "css-loader" // translates CSS into CommonJS
           }, {
               loader: "sass-loader" // compiles Sass to CSS
           }]
  }
    ],
  },

//Enable imports in react without extnesion
  resolve: {
    alias:{
      "Components": path.resolve(__dirname, "client/src/js/components")
    },
    extensions: ['.js', '.jsx'],
  },
};
