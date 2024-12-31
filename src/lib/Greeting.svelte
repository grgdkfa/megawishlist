<script lang="ts">
    import { resetState } from "./store/wishlist-state";
    let base: string

    function start() {
        const income = parseInt(base)
        if (isNaN(income)) {
            resetState(null)
        } else {
            resetState(income)
        }
    }
</script>

<main class="hello">
    <h1>Мегавишлист</h1>
    <p>Введите сумму вашего ежемесячного дохода в рублях:</p>
    <p><input type="text" class="income-field" bind:value={base} placeholder=""></p>
    <p>Это нужно для расчета ценовых категорий. Никакая введенная информация никуда не отправляется.</p>
    <p>Если вам всё равно некомфортно, можете оставить это поле пустым.</p>
    <p class="center">
        <button on:click={start}>Поехали!</button>
    </p>
</main>

<style>
    .hello {
        max-width: 500px;
        margin: 0 auto;
    }

    .income-field {
        font-size: 18px;
    }
</style>

