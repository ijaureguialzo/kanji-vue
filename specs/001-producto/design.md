# Design 001 — Diseño técnico: kanji-vue

- **Estado:** Draft
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
(`src/stores/KanjiStore.js`).

**Razón:** Centraliza el estado (`kanjis`, `posicion`) y las acciones (`avanzar`, `retroceder`) y permite persistir
solo lo necesario.

### D-3 — Datos locales en JSON

**Decisión:** Los conjuntos de kanji se almacenarán en `src/data/*.json`.

**Razón:** Facilita la incorporación de niveles sin cambios de código.

### D-4 — Persistencia limitada a la posición

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
      │    └── actual: Computed (con clamping)
      │         └── KanjiCard (:tarjeta="actual")
      │              ├── VisualizarArray (:datos="tarjeta.kun")
      │              ├── VisualizarArray (:datos="tarjeta.on")
      │              └── VisualizarArray (:datos="tarjeta.significados")
      └── controles de navegación
           └── KanjiStore (avanzar/retroceder)
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

### 4.3. Invariantes

- `0 <= posicion <= kanjis.length - 1` en todo momento.
- Las acciones de avance/retroceso aplican clamping.

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
