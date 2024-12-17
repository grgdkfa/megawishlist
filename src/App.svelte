<script lang="ts">
import {
    collapseState
} from "./lib/store/collapse-state";
import {
    PRICE_MAP,
    resetState,
    wishlistState
} from "./lib/store/wishlist-state";
import {
    bus,
    resetEvent
} from './lib/utils/event-bus'
import Block from "./lib/Block.svelte";
import Dropdown from "./lib/Dropdown.svelte";

function toggleCollapse() {
    collapseState.update((state) => {
        return !state
    })
}

function clear() {
    if (window.confirm('Стереть весь вишлист и начать заново?')) {
        resetState()
        bus.publish(resetEvent())
    }
}

function copyWishlist() {
    const wishlist = $wishlistState
    const text = Object.entries(wishlist).map(([price, entries]) => {
        const list = entries.filter(e => e && e.trim() != '')
        if (list.length) {
            return `${price}:\n` + list.map(e => ` - ${e}`).join('\n') + '\n'
        }
        return ''
    }).join('\n')
    navigator.clipboard.writeText(text)
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
    {#each PRICE_MAP as {price, amount}}
    <Block price={price} amount={amount}></Block>
    {/each}
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
