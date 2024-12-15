import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "reworks",
      fileName: "reworks",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },

  plugins: [react(), dts()],

  test: {
    root: ".",
    includeSource: ["src/**/*.{ts,tsx}"],
    environment: "jsdom",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      reporter: ["clover", "text", "json", "html"],
    },
  },
});
