/*
  修改webpack的默认配置
 */
const path = require('path');
const mdLoader = require('./build/loader/md-loader/index.js');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  configureWebpack: {
    entry: ['babel-polyfill', './src/main.js'],
    // externals: {
    //   BMap: "BMap",
    //   BMapLib: "BMapLib"
    // },
    // devServer: {
    //   proxy: {
    //     "/api": {
    //       // target: "http://information.turingmao.com"   // 测试服务器的接口地址
    //       // target: "http://trdboss.gtzn.com"            // 正式服务器的接口地址
    //       target: "http://localhost:9003"                 // 本地开发环境的接口地址
    //     }
    //   }
    // }
  },
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('src', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('component', resolve('./src/components'))
      .set('basic-comp', resolve('./src/components/basic-comp'))
      .set('business-comp', resolve('./src/components/business-comp'));

    // config.module.rule('md')
    //   .test(/\.md/)
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .end()
    //   .use('vue-markdown-loader')
    //   .loader('vue-markdown-loader/lib/markdown-compiler')
    //   .options({ raw: true });
    config.module.rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('mdLoader')
      .loader(require.resolve('./build/loader/md-loader/index.js'))
      .end();
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule('fonts')
  //     .test(/\.(ttf|eot|woff|woff2|svg)$/)
  //     .use('url-loader')
  //       .loader('url-loader')
  //       .end()
  // }
}
