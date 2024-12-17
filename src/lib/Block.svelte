<script lang="ts">
    import Field from "./Field.svelte";
    import { wishlistState } from "./store/wishlist-state";
    import { collapseState } from "./store/collapse-state";

    export let amount: number
    export let price: string

    const label = (value => {
        const p = parseInt(value, 10)
        return p.toLocaleString('ru')
    })(price)

    let open: boolean = true

    let filled: number = 0

    wishlistState.subscribe((state) => {
        const block = state[price]
        filled = block.reduce((total, value) => {
            return total + ((value && value.trim() !== '') ? 1 : 0)
        }, 0)
    })

    collapseState.subscribe((state) => {
        open = state
    })

    function onFieldChange(index: number, newValue: string) {
        const oldValue = $wishlistState[price][index]
        if (oldValue === newValue || (newValue === '' && oldValue === null)) {
            return
        }
        console.log(`Field ${price}: ${index} changed ("${oldValue}" -> "${newValue}")! Updating state...`)
        wishlistState.update((state) => {
            state[price][index] = newValue
            return state
        })
    }
</script>

<div class="field-block">
    <h6 class="price-header">
        <button class="collapse-button" on:click={ () => { open = !open} }>
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
    <ul class="{ open ? '' : 'collapsed'}">
        {#each {length: amount} as _, i }
            <li>
                <Field onChange={(newValue) => onFieldChange(i, newValue)} initialValue={$wishlistState[price][i]}></Field>
            </li>
        {/each}
    </ul>
</div>

<style>
    .field-block {
        margin-bottom: 20px;
    }

    .price-header {
        font-size: 16px;
        font-weight: normal;
        margin: 0;
    }

    .field-block ul {
        padding-left: 20px;
    }

    .field-block ul.collapsed {
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
