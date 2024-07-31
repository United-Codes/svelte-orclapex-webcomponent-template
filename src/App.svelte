<!-- The contents of this file will not be exported as a web component
     Instead use this for local development and testing by importing your component
     and trying it out with different props
     "bun run dev" will serve this file at http://localhost:8000
-->
<script>
  import CoundownButton from "./CountdownButton.svelte";
  import { onAPEXready, APEXenv, APEXversionInfo } from "./localAPEX";

  let loaded = false;

  onAPEXready(() => {
    // you could use this to overwrite any apex.* functions
    /* e.g. here we overwrite apex.server.plugin to mock a response
    needed for a plugin
    apex.server.plugin = (ajaxId, params, config) => {
      setTimeout(() => {
        apex.debug.info("apex.server.plugin", ajaxId, params, config);

        const res = ["one", "two", "three"];

        config.success({ data: res });
      }, 100);
    };
    */

    apex.debug.setLevel(apex.debug.LOG_LEVEL.APP_TRACE);
    apex.debug.trace("Trace level set");

    loaded = true;
  });
</script>

<main>
  <APEXenv />

  {#if loaded}
    <!-- Call you component here  -->
    <CoundownButton buttonId="P100_COUNTDOWN1" countdownSeconds={10} />
    <CoundownButton buttonId="P100_COUNTDOWN2" countdownSeconds={30} />
    <CoundownButton buttonId="P100_COUNTDOWN3" countdownSeconds={120} />
  {/if}
  <div style="margin-top: 30vh;">
    <span class="fa fa-404" aria-hidden="true"></span>
    <span>Icons work...</span>
    <APEXversionInfo />
  </div>
</main>
