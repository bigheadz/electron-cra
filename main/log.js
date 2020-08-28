const log = require("electron-log");
const { crashReporter } = require("electron");

console.log = log.log;
console.warn = log.warn;
console.error = log.error;
console.log("electron-log path", log.transports.file.getFile().path);

log.catchErrors(); // 抓取日志

log.info("-----------------------start------------------------------------");

crashReporter.start({
  productName: "QLink",
  companyName: "Chedu",
  // 现在没有报告， 只有本地查看
  submitURL: "https://localhost:1127",
  uploadToServer: false,
});

log.info("crashReport", crashReporter.getCrashesDirectory());

global.log = log;
