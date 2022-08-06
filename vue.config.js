const path = require('path')

// function addStyleResource(rule) {
//   rule.use('style-loader')
//     .loader('style-resources-loader')
//     .options({
//       patterns: [
//         path.resolve(__dirname, './src/styles/imports.less')
//       ]
//     })
// }

module.exports = {
  // 使用 public里面的静态资源的使用可以使用这样的方式
  publicPath: process.env.NODE_ENV === 'production' ? '/cart' : '/',
  productionSourceMap: true,
  devServer: {
    before(app) {
      // app 就是一个exporess实例
      app.get('/api/courses', (req, res) => {
        setTimeout(() => {
          res.json([{ name: 'xjh1', age: 18 }, { name: 'xjh2', age: 181 }])
        }, 1000);
      })
    },
    open: true,
    port: 8081,
    proxy: 'http://127.0.0.1:8080'
  },
  // chainWebpack: config => {
  //   // 只要使用这些模块,都会自动导入,我的 imports.scss 文件
  //   const types = ['vue', 'vue-modules', 'normal-modules', 'normal']
  //   types.forEach((type) => {
  //     return addStyleResource(config.module.rule("less").oneOf(type))
  //   }
  //   );
  // }
  // chainWebpack: (config) => {
  //   const oneOfsMap = config.module.rule("less").oneOfs.store;
  //   oneOfsMap.forEach(item => {
  //     item
  //       .use("style-resources-loader")
  //       .loader("style-resources-loader")
  //       .options({
  //         // 这里的路径不能使用 @ 符号，否则会报错
  //         // patterns: ["./src/assets/reset1.less", "./src/assets/reset2.less"]
  //         patterns: path.resolve(__dirname, './src/styles/imports.less')
  //       })
  //       .end()
  //   })
  // }
  configureWebpack: {
    devtool: 'source-map',
    // module: {
    //   rules: [{
    //     test: /\.less$/,
    //     use: ['style-loader', 'css-loader', 'less-loader', {
    //       loader: 'style-resources-loader',
    //       options: {
    //         patterns: path.resolve(__dirname, './src/styles/imports.less'),
    //         injector: 'append'
    //       }
    //     }]
    //   }]
    // },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 这三种 patterns 写法都是可以的
      // patterns: ["./src/assets/reset1.less", "./src/assets/reset2.less"]
      // patterns: "./src/assets/reset.less"
      patterns: [
        // 两种路径写法都可以，这里的路径不能使用 @ 符号，否则会报错
        // path.resolve(__dirname, './src/assets/reset.less')
        path.resolve(__dirname, './src/styles/imports.less')
      ]
    }
  }
}