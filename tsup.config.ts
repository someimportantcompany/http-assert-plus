import { defineConfig } from "tsup";

const target = "node18" as const;

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
    target,
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
    target,
  },
]);
