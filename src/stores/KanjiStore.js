import { defineStore } from 'pinia';
import { ref } from 'vue';

import datos from '@/data/kanji.json';

export const useKanjiStore = defineStore('KanjiStore', () => {

    const kanjis = ref(datos);
    const posicion = ref(0);

    function actual() {
        return kanjis.value[posicion.value];
    }

    function siguiente() {
        if (posicion.value < kanjis.value.length - 1) {
            posicion.value++;
        }
    }

    function anterior() {
        if (posicion.value > 0) {
            posicion.value--;
        }
    }

    return {posicion, actual, siguiente, anterior}
}, {
    persist: true,
})
