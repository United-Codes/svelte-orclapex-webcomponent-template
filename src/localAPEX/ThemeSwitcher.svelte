<script>
  import { themes } from "./index";

  let theme = sessionStorage.getItem("theme") || themes[0].name;

  function setSessionTheme(e) {
    console.log("setSessionTheme", e);
    theme = e.target.value;
    sessionStorage.setItem("theme", theme);

    // reload the page to apply the new theme
    location.reload();
  }
</script>

<div class="theme-switcher">
  <select bind:value={theme} on:change={setSessionTheme}>
    {#each themes as theme}
      <option value={theme.name} selected={theme === theme.name}
        >{theme.name}</option
      >
    {/each}
  </select>
</div>

<style>
  .theme-switcher {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
    font-size: 0.75rem;
  }
</style>
