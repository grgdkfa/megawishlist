<script lang="ts">
  import Field from "./Field.svelte";
  import { wishlistState } from "./store/wishlist-state";
  import { collapseState } from "./store/collapse-state";

  export let amount: number;
  export let price: number;
  export let blockIndex: number;

  const label = price.toLocaleString('ru')

  let open: boolean = true;

  let filled: number = 0;

  wishlistState.subscribe((state) => {
    if (!state) {
      return
    }
    const block = state[blockIndex];
    filled = block.items.reduce((total, value) => {
      return total + (value && value.trim() !== "" ? 1 : 0);
    }, 0);
  });

  collapseState.subscribe((state) => {
    open = state;
  });

  function onFieldChange(index: number, newValue: string) {
    if (!$wishlistState) {
      return
    }
    const oldValue = $wishlistState[blockIndex].items[index];
    if (oldValue === newValue || (newValue === "" && oldValue === null)) {
      return;
    }
    console.log(
      `Field ${price}: ${index} changed ("${oldValue}" -> "${newValue}")! Updating state...`
    );
    wishlistState.update((state) => {
      if (!state) {
        return state
      }
      state[blockIndex].items[index] = newValue;
      return state;
    });
  }
</script>

{#if $wishlistState}
<div class="field-block">
  <h6 class="price-header">
    <button
      class="collapse-button"
      on:click={() => {
        open = !open;
      }}
    >
      {#if open}
        ➖
      {:else}
        ➕
      {/if}
    </button>
    <strong>{label}</strong>
    ({filled} / {amount})
    {#if filled == amount}
      ✅
    {/if}
  </h6>
  <ol class={open ? "" : "collapsed"}>
    {#each { length: amount } as _, i}
      <li>
        <Field
          onChange={(newValue) => onFieldChange(i, newValue)}
          initialValue={$wishlistState[blockIndex].items[i]}
        ></Field>
      </li>
    {/each}
  </ol>
</div>
{/if}

<style>
  .field-block {
    margin-bottom: 20px;
  }

  .price-header {
    font-size: 16px;
    font-weight: normal;
    margin: 0;
  }

  .field-block ol {
    padding-left: 30px;
  }

  .field-block ol.collapsed {
    display: none;
  }

  .field-block li {
    margin-top: 5px;
  }

  .collapse-button {
    padding: 0;
    width: 2em;
    height: 2em;
    margin-right: 10px;
  }

  @media (max-width: 500px) {
    .price-header {
      padding: 0 8px;
    }
  }
</style>
