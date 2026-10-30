import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import n5 from '@/data/kanji-n5.json';
import n4 from '@/data/kanji-n4.json';

const datos = n5.concat(n4);

export const useKanjiStore = defineStore('KanjiStore', () => {

    const kanjis = ref(datos);
    const posicion = ref(0);
    const nivel = ref('todos');
    const aleatorio = ref(false);

    const niveles = ['todos', 'n5', 'n4'];

    const kanjisDelNivel = computed(() => {
        if (nivel.value === 'n5') {
            return kanjis.value.filter((_, index) => index < n5.length);
        } else if (nivel.value === 'n4') {
            return kanjis.value.filter((_, index) => index >= n5.length);
        }
        return kanjis.value;
    });

    const actual = computed(() => {
        const lista = kanjisDelNivel.value;
        let indice = posicion.value;
        if (indice < 0) {
            indice = 0;
        } else if (indice >= lista.length) {
            indice = lista.length - 1;
        }
        if (aleatorio.value) {
            indice = Math.floor(Math.random() * lista.length);
        }
        return lista[indice];
    });

    function avanzar(n = 1) {
        const lista = kanjisDelNivel.value;
        let nuevaPosicion = posicion.value + n;
        if (aleatorio.value) {
            nuevaPosicion = Math.floor(Math.random() * lista.length);
        }
        if (nuevaPosicion < lista.length - 1) {
            posicion.value = nuevaPosicion;
        } else {
            posicion.value = lista.length - 1;
        }
    }

    function retroceder(n = 1) {
        const lista = kanjisDelNivel.value;
        let nuevaPosicion = posicion.value - n;
        if (aleatorio.value) {
            nuevaPosicion = Math.floor(Math.random() * lista.length);
        }
        if (nuevaPosicion > 0) {
            posicion.value = nuevaPosicion;
        } else {
            posicion.value = 0;
        }
    }

    function seleccionarNivel(nivelSeleccionado) {
        nivel.value = nivelSeleccionado;
        posicion.value = 0;
    }

    function alternarAleatorio() {
        aleatorio.value = !aleatorio.value;
    }

    return { kanjis, posicion, actual, avanzar, retroceder, nivel, niveles, seleccionarNivel, alternarAleatorio, aleatorio }
}, {
    persist: {
        paths: ['posicion']
    },
})
