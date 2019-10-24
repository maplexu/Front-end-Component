/*
  修改webpack的默认配置
 */

const path = require('path');
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  configureWebpack: {
    entry: ["babel-polyfill", './src/main.js'],
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
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('src', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('component', resolve('./src/component'))
  }
  // chainWebpack: config => {
  //   config.module
  //     .rule('fonts')
  //     .test(/\.(ttf|eot|woff|woff2|svg)$/)
  //     .use('url-loader')
  //       .loader('url-loader')
  //       .end()
  // }
}
