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

const outputConfig = [
  {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  production && {
    sourcemap: false,
    format: "iife",
    name: "app",
    file: "public/build/bundle.min.js",
    plugins: [terser()],
  },
].filter(Boolean);

export default {
  // change src/CountdownButton.svelte to your entry point component
  input: [production ? "src/CountdownButton.svelte" : "src/main.js"],
  output: outputConfig,
  plugins: [
    svelte({
      compilerOptions: {
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
