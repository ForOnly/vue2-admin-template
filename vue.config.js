/**
 * https://cli.vuejs.org/config/#vue-config-js
 */
"use strict";
const { defineConfig } = require("@vue/cli-service");

const path = require("path");
const defaultSettings = require("./src/settings.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = defaultSettings.title || "vue Admin Template";
const port = process.env.port || process.env.npm_config_port || 9528;
/**
 * Detail: https://cli.vuejs.org/config/#publicpath
 */
module.exports = defineConfig({
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  transpileDependencies: true,
  devServer: {
    port: port,
    open: false, //配置自动启动浏览器
    setupMiddlewares: (middlewares, devServer) => {
      const app = devServer.app;
      require("./mock/mock-server.js")(app); // 在 setupMiddlewares 中添加自定义中间件
      return middlewares; // 返回中间件链
    },
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    // config.plugin("preload").tap(() => [
    //   {
    //     rel: "preload",
    //     // to ignore runtime.js
    //     // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: "initial",
    //   },
    // ]);

    // when there are many pages, it will cause too many meaningless requests
    // config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons/svg")).end();
    config.module
      .rule("svg-sprite")
      .test(/\.svg$/)
      .include.add(resolve("src/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: `${defaultSettings.SVG_PREFIX}[name]`,
        svgo: true, // 启用 svgo 插件来优化 SVG
        svgoConfig: path.resolve(__dirname, "src/assets/icons/svgo.yml"), // 指定 svgo.yml 配置文件
      })
      .end();
  },
});
