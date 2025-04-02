import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import { resolve } from "path";

export default mergeConfig(
  defineConfig({
    esbuild: {
      jsxFactory: "createVNode",
    },
    optimizeDeps: {
      esbuildOptions: {
        jsx: "transform",
        jsxFactory: "createVNode",
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"), // 메인 엔트리 파일
          hash: resolve(__dirname, "index.hash.html"), // 해시 페이지 포함
        },
      },
    },
    base: "/front-5th-chapter1-2/",
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    },
  }),
);
