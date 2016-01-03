module.exports = require('./io')({
    debug: false,
    devServer: {
        contentBase: 'public',
        historyApiFallback: false,
        noInfo: false,
        port: 9000,
        quiet: false,
        stats: {
            colors: true
        }
    }
});
