import path from "path";
import webpack from "webpack";
import devMiddleware from "webpack-dev-middleware";
import type { Application } from "express";

import livereload from "livereload";
import connectLivereload from "connect-livereload";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const webpackConfig = require(
  path.join(process.cwd(), "frontend", "configs", "webpack.dev.js"),
);

function setupDevMiddleware(app: Application) {
  if (process.env.NODE_ENV === "development") {
    //INFO: live server for auto refreshing browser using websockets
    const lrserver = livereload.createServer();
    lrserver.watch(path.join(process.cwd(), "frontend/public"));
    lrserver.server.once("connection", () => {
      setTimeout(() => {
        lrserver.refresh("/frontend");
      }, 10);
    });

    app.use(connectLivereload());

    //INFO: Webpack dev middleware setup
    const compiler = webpack(webpackConfig.default);
    app.use(
      devMiddleware(compiler, {
        publicPath: webpackConfig.output?.publicPath,
        writeToDisk: true,
      }),
    );
  }
}
export default setupDevMiddleware;
