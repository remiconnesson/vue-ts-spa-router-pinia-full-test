import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  // `import.meta.env.VITE_XXX` available here with: `process.env.VITE_XXX`

  return defineConfig({
    plugins: [
      vue(),
      checker({
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}"',
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      "import.meta.vitest": "undefined",
    },
    test: {
      includeSource: ["./src/**/*.{js,ts}"],
    },
    server: {
      proxy: {
        "^/api/*": {
          target: `http://${process.env.VITE_BACKEND_URL}:8000`,
          changeOrigin: true,
          rewrite: (path) => {
            const p = path.replace(/^\/api/, ""); // strip the /api part of the route
            return p;
          },
        },
      },
    },
  });
};
