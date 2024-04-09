<script setup>
defineProps({
    datos: Array,
})
</script>

<template>
<span v-for="(dato, index) of datos" :key="index">
    <span class="mx-2" v-if="index > 0">·</span>
    <span>{{ dato }}</span>
</span>
</template>

<style scoped>
</style>
