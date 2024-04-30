import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { Plugin, TransformResult } from "vite";
import { readFileSync } from "node:fs";
import { join } from "path";

function protobufLoader(): Plugin {
  return {
    name: "vite-plugin-my-ext",
    enforce: "pre",
    transform(code, id) {
      return /\.proto$/.test(id) ? preprocessFile(code, id) : code;
    },
  };
}

function preprocessFile(code: string, _id: string): TransformResult {
  const template = readFileSync(join(__dirname, "proto.template.js"));
  return {
    code: template.toString().replace("INSERT_CODE_HERE", code),
    map: null,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), protobufLoader()],
  build: {
    outDir: "build",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: true,
  },
});
