const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = function (options) {
    const defaults = {
        // http://webpack.github.io/docs/configuration.html#resolve-alias
        alias: {},
        assetsPath: 'assets/',
        cssAssetsPath: '../../',
        chunks: false,
        debug: false,
        devtool: 'cheap-module-source-map',
        entry: {},
        extensions: [],
        // http://webpack.github.io/docs/configuration.html#externals
        externals: {},
        fontsPath: 'fonts/',
        imagesPath: 'images/',
        stylesPath: 'styles/',
        scriptsPath: 'scripts/',
        sourceMapsPath: 'debug/',
        minimiz: false,
        modulesDirectories: ['node_modules'],
        noParse: [],
        outputPath: 'public',
        publicPath: '',
        rootPath: path.resolve(__dirname, '../'),
        sourcePath: 'src',
        testPath: 'test',
        target: 'web',
        hasSourceMap: true,
        useTemplate: false,
        hashquery: false,
        hashname: false,
        title: 'Jetpack',
        lang: 'en',
        devServer: null
        // cli
        // profile: false
        // watch: false
    };
    const settings = Object.assign({}, defaults, options);
    // const pages = [{ filename: 'index.html' }].concat(settings.pages || []);
    const plugins = [
        new ExtractTextPlugin(settings.assetsPath + settings.stylesPath + (settings.hashname ? '[name].[hash].css' : '[name].css'), {
            allChunks: true
        })
    ];
    const pages = [{ filename: 'index.html' }].concat(settings.pages || []);
    const templateConfig = {
        hash: settings.hashquery,
        title: settings.title,
        lang: settings.lang,
        inject: false,
        template: './webpack/tpl.default.html'
    };
    pages.forEach((page) => {
        plugins.push(
            new HtmlWebpackPlugin(
                Object.assign({}, templateConfig, page)
            )
        );
    });

    if (settings.chunks) {
        plugins.push(
            // common: common.css
            // common.js: common..js
            new webpack.optimize.CommonsChunkPlugin('common', settings.assetsPath + settings.scriptsPath + 'common.js')
        );
    }

    if (settings.minimiz) {
        plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: settings.hasSourceMap,
                compressor: {
                    warnings: false
                }
            }),
            new webpack.NoErrorsPlugin()
        );
    }

    return {
        // -- basic ---------------------------------------------
        cache: true,
        context: settings.rootPath,
        debug: settings.debug,
        devtool: settings.devtool,
        entry: Object.assign({ main: ['./src/scripts/main.js'] }, settings.entry),
        target: settings.target,
        output: {
            publicPath: settings.publicPath,
            path: path.resolve(settings.rootPath, settings.outputPath),
            filename: settings.assetsPath + settings.scriptsPath + (settings.hashname ? '[name].[hash].js' : '[name].js'),
            chunkFilename: settings.assetsPath + settings.scriptsPath + '[id].[name].chunk.js',
            sourceMapFilename: settings.sourceMapsPath + '[file].map'
        },

        // -- devServer -----------------------------------------
        devServer: settings.devServer,

        // -- externals -----------------------------------------
        externals: settings.externals,

        // -- module --------------------------------------------
        module: {
            loaders: [
                // babel-loader
                {
                    test: /\.jsx?$/,
                    include: [
                        path.join(settings.rootPath, settings.sourcePath, settings.scriptsPath),
                        path.join(settings.rootPath, settings.sourcePath, settings.testPath)
                    ],
                    exclude: [],
                    loader: 'babel'
                },
                {
                    test: /\.css$/,
                    // NOTE 加入 modules 参数会更改 className 名为 hash:base64
                    // loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&sourceMap!postcss', {
                    // css?root=.
                    // https://github.com/webpack/css-loader#root-relative-urls
                    loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&sourceMap!postcss', {
                        publicPath: settings.cssAssetsPath
                    })
                },
                {
                    test: /\.png$/,
                    loader: `url?limit=100&name=${settings.assetsPath}${settings.imagesPath}[name].[ext]`
                },
                {
                    test: /\.(jpe?g|gif)$/,
                    loader: `file?name=${settings.assetsPath}${settings.imagesPath}[name].[ext]`
                },
                {
                    test: /\.(woff|woff2)$/,
                    loader: `url?limit=100000&name=${settings.assetsPath}${settings.fontsPath}[name].[ext]`
                },
                {
                    test: /\.(ttf|eot)$/,
                    loader: `file?name=${settings.assetsPath}${settings.fontsPath}[name].[ext]`
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                },
                {
                    test: /\.vue$/,
                    loader: 'vue'
                }
            ],
            noParse: settings.noParse
        },

        // -- resolve -------------------------------------------
        resolve: {
            root: settings.rootPath,
            modulesDirectories: settings.modulesDirectories,
            extensions: ['', '.js', '.jsx', '.vue'].concat(settings.extensions),
            alias: settings.alias
            // http://webpack.github.io/docs/configuration.html#resolve-packagemains
            // packageMains
            // packageAlias
        },

        // -- pollyfills ----------------------------------------
        node: {
            __dirname: true,
            __filename: true,
            console: false,
            global: true,
            process: true,
            Buffer: false
        },

        // -- plugins -------------------------------------------
        plugins,

        // -- other -------------------------------------------
        postcss: () => {
            return [autoprefixer({ browsers: ['last 2 versions'] }), precss];
        }
    };
};
