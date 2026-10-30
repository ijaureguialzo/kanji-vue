# Especificaciones del proyecto (SDD)

Este directorio contiene las especificaciones formales del producto **kanji-vue**, redactadas siguiendo el proceso
de **Spec Driven Development (SDD)**.

## Convención de carpetas

Cada especificación de funcionalidad se agrupa en una carpeta numerada y kebab-case:

```
specs/
└── NNN-kebab-case/
    ├── spec.md     # Requisitos, historias de usuario, criterios de aceptación
    ├── design.md   # Diseño técnico y decisiones de arquitectura
    └── tasks.md    # Tareas con estados (pendiente / en curso / hecho)
```

## Ciclo de vida de una especificación

1. **Propuesta**: se identifica el problema o la oportunidad de mejora.
2. **Draft**: se redactan `spec.md`, `design.md` y `tasks.md`.
3. **Aprobada**: se validan los requisitos y el diseño con las partes interesadas.
4. **Implementada**: se ejecutan las tareas de `tasks.md`.
5. **Verificada**: se comprueban los criterios de aceptación de la spec.

## Especificaciones actuales

| Carpeta | Especificación | Estado |
| --- | --- | --- |
| `001-producto` | Especificación del producto kanji-vue (visión, requisitos, diseño y tareas) | Implementada |

## Crear una nueva especificación

Para una nueva funcionalidad:

1. Crear la carpeta `specs/NNN-kebab-case/` con los tres documentos (`spec.md`, `design.md`, `tasks.md`).
2. Numeración secuencial (`NNN` = 002, 003, ...).
3. Completar el ciclo de vida de la especificación.
4. Actualizar este índice y el [`AGENTS.md`](../AGENTS.md).
