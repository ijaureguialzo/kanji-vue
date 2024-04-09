<script setup>
import KanjiCard from "@/components/KanjiCard.vue";
import { useKanjiStore } from '@/stores/KanjiStore.js';

const kanjiStore = useKanjiStore();
</script>

<template>
    <div class="d-flex flex-grow-1 col-12 col-sm-8 col-md-6 col-lg-4 justify-content-between align-items-center">
        <button title="Anterior" class="btn btn-primary boton text-light flex-shrink-0 fs-3"
                @click="kanjiStore.anterior()">
            <i class="bi bi-chevron-left"></i>
        </button>
        <KanjiCard :tarjeta="kanjiStore.actual()"/>
        <button title="Siguiente" class="btn btn-primary boton text-light flex-shrink-0 fs-3"
                @click="kanjiStore.siguiente()">
            <i class="bi bi-chevron-right"></i>
        </button>
    </div>
</template>

<style scoped>
.boton {
    height: 120px;
    width: 60px;
}
</style>
