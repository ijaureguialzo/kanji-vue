<script setup>
import KanjiCard from "@/components/KanjiCard.vue";
import { useKanjiStore } from '@/stores/KanjiStore.js';

const kanjiStore = useKanjiStore();
</script>

<template>
    <div class="d-flex flex-grow-1 col-12 col-sm-8 justify-content-between align-items-center">
        <button class="btn btn-primary boton text-light flex-shrink-0" @click="kanjiStore.anterior()">&lt;</button>
        <KanjiCard :tarjeta="kanjiStore.actual()"/>
        <button class="btn btn-primary boton text-light flex-shrink-0" @click="kanjiStore.siguiente()">&gt;</button>
    </div>
</template>

<style scoped>
.boton {
    height: 60px;
    width: 60px;
}
</style>
