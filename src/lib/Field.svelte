<script lang="ts">
  export let initialValue: string | null;
  export let onChange: (newValue: string) => void;
  let value: string = initialValue || "";

  $: onChange(value);

</script>

<div class="field">
  <input type="text" bind:value />
</div>

<style>
  .field {
    box-sizing: content-box;
  }
</style>
