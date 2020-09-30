const path = require("path");

module.exports = {
  entry: "./main/index.js",
  output: {
    path: path.resolve(__dirname, "main"),
    filename: "index.bundle.js",
  },
  target: "electron-main"
};
