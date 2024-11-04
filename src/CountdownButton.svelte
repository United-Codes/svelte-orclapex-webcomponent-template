<!-- Only this file (and the imported files) will be compiled to a web component

This line will tell the svelte compiler to create a web component out of this component
Change the html tag to your taste to use it like this: <uc-countdown-button /> -->
<svelte:options
  customElement={{ tag: "uc-countdown-button", shadow: "none" }}
/>

<script>
  import { onMount } from "svelte";

  // you can import sub-components like this to split your code
  // import SubComponent from "./SubComponent.svelte";

  // export props like this
  // they will be attributes on the web component
  

  
  /**
   * @typedef {Object} Props
   * @property {string} [buttonId] - <uc-countdown-button buttonId="P12_ABC" />
   * @property {number} [countdownSeconds] - you can also set default values
   */

  /** @type {Props} */
  let { buttonId = "", countdownSeconds = 20 } = $props();

  // private variables
  let secondsLeft = $state(countdownSeconds);
  let secondsPassed = 0;
  let interval = null;

  // this runs when the component is mounted
  onMount(() => {
    interval = setInterval(() => {
      secondsPassed++;
      secondsLeft = countdownSeconds - secondsPassed;

      if (secondsLeft <= 0) {
        secondsLeft = 0;
        window.apex.message.alert(`Time's up! (${buttonId})`);
        clearInterval(interval);
      }
    }, 1000);
  });

  function defuse() {
    clearInterval(interval);
    window.apex.message.alert(`You defused the button! (${secondsLeft}s left)`);
  }
</script>

<!-- This is the html structure of the component -->
<button
  id={buttonId}
  class="t-Button t-Button--iconLeft"
  class:t-Button--warning={secondsLeft <= 5 && secondsLeft > 0}
  class:t-Button--danger={secondsLeft <= 0}
  onclick={defuse}
>
  <span
    class="t-Icon t-Icon--left fa"
    class:fa-alarm-clock={secondsLeft > 0}
    class:fa-bomb={secondsLeft <= 0}
    aria-hidden="true"
  ></span>
  {#if secondsLeft >= 60}
    <span class="t-Button-label">You've got plenty of time</span>
  {:else if secondsLeft > 0}
    <span class="t-Button-label">{secondsLeft}s left</span>
  {:else}
    <span class="t-Button-label">BOOM!</span>
  {/if}
</button>
