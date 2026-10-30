# Design 001 — Diseño técnico: kanji-vue

- **Estado:** Implementada
- **Fecha:** 2026-10-30
- **Especación:** [`spec.md`](./spec.md)

## 1. Contexto y objetivos

### 1.1. Contexto

La aplicación es una SPA de aprendizaje de kanji con persistencia local de la posición. No existe backend: los datos
de kanji viven en JSON locales y el estado de navegación se persiste con `localStorage`.

### 1.2. Objetivos del diseño

- Mantener una arquitectura simple y predecible.
- Permitir extender la secuencia de kanji sin cambios estructurales.
- Preservar la persistencia y los límites de navegación.

## 2. Decisiones de diseño

### D-1 — Arquitectura de una sola página (SPA)

**Decisión:** La aplicación será una SPA sin routing ni backend.

**Razón:** El dominio no requiere navegación entre vistas distintas; la vista única muestra la tarjeta del kanji
actual.

### D-2 — Estado centralizado en Pinia (setup store)

**Decisión:** Toda la lógica de secuencia y navegación residirá en un Pinia setup store
(`src/stores/KanjiStore.js`), que expone `kanjis`, `posicion`, `nivel`, `aleatorio` y las acciones
`avanzar(n)`, `retroceder(n)`, `seleccionarNivel(nivel)` y `alternarAleatorio()`.

**Razón:** Centraliza el estado (`kanjis`, `posicion`, `nivel`, `aleatorio`) y las acciones y permite persistir
solo lo necesario.

### D-3 — Datos locales en JSON

**Decisión:** Los conjuntos de kanji se almacenarán en `src/data/*.json` (uno por nivel: `kanji-n5.json` a
`kanji-n1.json`).

**Razón:** Facilita la incorporación de niveles sin cambios de código.

### D-4 — Fuente de los datos de kanji

**Decisión:** La lista de referencia es la del JLPT publicada en hanabira.org/kanji (79 kanji de N5, 166 de N4,
367 de N3, 367 de N2 y 1.232 de N1; 2.211 en total). Cada kanji de esa lista está presente en el nivel que la
página le asigna, salvo que ya figurase en un fichero anterior (p. ej. 会社 en N5), en cuyo caso no se duplica. Los
kanji heredados de versiones previas que no aparecen en la referencia (分 y 挨) se conservan, por lo que los
ficheros contienen 2.213 entradas (110 N5, 201 N4, 335 N3, 346 N2, 1.221 N1). Los datos de cada kanji (lecturas
`on`/`kun`, trazos y significados en español) se toman del diccionario KANJIDIC2 (EDRDG).

**Razón:** Garantiza que las listas oficiales de cada nivel estén íntegras en la aplicación y que lecturas, trazos
y significados sean correctos y coherentes, sin duplicar kanji entre niveles.

### D-5 — Persistencia limitada a la posición

**Decisión:** Solo se persistirá `posicion` (`paths: ['posicion']`).

**Razón:** Evita guardar datos personales y mantiene el estado mínimo.

## 3. Arquitectura

### 3.1. Diagrama de componentes (flujo)

```
main.js
 └── App.vue
      ├── KanjiStore (useKanjiStore)
      │    ├── kanjis: Ref<Array>
      │    ├── posicion: Ref<number>
      │    ├── nivel: Ref<'todos' | 'n5'…'n1'>
      │    ├── aleatorio: Ref<boolean>
      │    └── actual: Computed (filtrado por nivel, clamping y modo aleatorio)
      │         └── KanjiCard (:tarjeta="actual")
      │              ├── VisualizarArray (:datos="tarjeta.kun")
      │              ├── VisualizarArray (:datos="tarjeta.on")
      │              └── VisualizarArray (:datos="tarjeta.significados")
      └── controles de navegación
           └── KanjiStore (avanzar/retroceder/seleccionarNivel/alternarAleatorio)
```

### 3.2. Responsabilidades

| Componente | Responsabilidad |
| --- | --- |
| `main.js` | Bootstrap, registro de Pinia + persistencia, montaje. |
| `stores/KanjiStore.js` | Secuencia, posición, clamping, acciones. |
| `App.vue` | Controles de navegación y render de la tarjeta. |
| `components/KanjiCard.vue` | Presentación de la tarjeta. |
| `components/VisualizarArray.vue` | Presentación de arrays con separador. |
| `data/*.json` | Datos de kanji por nivel. |

## 4. Modelo de datos

### 4.1. Objeto de kanji

```json
{
    "id": 1,
    "kanji": "山",
    "kun": ["やま"],
    "on": ["サン"],
    "trazos": 3,
    "notas": "El primer trazo es el vertical central",
    "significados": ["Montaña"]
}
```

### 4.2. Estado

- `kanjis`: array ordenado de objetos.
- `posicion`: índice numérico actual.
- `nivel`: `'todos'` o nivel (`'n5'`…`'n1'`); la secuencia visible se filtra por nivel.
- `aleatorio`: booleano que activa la selección aleatoria al avanzar/retroceder.

### 4.3. Invariantes

- `0 <= posicion <= kanjisDelNivel.length - 1` en todo momento.
- Las acciones de avance/retroceso aplican clamping.
- No hay kanji duplicados dentro de un fichero ni entre ficheros.
- Los `id` son secuenciales en la secuencia combinada (N5 → N4 → N3 → N2 → N1).
- Cada entrada tiene `trazos` > 0 y al menos un significado.
- `kun`/`on` pueden estar vacíos (el kanji no tiene esa lectura autónoma); la UI no renderiza bloques vacíos.

## 5. Flujo de aplicación

1. El usuario pulsa un control o pulsa una tecla.
2. El store calcula la nueva posición (con clamping y saltos).
3. El computed `actual` devuelve la tarjeta correspondiente.
4. La UI re-renderiza la tarjeta.

## 6. Despliegue

- Docker Compose para desarrollo local.
- GitHub Actions → GitHub Pages para producción.

## 7. Riesgos y deuda técnica

- Falta de tests automatizados (ver tasks).
- Acoplamiento inicial entre layout y lógica de navegación (a evaluar en futuras refactors).
- Los 2.213 kanji incrustados en el bundle elevan su tamaño (~458 KB JS / ~125 KB gzip); de cara al futuro,
evaluar cargar los niveles bajo demanda.
