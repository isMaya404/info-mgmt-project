export default {
  comments: false,
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
        modules: false,
      },
    ],
    //"minify",
  ],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".js", ".ts"],
        alias: {},
        resolvePath: (sourcePath) => {
          return sourcePath.replace(/\.ts$/, ".js");
        },
      },
    ],
  ],
};
