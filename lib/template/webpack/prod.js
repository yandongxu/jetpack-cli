module.exports = require('./io')({
    devtool: 'source-map',
    assetsPath: 'assets/',
    cssAssetsPath: '../../',
    chunks: true,
    minimiz: true,
    outputPath: 'dist',
    // hashname: true,
    hasSourceMap: true
});
