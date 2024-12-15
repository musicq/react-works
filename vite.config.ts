import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],

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
