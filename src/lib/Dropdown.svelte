<script lang="ts">
    let isOpen = false
</script>

<div class="dropdown-wrapper">
    <button aria-label="Ещё" on:click={() => isOpen = !isOpen}>
        <svg class="burger-icon" width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18L20 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          <path d="M4 12L20 12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          <path d="M4 6L20 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    </button>
    {#if isOpen}
        <div class="dropdown-content">
            <slot></slot>
        </div>
    {/if}
</div>

<style>
    .dropdown-wrapper {
        position: relative;
    }

    .dropdown-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 5px;
        background-color: var(--bg-color);
        border-radius: 8px;
        border: 1px solid var(--border-color);
        padding: 0.5em;
    }

@media (prefers-color-scheme: light) {
  .burger-icon path {
    stroke: #000;
  }
}
</style>