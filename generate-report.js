const os = require("os");
const moment = require("moment");
const reporter = require("cucumber-html-reporter");
const fs = require("fs");
const project = require("./package.json");

const dir = "./report";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const dateTime = moment().format("YYYYMMDD-HHmmss");

const options = {
  theme: "hierarchy",
  jsonFile: `${dir}/cucumber_report.json`,
  output: `${dir}/report_${dateTime}.html`,
  reportSuiteAsScenarios: true,
  launchReport: true,
  brandTitle: "Totem Food Service",
  columnLayout: 1,
  metadata: {
    Version: project.version,
    Environment: process.env.NODE_ENV,
    Platform: `${os.type()} ${os.release()}`,
    CPUs: os.cpus().length,
    Uptime: `${os.uptime} seconds`,
  },
};

reporter.generate(options);
