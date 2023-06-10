module.exports = {
  default: `--require-module ts-node/register --require-module tsconfig-paths/register --require ./src/**/*.ts --format-options '{"snippetInterface": "synchronous"}' --format json:report/cucumber_report.json --publish-quiet`,
};
