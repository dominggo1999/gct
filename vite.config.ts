/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import shebang from "rollup-plugin-preserve-shebang";

import { builtinModules } from "module";

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "./src") }],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "index",
      fileName: "index",
    },
    rollupOptions: {
      // If you are building a library, make sure to externalize deps, since we don't want to bundle them
      external: [...builtinModules, "simple-git", "inquirer", "rome"],
    },
  },
  plugins: [
    tsconfigPaths(),
    dts(),
    nodeResolve(),
    shebang({
      shebang: "#!/usr/bin/env node",
    }),
  ],
  test: {
    globals: true,
  },
});
