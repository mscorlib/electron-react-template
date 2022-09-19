import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

const rootPath = path.resolve(__dirname, ".");

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
    alias: {
      '@': path.resolve(__dirname, './src/renderer')
    }
  },
  entry: path.resolve(rootPath, "src/renderer", "index.tsx"),
  target: "electron-renderer",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        include: /src/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.less$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader' }
        ]
      }
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(rootPath, "dist/renderer"),
      publicPath: "/",
    },
    port: 5000,
    historyApiFallback: true,
    compress: true,
  },
  output: {
    path: path.resolve(rootPath, "dist/renderer"),
    filename: "js/[name].js",
  },
  
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(rootPath, "index.html") }),
  ],
};

export default config;
