import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import n5 from '@/data/kanji-n5.json';
import n4 from '@/data/kanji-n4.json';
import n3 from '@/data/kanji-n3.json';
import n2 from '@/data/kanji-n2.json';
import n1 from '@/data/kanji-n1.json';

const datos = n5.concat(n4, n3, n2, n1);

export const useKanjiStore = defineStore('KanjiStore', () => {

    const kanjis = ref(datos);
    const posicion = ref(0);
    const nivel = ref('todos');
    const aleatorio = ref(false);

    const niveles = ['todos', 'n5', 'n4', 'n3', 'n2', 'n1'];

    const kanjisDelNivel = computed(() => {
        const nivelActual = nivel.value;
        if (nivelActual === 'todos') {
            return kanjis.value;
        }
        let inicio = 0;
        let fin = 0;
        if (nivelActual === 'n5') {
            inicio = 0;
            fin = n5.length;
        } else if (nivelActual === 'n4') {
            inicio = n5.length;
            fin = n5.length + n4.length;
        } else if (nivelActual === 'n3') {
            inicio = n5.length + n4.length;
            fin = n5.length + n4.length + n3.length;
        } else if (nivelActual === 'n2') {
            inicio = n5.length + n4.length + n3.length;
            fin = n5.length + n4.length + n3.length + n2.length;
        } else if (nivelActual === 'n1') {
            inicio = n5.length + n4.length + n3.length + n2.length;
            fin = datos.length;
        }
        return kanjis.value.slice(inicio, fin);
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
