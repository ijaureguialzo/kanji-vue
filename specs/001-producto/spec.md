# Spec 001 — Especificación del producto: kanji-vue

- **Estado:** Draft
- **Fecha:** 2026-10-30
- **Repositorio:** `kanji-vue`

## 1. Introducción

### 1.1. Descripción

**kanji-vue** es una aplicación web de aprendizaje de kanji construida con Vue 3. Su funcionalidad principal es
mostrar tarjetas de kanji —del nivel educativo japonés N5 y de los niveles superiores (N4)— acompañadas del carácter,
sus lecturas (kun y on), el número de trazos, las notas y los significados.

El usuario avanza secuencialmente por la secuencia de kanji mediante botones de navegación y mediante atajos de
teclado, con persistencia de la posición entre sesiones.

### 1.2. Problema

Los estudiantes de japonés necesitan práctica repetitiva y progresiva con kanji, pero las herramientas existentes no
ofrecen una experiencia mínima, rápida y centrada en el aprendizaje diario (tarjetas con lecturas, trazos, notas y
significados).

### 1.3. Solución propuesta

Una SPA ligera que carga secuencias de kanji desde JSON locales y presenta la tarjeta del kanji actual con
navegación (siguiente/anterior, ±10) y persistencia de posición.

## 2. Objetivos

- Facilitar el aprendizaje diario de kanji con una interfaz mínima y rápida.
- Mantener la posición de aprendizaje persistente.
- Ser una aplicación autocontenida (sin backend) desplegable como sitio estático.

## 3. Alcance

### 3.1. Dentro del alcance

- Visualización de tarjetas de kanji con datos completos.
- Navegación secuencial y por saltos.
- Persistencia de la posición.
- Preferencias de tema.
- Referencia al diccionario online.

### 3.2. Fuera del alcance

- Backend, autenticación o sincronización entre dispositivos.
- Sistema de repetición espaciada (SRS) o algoritmos de recordatorio.
- Tests automatizados (todavía).

## 4. Usuarios y casos de uso

### 4.1. Perfil del usuario

Estudiante de japonés que practica kanji de forma autónoma, con acceso a un dispositivo con navegador moderno.

### 4.2. Historias de usuario

- **US-1**: Como estudiante, quiero ver el kanji actual con sus lecturas, trazos y significados para practicarlo.
- **US-2**: Como estudiante, quiero avanzar o retroceder con botones o teclado para recorrer la secuencia.
- **US-3**: Como estudiante, quiero saltar de diez en diez para repasar bloques.
- **US-4**: Como estudiante, quiero que mi posición persista tras cerrar la aplicación.

## 5. Requisitos

### 5.1. Requisitos funcionales

#### FR-001 — Visualización de la tarjeta del kanji (Prioridad: Must, Estado: Implementado)

La aplicación SHALL mostrar la tarjeta del kanji actual con, como mínimo:

- Identificador (`id`) y carácter (`kanji`).
- Lecturas `kun` y `on` cuando existan.
- Número de `trazos`.
- `notas` cuando no estén vacías.
- `significados`.

#### FR-002 — Navegación entre tarjetas (Prioridad: Must, Estado: Implementado)

La aplicación SHALL permitir:

- Avanzar/retroceder de uno en uno mediante botones y teclado.
- Saltar de ±10 posiciones mediante botones.
- Mantener la posición dentro de los límites `[0, longitud - 1]`.

#### FR-003 — Persistencia de la posición (Prioridad: Must, Estado: Implementado)

La posición actual SHALL persistirse en el almacenamiento local del navegador mediante Pinia persistido, y SHALL
restaurarse al arrancar.

#### FR-004 — Tema visual (Prioridad: Must, Estado: Implementado)

La aplicación SHALL respetar la preferencia de tema claro/oscuro del sistema o del usuario.

#### FR-005 — Rotación de fuentes (Prioridad: Should, Estado: Implementado)

La aplicación SHALL permitir rotar entre fuentes del kanji.

#### FR-006 — Referencia al diccionario (Prioridad: Should, Estado: Implementado)

La aplicación SHALL enlazar cada kanji con el buscador del diccionario online (jisho.org).

#### FR-007 — Selección de nivel mediante barra de navegación (Prioridad: Must, Estado: Implementado)

La aplicación SHALL permitir seleccionar el nivel de kanji a visualizar mediante una barra de navegación
decreciente ubicada en la esquina superior derecha, con las opciones "Todos", "N5", "N4", "N3", "N2" y "N1".

#### FR-008 — Visualización aleatoria (Prioridad: Must, Estado: Implementado)

La aplicación SHALL permitir activar/desactivar mediante un botón de la misma barra de navegación la
visualización de kanji al azar (no en orden). Cuando está activado, la navegación (`avanzar`/`retroceder`)
deberá seleccionar un kanji al azar de la secuencia filtrada por nivel.

#### FR-009 — Niveles N3, N2 y N1 (Prioridad: Must, Estado: Implementado)

La aplicación SHALL incluir los niveles educativos japoneses N3, N2 y N1 como parte de la secuencia de kanji,
con ficheros de datos locales (`src/data/kanji-n3.json`, `src/data/kanji-n2.json`, `src/data/kanji-n1.json`)
completos en los campos de información (`id`, `kanji`, `kun`, `on`, `trazos`, `notas`, `significados`).

#### FR-010 — Listas de kanji completas por nivel (Prioridad: Must, Estado: Implementado)

Los ficheros de datos SHALL contener la lista completa de kanji de cada nivel JLPT (N5, N4, N3, N2 y N1) según
la lista de referencia, sin duplicados dentro de un nivel ni entre ficheros, con `id` secuenciales en la
secuencia combinada y todos los campos de información poblados (lecturas, trazos y significados en español).

### 5.2. Requisitos no funcionales

#### NFR-001 — Rendimiento

La aplicación SHALL cargarse sin backend y renderizarse de forma inmediata con datos locales en JSON.

#### NFR-002 — Compatibilidad

La aplicación SHALL funcionar en navegadores modernos y desplegarse como sitio estático.

#### NFR-003 — Responsividad

La interfaz SHALL adaptarse a distintos tamaños de pantalla mediante el sistema de rejilla de Bootstrap.

#### NFR-004 — Privacidad

La aplicación SHALL almacenar únicamente la posición del usuario (sin datos personales).

## 6. Criterios de aceptación

### AC-001 — Visualización inicial

- **Dado** que la aplicación arranca, **Cuando** se monta el store, **Then** la posición inicial es la primera del N5
  y se muestra su kanji.

### AC-002 — Avance

- **Dado** un kanji visible, **Cuando** se pulsa "Siguiente" (botón o teclado), **Then** se muestra el kanji siguiente.

### AC-003 — Retroceso

- **Dado** un kanji visible, **Cuando** se pulsa "Anterior" (botón o teclado), **Then** se muestra el kanji anterior.

### AC-004 — Límites

- **Dado** que se está en el primer kanji, **Cuando** se pulsa "Anterior", **Then** la posición permanece en el primer
  kanji.
- **Dado** que se está en el último kanji, **Cuando** se pulsa "Siguiente", **Then** la posición permanece en el último
  kanji.

### AC-005 — Saltos

- **Dado** un usuario, **Cuando** se pulsa un salto de ±10, **Then** la posición cambia en bloques de diez con los
  mismos límites aplicados.

### AC-006 — Persistencia

- **Dado** una posición previamente guardada, **Cuando** la aplicación se reinicia, **Then** se restaura la posición y
  se muestra el kanji correspondiente.

### AC-007 — Datos ausentes

- **Dado** un kanji sin lecturas o con notas vacías, **Cuando** se renderiza la tarjeta, **Then** esos bloques no se
  muestran.

### AC-008 — Selección de nivel

- **Dado** que el usuario selecciona un nivel ("Todos", "N5" o "N4") en la barra de navegación, **Cuando** se muestra
  la secuencia, **Then** la secuencia mostrada corresponde al nivel seleccionado y la posición se reinicia en su
  inicio.

### AC-009 — Modo aleatorio

- **Dado** que el modo aleatorio está activado, **Cuando** el usuario avanza o retrocede, **Then** se muestra un
  kanji al azar de la secuencia del nivel actual.

### AC-010 — Toggle del modo aleatorio

- **Dado** que el modo aleatorio está desactivado (por defecto), **Cuando** el usuario activa el toggle, **Then** la
  navegación pasa a seleccionar kanji al azar.
- **Dado** que el modo aleatorio está activo, **Cuando** el usuario desactiva el toggle, **Then** la navegación
  vuelve a la secuencia ordenada.

### AC-011 — Límite en modo aleatorio

- **Dado** que el modo aleatorio está activo, **Cuando** la selección aleatoria supera los límites de la secuencia,
  **Then** se respeta el clamping de posición.

### AC-012 — Niveles superiores

- **Dado** que el usuario selecciona un nivel superior (N3, N2 o N1) en la barra de navegación, **Cuando** se muestra
  la secuencia, **Then** la secuencia mostrada corresponde al nivel seleccionado y la posición se reinicia en su
  inicio.

### AC-013 — Completitud de datos

- **Dado** un nivel JLPT, **Cuando** se visualiza su secuencia, **Then** cada kanji muestra lecturas, trazos y
  significados, sin entradas duplicadas y con `id` secuenciales en la secuencia combinada.

## 7. Restricciones

- No se permite backend ni bases de datos en esta fase.
- El modelo de datos SHALL mantener las claves existentes en los JSON de `src/data/`.

## 8. Futuras consideraciones

- Añadir repetición espaciada (SRS).
- Añadir favoritos y/o historial.
- Añadir pruebas automatizadas.
