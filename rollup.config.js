import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { spawn } from "child_process";
import css from "rollup-plugin-css-only";
import livereload from "rollup-plugin-livereload";
import svelte from "rollup-plugin-svelte";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = spawn("npm", ["run", "start", "--", "--dev"], {
        stdio: ["ignore", "inherit", "inherit"],
        shell: true,
      });

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

// Adjusted part for output
const outputConfig = [
  // Unminified output
  {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  // Minified output
  production && {
    sourcemap: false,
    format: "iife",
    name: "app",
    file: "public/build/bundle.min.js",
    plugins: [terser()],
  },
].filter(Boolean); // Filters out false values, in case production is false

export default {
  input: [production ? "src/SearchBoxPro.svelte" : "src/main.js"],
  output: outputConfig,
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
        customElement: true,
      },
    }),
    css({ output: "bundle.css" }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
      exportConditions: ["svelte"],
    }),
    commonjs(),
    !production && serve(),
    !production && livereload("public"),
  ],
  watch: {
    clearScreen: false,
  },
};
