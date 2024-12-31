<script lang="ts">
  import { collapseState } from "./lib/store/collapse-state";
  import { clearState, wishlistState } from "./lib/store/wishlist-state";
  import Block from "./lib/Block.svelte";
  import Dropdown from "./lib/Dropdown.svelte";

  function toggleCollapse() {
    collapseState.update((state) => {
      return !state;
    });
  }

  function clear() {
    if (window.confirm("Стереть весь вишлист и начать заново?")) {
      clearState();
    }
  }

  function copyWishlist() {
    const wishlist = $wishlistState;
    if (!wishlist) {
      return;
    }
    const text = wishlist
      .map((block) => {
        const list = block.items.filter((e) => e && e.trim() != "");
        if (list.length) {
          return (
            `${block.price.toLocaleString('ru')}:\n` +
            list.map((e) => ` - ${e}`).join("\n") +
            "\n"
          );
        }
        return "";
      })
      .join("\n");
    navigator.clipboard.writeText(text);
  }
</script>

<h1>Мега вишлист</h1>
<main>
  <div class="toolbar">
    <button on:click={toggleCollapse}>
      {#if $collapseState}
        Свернуть всё
      {:else}
        Развернуть всё
      {/if}
    </button>
    <Dropdown>
      <button on:click={copyWishlist}>📝&nbsp;Скопировать</button>
      <button class="danger" on:click={clear}>🔥 Очистить</button>
    </Dropdown>
  </div>
  {#if $wishlistState}
    {#each $wishlistState as block, index}
      <Block price={block.price} amount={block.items.length} blockIndex={index}
      ></Block>
    {/each}
  {/if}
</main>

<style>
  .toolbar {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .danger {
    background-color: #f96152;
    color: #fff;
    /* scale: 0.8; */
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 2em;
      padding: 0 8px;
    }

    .toolbar {
      padding: 0 8px;
    }
  }
</style>
