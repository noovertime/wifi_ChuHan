const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './hello.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname),
                exclude: /(node_modules)|(dist)/, 
                loader : "babel-loader",  
                resolve: {
                	extensions: ['.js'] 
                } 
            }
        ]
    }
};
