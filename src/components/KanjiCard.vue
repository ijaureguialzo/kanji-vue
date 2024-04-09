<script setup>
defineProps({
    tarjeta: Object,
})
</script>

<template>
    <div class="d-flex flex-column justify-content-center align-items-center px-3">
        <p class="circulo bg-primary-subtle text-dark-emphasis">{{ tarjeta.id }}</p>
        <p class="japones" style="font-size: 1000%;">{{ tarjeta.kanji }}</p>
        <p class="fs-3">{{ tarjeta.kun }}</p>
        <p class="fs-3">{{ tarjeta.on }}</p>
        <p class="circulo bg-secondary-subtle text-dark-emphasis">{{ tarjeta.trazos }}</p>
        <p class="text-center small text-dark-emphasis">{{ tarjeta.notas }}</p>
        <p class="fs-3">{{ tarjeta.significados }}</p>
    </div>
</template>

<style scoped>
@font-face {
    font-family: kyokasho;
    src: url("@/assets/kyokasho.ttc");
}

.japones {
    font-family: kyokasho, YuKyokasho, cursive;
    line-height: 100%;
}

.circulo {
    border: 0;
    border-radius: 30px;
    height: 60px;
    width: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
}
</style>
