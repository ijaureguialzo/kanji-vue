import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import n5 from '@/data/kanji-n5.json';
import n4 from '@/data/kanji-n4.json';

const datos = n5.concat(n4);

export const useKanjiStore = defineStore('KanjiStore', () => {

    const kanjis = ref(datos);
    const posicion = ref(0);

    const actual = computed(() => {
        if (posicion.value < 0) {
            posicion.value = 0;
        } else if (posicion.value >= kanjis.value.length) {
            posicion.value = kanjis.value.length - 1;
        }
        return kanjis.value[posicion.value];
    });

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

    return { kanjis, posicion, actual, avanzar, retroceder }
}, {
    persist: {
        paths: ['posicion']
    },
})
