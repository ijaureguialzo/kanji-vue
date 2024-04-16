<script setup>
import KanjiCard from "@/components/KanjiCard.vue";
import { useKanjiStore } from '@/stores/KanjiStore.js';
import { useKeypress } from "vue3-keypress";

const kanjiStore = useKanjiStore();

useKeypress({
    keyEvent: "keypress",
    keyBinds: [
        {
            keyCode: "space",
            modifiers: ["shiftKey"],
            success: kanjiStore.retroceder,
        },
        {
            keyCode: "space",
            success: kanjiStore.avanzar,
        },
    ]
})
</script>

<template>
    <div class="d-flex flex-grow-1 col-12 col-sm-8 col-md-6 col-lg-4 justify-content-between align-items-center">
        <div class="d-flex flex-column">
            <button title="Anterior" class="btn btn-primary rectangulo text-light flex-shrink-0 fs-3 mb-3"
                    @click="kanjiStore.retroceder()">
                <i class="bi bi-chevron-left"></i>
            </button>
            <button title="Anterior (-10)" class="btn btn-light cuadrado text-secondary flex-shrink-0 fs-3"
                    @click="kanjiStore.retroceder(10)">
                <i class="bi bi-chevron-double-left"></i>
            </button>
        </div>
        <KanjiCard :tarjeta="kanjiStore.actual"/>
        <div class="d-flex flex-column">
            <button title="Siguiente" class="btn btn-primary rectangulo text-light flex-shrink-0 fs-3 mb-3"
                    @click="kanjiStore.avanzar()">
                <i class="bi bi-chevron-right"></i>
            </button>
            <button title="Siguiente (+10)" class="btn btn-light cuadrado text-secondary flex-shrink-0 fs-3"
                    @click="kanjiStore.avanzar(10)">
                <i class="bi bi-chevron-double-right"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
.rectangulo {
    height: 120px;
    width: 60px;
}

.cuadrado {
    height: 60px;
    width: 60px;
}
</style>
