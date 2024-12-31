<script lang="ts">
    import { wishlistState } from "./lib/store/wishlist-state";
    import Greeting from "./lib/Greeting.svelte";
  import Wishlist from "./Wishlist.svelte";
</script>

{#if !$wishlistState}
    <Greeting></Greeting>
{:else}
    <Wishlist></Wishlist>
{/if}

<style>
</style>
