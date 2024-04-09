<script setup>
import VisualizarArray from "@/components/VisualizarArray.vue";

defineProps({
    tarjeta: Object,
})
</script>

<template>
    <div class="d-flex flex-column justify-content-center align-items-center px-3 text-center">
        <p title="Número" class="circulo bg-primary-subtle text-dark-emphasis">{{ tarjeta.id }}</p>
        <p title="Kanji" class="japones" style="font-size: 1000%;">
            <a class="link-dark link-underline-opacity-0 link-opacity-75-hover" target="_blank"
               :href="`https://jisho.org/search/${ tarjeta.kanji }%20%23kanji`">
                {{ tarjeta.kanji }}
            </a>
        </p>
        <p v-if="tarjeta.kun.length > 0" title="Kun" class="fs-3">
            <VisualizarArray :datos="tarjeta.kun"/>
        </p>
        <p v-if="tarjeta.on.length > 0" title="On" class="fs-3">
            <VisualizarArray :datos="tarjeta.on"/>
        </p>
        <p title="Trazos" class="circulo bg-secondary-subtle text-dark-emphasis">{{ tarjeta.trazos }}</p>
        <p v-if="tarjeta.notas" class="small text-dark-emphasis">{{ tarjeta.notas }}</p>
        <p class="fs-3">
            <VisualizarArray :datos="tarjeta.significados"/>
        </p>
    </div>
</template>

<style scoped>
@font-face {
    font-family: kyokasho;
    src: url("/Kyokasho.ttc");
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
