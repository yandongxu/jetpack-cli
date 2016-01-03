module.exports = require('./io')({

    // -- basic config -------------------------------------
    // The `output.path` from the view of the Javascript / HTML page.
    // publicPath: '',

    // css/js 文件路径
    // assetsPath: 'assets/',

    // 更改 css 中 url() 内容的输出路径前缀(prefix)
    // cssAssetsPath: '../../',

    // 跳过编译
    // noParse: []

    // 可用于 serve mode 与 production mode
    // 入口: 默认读 ./src/scripts/main.js, 可配多入口
    // entry: {
    //     // 文件
    //     custom: [
    //         './src/scripts/custom.js',
    //         './src/scripts/custom2.js'
    //     ],
    //     // 外部库打包
    //     vendor: ['jquery', 'lodash']
    // },

    // 是否把公共代码部分提取到单独的文件当中(common.chunk.js)
    // chunks: true,

    // 是否开启 loader 的 debug 模式
    // debug: true

    // 输出目录, 不会改变 html 中标签路径
    // outputPath: 'dist',

    // sourcemap type, 生产环境推荐使用: 'source-map'
    // devtool: 'cheap-module-source-map',


    // -- template config ----------------------------------

    // 是否使用 template
    // useTemplate: true

    // page title
    // title: 'NEXT Booster',

    // 配置多页面 {Array[Object]}, 默认为 index.html: webpack/tpl.default.html
    // TODO 简化参数, eg: pages: [ fun: 'fun.html' ]
    // 分别在 webpack 当前目录和 templates 中查找对应的文件名
    // pages: [
    //     {
    //         title: 'fun',
    //         filename: 'fun.html',
    //         template: './src/templates/fun.html'
    //     }
    // ],


    // -- webpack development server -----------------------

    // devServer: {
    //     contentBase: 'public',
    //     historyApiFallback: false,
    //     noInfo: false,
    //     port: 9000,
    //     quiet: false,
    //     stats: {
    //         colors: true
    //         // cached: false,
    //         // exclude: []
    //     }
    // },


    // -- production concern -------------------------------

    // 开启压缩(使用 UglifyJsPlugin)
    // minimiz: true,

    // 是否需要 sourcemap, 默认为开启, 依赖 minimiz === true 才可用
    // hasSourceMap: true,

    // 是否需要文件名 hash 处理, `[name].[hash].js`, 推荐在生产环境使用
    // hashname: false,

    // 是否使用 querystring, main.js?v=c6f85s
    // hashquery: false,

    // 用于外部库加载, <https://webpack.github.io/docs/library-and-externals.html#examples>
    // externals: {}

    // 示例:
    // index.html:
    // <script src='//cdnjs.com/jquery.js'></script>
    //
    // webpack.config.js:
    // externals: {
    //   jquery: 'jQuery'
    // }
    //
    // main.js
    // import $ from 'jquery'

});
