<template></template>
<script lang="ts" setup>
import { useSystemStore } from "@/store/modules/system";
import { onMounted } from "vue";
const systemStore = useSystemStore();
onMounted(() => {
  systemStore.initSystemInfo();
});
</script>
<style>
/* #ifdef APP-PLUS-NVUE */
@import "./tmui/scss/nvue.css";
/* #endif */
/* #ifndef APP-PLUS-NVUE */
@import "./tmui/scss/noNvue.css";
/* #endif */

/* 每个页面公共css */
@import "./static/css/base.scss";
/* scss公共类 */
</style>
