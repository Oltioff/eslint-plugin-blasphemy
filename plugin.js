import fs from "fs";
import noBlasphemy from "./rules/no-blasphemy.js";

const pkg = JSON.parse(fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"));

const plugin = {
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

export default plugin;