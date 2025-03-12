const fs = require("fs");
const path = require("path");
const noBlasphemy = require("./rules/no-blasphemy");

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf8"));

module.exports = {
    meta: {
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
    },
    configs: {},
    rules: {
        nope: noBlasphemy
    },
    processors: {}
};