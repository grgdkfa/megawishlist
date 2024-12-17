<script lang="ts">
  import { onMount } from "svelte";
  import { bus, resetEvent } from "./utils/event-bus";
  export let initialValue: string | null;
  export let onChange: (newValue: string) => void;
  let value: string = initialValue || "";

  $: onChange(value);

  onMount(() => {
    bus.subscribe(resetEvent, () => {
      value = "";
    });
  });
</script>

<div class="field">
  <input type="text" bind:value />
</div>

<style>
  .field {
    box-sizing: content-box;
  }

  .field input[type="text"] {
    width: 100%;
    border: none;
    border-bottom: 1px solid #777;
    border-radius: 0;
    background-color: var(--bg-color);
  }

  @media (prefers-color-scheme: light) {
    .field input[type="text"] {
      border-bottom: 1px solid #ddd;
    }
  }
</style>
