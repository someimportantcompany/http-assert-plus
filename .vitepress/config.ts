import { defineConfig } from "vitepress";

const urls = {
  github: "https://github.com/someimportantcompany/http-assert-plus",
  npm: "https://npm.im/http-assert-plus",
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "http-assert-plus",
  description: "More assertions with status codes",
  lastUpdated: true,
  srcExclude: ["./LICENSE"],
  themeConfig: {
    aside: false,
    outline: false,
    socialLinks: [
      { icon: "npm", link: urls.npm },
      { icon: "github", link: urls.github },
    ],
    docFooter: {
      prev: false,
      next: false,
    },
    lastUpdated: {
      formatOptions: {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "UTC",
      },
    },
  },
  rewrites: {
    "README.md": "index.md",
    "(.*)/README.md": "(.*)/index.md",
  },
});
