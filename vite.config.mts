import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  publicDir: "./src/assets",
  build: {
    target: "esnext",
  },
});
