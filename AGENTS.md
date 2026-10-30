# AGENTS.md

> **Punto de acceso central para agentes de IA** que trabajan en el repositorio `kanji-vue`.

Este documento define el contexto mínimo que todo agente de IA debe conocer antes de leer código, implementar
cualquier funcionalidad o proponer cambios. Las especificaciones formales del producto viven en el directorio
[`specs/`](./specs/README.md) y deben consultarse siempre antes de iniciar trabajo nuevo.

## Índice

1. [Contexto del proyecto](#contexto-del-proyecto)
2. [Stack tecnológico](#stack-tecnológico)
3. [Comandos](#comandos)
4. [Estructura del código](#estructura-del-código)
5. [Arquitectura](#arquitectura)
6. [Especificaciones SDD](#especificaciones-sdd)
7. [Convenciones de código](#convenciones-de-código)
8. [Git y commits](#git-y-commits)
9. [Definition of Done](#definition-of-done)

---

## Contexto del proyecto

**kanji-vue** es una aplicación web de aprendizaje de kanji desarrollada con **Vue 3**. Muestra tarjetas de kanji
de los niveles educativos japoneses N5 a N1, acompañadas de su carácter, sus
lecturas (kun y on), el número de trazos, las notas y los significados. El usuario navega secuencialmente por la
secuencia de kanji mediante botones o mediante atajos de teclado, con persistencia de la posición en el dispositivo.

La aplicación se distribuye como sitio estático en GitHub Pages y su ciclo de vida local se apoya en Docker
(Compose) y en Vite.

## Stack tecnológico

- **Framework UI**: Vue 3 (Composition API, `<script setup>`).
- **Construcción**: Vite 8 + `@vitejs/plugin-vue`.
- **Estado**: Pinia 3 + `@pinia-plugin-persistedstate`.
- **UI**: Bootstrap 5.3 + Bootstrap Icons.
- **Atajos de teclado**: `vue3-keypress`.
- **Estilos**: Sass (`sass-embedded`).
- **Datos**: archivos JSON locales en `src/data/`.
- **Distribución**: Docker + GitHub Actions → GitHub Pages.

## Comandos

| Comando | Acción |
| --- | --- |
| `make build` | Construye la imagen Docker |
| `make install` | Instala dependencias dentro del contenedor |
| `make start` | Levanta el contenedor (`http://localhost:5173`) |
| `make stop` | Detiene el contenedor |
| `make restart` | Reinicia el contenedor |
| `make logs` | Muestra los logs del contenedor |
| `make clean` | Detiene y elimina volúmenes |
| `make workspace` | Abre un shell dentro del contenedor |
| `make update` | Actualiza dependencias y genera un commit |
| `npm run dev` | Servidor de desarrollo de Vite |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Sirve el build de producción |

## Estructura del código

```
src/
├── App.vue                  # Layout y barra de navegación
├── main.js                  # Bootstrap de la aplicación
├── assets/                  # Estilos globales, tema oscuro, restricciones
├── components/
│   ├── KanjiCard.vue        # Tarjeta de kanji
│   └── VisualizarArray.vue  # Visualización de arrays con separador
├── data/
│   ├── kanji-n5.json        # Secuencia N5 (110 kanji)
│   ├── kanji-n4.json        # Secuencia N4 (201 kanji)
│   ├── kanji-n3.json        # Secuencia N3 (335 kanji)
│   ├── kanji-n2.json        # Secuencia N2 (346 kanji)
│   └── kanji-n1.json        # Secuencia N1 (1.221 kanji)
└── stores/
    └── KanjiStore.js        # Pinia setup store

public/
├── favicon.ico
└── YuKyo-Medium.woff2      # Fuente de kanji

specs/
├── README.md                # Índice y ciclo de vida SDD
└── NNN-kebab-case/          # Especificaciones por funcionalidad

docs/                        # (reservado)
```

## Arquitectura

Flujo de la funcionalidad principal:

```
App.vue
 └── KanjiStore (Pinia: kanjis, posicion, nivel, aleatorio, actual, avanzar, retroceder)
      └── KanjiCard (:tarjeta="actual")
           └── VisualizarArray (:datos="...")
```

- `src/main.js`: crea la aplicación, registra Pinia con `pinia-plugin-persistedstate` y monta `App.vue`.
- `src/stores/KanjiStore.js`: Pinia **setup store** que expone `kanjis`, `posicion`, `nivel`, `aleatorio`,
  `actual` y las acciones `avanzar(n)` / `retroceder(n)` / `seleccionarNivel(nivel)` /
  `alternarAleatorio()`, con clamping a los límites de la secuencia filtrada por nivel.
- `src/App.vue`: compone el layout y los botones de navegación, delegando en el store.
- `src/components/KanjiCard.vue`: recibe la tarjeta como prop (`tarjeta`) y renderiza los datos.
- `src/components/VisualizarArray.vue`: recibe un array y lo muestra unificado con separador ` · `.

## Especificaciones SDD

- El proceso completo de desarrollo guiado por especificaciones se documenta en [`specs/README.md`](./specs/README.md).
- El estado actual del producto está descrito en [`specs/001-producto/`](./specs/001-producto/).
- **Antes de implementar una funcionalidad**: leer la spec activa y su design/tasks.
- **Durante el desarrollo**: marcar tareas como completadas en `tasks.md`.
- **Al cerrar una funcionalidad**: actualizar la spec/design si procede y generar el commit correspondiente.

## Convenciones de código

- **Vue**: Composition API obligatoria con `<script setup>`.
- **Pinia**: usar *setup stores* (`defineStore('X', () => {...}, { persist: {... } })`).
- **UI**: componentes y utilidades de Bootstrap 5; iconos con Bootstrap Icons.
- **Idioma**: español en textos visibles de la interfaz y en commits; inglés/mantenimiento en identificadores técnicos.
- **Datos**: los kanji se modelan como objetos JSON con claves `id`, `kanji`, `kun`, `on`, `trazos`, `notas` y `significados`.
- **Formato**: 4 espacios de indentación (2 en JSON/YAML), finales de línea y sin espacios finales (ver `.editorconfig`).

## Git y commits

### Conventional Commits

- Formato: `<type>: <descripción en imperativo, sin punto final>`.
- Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`.
- Cambios breaking: `feat!:` (o footer `BREAKING CHANGE:`).

Ejemplos:

```text
feat: añadir avance rápido de diez kanji
fix: corregir límites de navegación en el store
docs: actualizar README del proyecto
```

### Co-autoría del LLM

> **Requisito obligatorio**: todo commit que concluya una funcionalidad (o tarea completada según la spec SDD) debe
> incluir el **trailer de co-autoría del LLM** que está realizando el trabajo, después del cuerpo del commit:

```text
Co-authored-by: <Nombre del modelo> <correo-noreply>
```

Ejemplos:

- Claude: `Co-authored-by: Claude <noreply@anthropic.com>`
- GPT: `Co-authored-by: GPT <noreply.openai.com>`
- Gemini: `Co-authored-by: Gemini <noreply@google.com>`
- Flint (modelo local en uso): `Co-authored-by: Flint <noreply@lmstudio.ai>`
- Otros modelos: sustituir por el correo noreply correspondiente a la instancia/proveedor.

Ejemplo completo:

```text
feat: añadir avance rápido de diez kanji

Se permite saltar de diez posiciones mediante el botón de doble chevron.

Co-authored-by: Flint <noreply@lmstudio.ai>
```

## Definition of Done

Antes de dar por finalizada una funcionalidad, el agente debe:

- [ ] Haber leído la spec activa (`specs/NNN-kebab-case/`) y sus criterios de aceptación.
- [ ] Haber implementado los cambios respetando las convenciones.
- [ ] Haber actualizado la spec/design/tasks si el alcance cambió.
- [ ] Haber verificado que `npm run build` pasa sin errores.
- [ ] Haber generado el commit con Conventional Commits y con el trailer de co-autoría del LLM.

---

¿Trabajas en una funcionalidad nueva? Sigue el flujo SDD en [`specs/README.md`](./specs/README.md).
