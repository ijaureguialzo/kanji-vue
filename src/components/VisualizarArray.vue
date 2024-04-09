<script setup>
defineProps({
    datos: Array,
})
</script>

<template>
<span v-for="(dato, index) of datos" :key="index">
    <span v-if="index > 0"> · </span>{{ dato }}
</span>
</template>

<style scoped>
</style>
