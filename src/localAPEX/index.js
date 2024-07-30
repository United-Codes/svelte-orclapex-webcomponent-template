export function onAPEXready(cb) {
  window.addEventListener("apexready", () => {
    cb();
  });
}

export { default as APEXenv } from "./APEXenv.svelte";
export { default as APEXversionInfo } from "./APEXversionInfo.svelte";

