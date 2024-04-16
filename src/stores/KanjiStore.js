import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import datos from '@/data/kanji.json';

export const useKanjiStore = defineStore('KanjiStore', () => {

    const kanjis = ref(datos);
    const posicion = ref(0);

    const actual = computed(() => kanjis.value[posicion.value]);

    function avanzar(n = 1) {
        let nuevaPosicion = posicion.value + n;
        if (nuevaPosicion < kanjis.value.length - 1) {
            posicion.value = nuevaPosicion;
        } else {
            posicion.value = kanjis.value.length - 1;
        }
    }

    function retroceder(n = 1) {
        let nuevaPosicion = posicion.value - n;
        if (nuevaPosicion > 0) {
            posicion.value = nuevaPosicion;
        } else {
            posicion.value = 0;
        }
    }

    return {kanjis, posicion, actual, avanzar, retroceder}
}, {
    persist: {
        paths: ['posicion']
    },
})
