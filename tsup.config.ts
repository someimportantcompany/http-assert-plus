import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    outDir: "./dist",
    bundle: true,
    clean: true,
    dts: true,
    format: "cjs",
    minify: true,
    platform: "node",
    splitting: false,
    target: "node16",
    footer: {
      js: "module.exports = module.exports.default;",
    },
  },
  {
    entry: ["./src/index.ts"],
    outDir: "./dist",
    bundle: true,
    dts: true,
    format: "esm",
    minify: true,
    platform: "node",
    splitting: false,
    target: "node16",
  },
]);
