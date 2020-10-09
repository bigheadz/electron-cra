const { override, fixBabelImports, addLessLoader } = require("customize-cra");

// const isEnvDevelopment = process.env.NODE_ENV === "development";

const multipleEntry = require("react-app-rewire-multiple-entry")(
  [
    {
      entry: "src/index.js",
      // template: "public/index.html",
      outPath: "/index.html",
    },
  ].filter((i) => i !== false)
);

// const electronRender = () => config => {
//   console.log(config);
//   config.target = "electron-renderer";
//   return config;
// };

const addWebpackTarget = (target) => (config) => {
  config.target = target;
  return config;
};

// module.exports = {
//   // target: "electron-renderer",
//   webpack: function(config, env) {
//     multipleEntry.addMultiEntry(config);
//     config.target = "electron-renderer";
//     return config;
//   }
// };

const customizeImageLoader = () => (config) => {
  // console.log(config.module.rules[2].oneOf[0]);
  config.module.rules[2].oneOf[0].options.limit = 100000; // fix the problem of pic to large, load fail?
  return config;
};

module.exports = override(
  addWebpackTarget("electron-renderer"),
  multipleEntry.addMultiEntry,
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#529EFE" },
    },
  }),
  customizeImageLoader()
);
