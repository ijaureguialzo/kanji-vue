# Tasks — kanji-vue (001-producto)

- **Estado:** Implementada
- **Fecha:** 2026-10-30
- **Especación:** [`spec.md`](./spec.md)

## Metodología

- Cada tarea referencia el requisito funcional (`FR-xxx`) o el criterio (`AC-xxx`) relacionado.
- El estado se actualiza al avanzar: `pendiente` → `en curso` → `hecha`.

## Tareas

### Fase 1 — Fundaciones (completada)

- [x] T-001 Configurar proyecto base (Vite, Vue 3, Bootstrap 5, Sass) — FR-/NFR-*
- [x] T-002 Integrar Pinia con persistencia (`pinia-plugin-persistedstate`) — FR-003
- [x] T-003 Configurar despliegue en GitHub Pages y Docker — NFR-002

### Fase 2 — Funcionalidad principal (completada)

- [x] T-010 Añadir secuencias de kanji N5 y N4 — FR-001
- [x] T-011 Implementar navegación con botones — FR-002, AC-002
- [x] T-012 Implementar navegación con teclado — FR-002, AC-002
- [x] T-013 Implementar saltos de ±10 — FR-002, AC-005
- [x] T-014 Aplicar clamping a los límites — FR-002, AC-004
- [x] T-015 Persistir posición — FR-003, AC-006
- [x] T-016 Añadir tema oscuro — FR-004
- [x] T-017 Añadir rotación de fuentes — FR-005
- [x] T-018 Añadir enlace al diccionario — FR-006
- [x] T-019 Visualizar arrays de datos — FR-001, AC-007
- [x] T-024 Añadir barra de navegación con selección de nivel (Todos/N5/N4) — FR-007
- [x] T-025 Añadir modo de visualización aleatoria — FR-008
- [x] T-026 Añadir niveles N3, N2 y N1 en los datos — FR-009
- [x] T-027 Integrar niveles N3, N2 y N1 en el store — FR-009
- [x] T-028 Completar los ficheros de datos N5 a N1 con la lista JLPT de referencia (hanabira.org), deduplicar entradas repetidas y renumerar `id` — FR-010, AC-013
- [x] T-029 Corregir la errata ニ → 二 en `kanji-n5.json` y poblar lecturas/trazos/significados de las entradas nuevas desde KANJIDIC2 — FR-010, AC-013
- [x] T-030 Alinear la documentación SDD (spec, design, AGENTS.md) con el estado real: niveles N5–N1, fuente de datos, `nivel`/`aleatorio` en el store y estados de la especificación — FR-007, FR-008, FR-010

### Fase 3 — Pulido y evolución (pendiente)

- [ ] T-020 Añadir repetición espaciada (SRS) — FR-001
- [ ] T-021 Añadir favoritos y/o historial de sesiones — FR-002
- [ ] T-022 Añadir pruebas automatizadas — NFR-001
- [ ] T-023 Evaluar refactor de layout/estado (acoplamiento App ↔ store)
