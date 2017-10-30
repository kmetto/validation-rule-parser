const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'RuleParser.js'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname),
        library: 'validation-rule-parser',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
        }]
    }
}