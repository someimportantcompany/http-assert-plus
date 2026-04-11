import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "./dist",
  bundle: true,
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  minify: true,
  platform: "node",
  splitting: false,
  target: "node16",
});
