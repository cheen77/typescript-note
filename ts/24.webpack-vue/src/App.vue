<template>
    <div>{{ x }}</div>
    <button @click="add">+</button>
</template>

<script setup lang = "ts">
import { ref } from "vue";
import axios from "axios";
let x = ref<number>(0)
const add = () => {
    x.value++
}

axios.getUri
</script>

<!-- <style>
body {
    background-color: pink;
}
</style> -->

<!-- <style lang="less">
@red: pink;

html,
body {
    background-color: @red;
}
</style> -->

<style lang="scss">
$red: pink;

html,
body {
    background-color: $red;
}
</style>