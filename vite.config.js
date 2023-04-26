import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Promise Tracker",
      fileName: (format) => `promise-tracker.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDom",
        },
      },
    },
  },
  plugins: [react(), cssInjectedByJsPlugin()],
});
