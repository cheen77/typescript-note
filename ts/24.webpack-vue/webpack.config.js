const { Configuration } = require("webpack");
const path = require("path");

const HtmlWepackPlugin = require("html-webpack-plugin"); //插件
const { VueLoaderPlugin } = require("vue-loader");
// 注解 有代码提示
/**
 * @type {Configuration}
 */
const config = {
  mode: "development", //开发模式
  entry: "./src/main.ts", //入口文件
  output: {
    path: path.resolve(__dirname, "dist"), //输出目录
    filename: "bundle.js", //打包之后的文件名
  },
  module: {
    rules: [
      {
        test: /\.ts$/, //以ts结尾文件
        use: {
          loader: "ts-loader", //使用ts-loader处理ts文件
          options: {
            appendTsSuffixTo: [/\.vue$/], //ts-loader库中查阅
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], //规则 从右向左解析 先解析css-loader 再将解析结果交给 style-loader通过js动态插入到标签
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.sass$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    //webpack的插件都是类 需要new
    new HtmlWepackPlugin({
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
  ],
  stats: "errors-only", //控制台 报错显示
};

// webpack是基于node环境,遵循commonJs规范
module.exports = config;
