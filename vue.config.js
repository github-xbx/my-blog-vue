// const CompressionWebpackPlugin = require('compression-webpack-plugin'); // gzip 压缩
// const productionGzipExtensions = ['js', 'html', 'css'];
// 代码压缩
const IS_PROD = process.env.NODE_ENV === 'production';
let appName = process.argv.slice(0)[3].replace('--', '');
let outputPath = appName === 'home' ? 'home' : 'admin'
module.exports = {
    // 由于部分插件，导致ie下空白
    transpileDependencies: ['vue-savedata', 'vue-baberrage'],
    //运行目录：开发环境：都在根目录。生产环境，前台在根目录，后台在子目录下运行
    publicPath: IS_PROD ? outputPath == 'home' ? '/' : '../' + outputPath + '/' : '/',
    // 输出目录，
    outputDir: '../' + outputPath,
    //多页面配置
    pages: {
        //此处因为要前后台分开打包，所以要注释
        // about: {
        //     entry: 'src/pages/admin/main.js',
        //     template: 'public/admin.html',
        //     filename: 'admin.html',
        //     chunks: ['chunk-vendors', 'chunk-common', 'about'],
        //     title: 'BAYMAX后台管理'
        // },
        index: {
            entry: 'src/pages/' + appName + '/main.js',
            template: `public/${appName}.html`,
            filename: 'index.html',
            chunks: ["chunk-vendors", "chunk-common", "index", 'runtime~index'],
            title: appName === 'home' ? 'My-Blog' : 'BAYMAX后台管理'
        }
    },
    devServer: {
        sockHost: "localhost",
        disableHostCheck: true,
        port: 80, // 端口号
        host: "0.0.0.0",
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            "/api": {
                //target: "http://127.0.0.1:81", // 需要请求的地址
                target: process.env.VUE_APP_API_URL, // 需要请求的地址
                changeOrigin: true, // 是否跨域
                logLevel:'debug',
                // pathRewrite: {
                //     "^/api": " " // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                // }
            },
            "/music": {
                target: "https://music.liuzhijin.cn", // 需要请求的地址
                // target: process.env.VUE_APP_URL,   // 需要请求的地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/music": "" // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                }
            },
            "/english": {
                target: "http://sentence.iciba.com", // 需要请求的地址
                // target: process.env.VUE_APP_URL,   // 需要请求的地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/english": "" // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                }
            },
        }
    },
    productionSourceMap: !IS_PROD,
    configureWebpack: config => {
        // 用cdn方式引入，则构建时要忽略相关资源
        config.externals = {
            "echarts": "echarts",
        };

        if (IS_PROD) {

            //gzip压缩
            // config.plugins.push(new CompressionWebpackPlugin({
            //     algorithm: 'gzip',
            //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), //匹配文件名
            //     threshold: 10240, //对超过10k的数据进行压缩
            //     minRatio: 0.8,
            //     deleteOriginalAssets: false //是否删除原文件
            // }));

            // 代码压缩
            config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
        }
    },
    chainWebpack: config => {
        if (IS_PROD) {
            config.plugins.delete('prefetch')
                // 压缩代码
            config.optimization.minimize(true);
        }
    }
}